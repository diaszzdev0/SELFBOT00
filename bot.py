import asyncio
import imaplib
import email
import random
import re
from datetime import datetime

import discord
from discord.ext import tasks
from dotenv import load_dotenv
import os
import pytz

load_dotenv()

TOKEN       = os.getenv("DISCORD_TOKEN")
SERVER_ID   = int(os.getenv("SERVER_ID"))
CATEGORY_ID = int(os.getenv("CATEGORY_ID"))
EMAIL_USER      = os.getenv("EMAIL_USER")
EMAIL_PASS      = os.getenv("EMAIL_PASS")
THREAD_MESSAGE  = os.getenv("THREAD_MESSAGE", "Olá! Digite: pago Nome Sobrenome para validar seu pagamento de hoje.")
THREAD_IMAGE    = os.getenv("THREAD_IMAGE", "").strip()  # caminho local ou URL

IMAP_HOST = os.getenv("IMAP_SERVER", "imap.gmail.com")
SP_TZ     = pytz.timezone("America/Sao_Paulo")

used_transaction_ids: set[str] = set()

# ── IMAP helper ──────────────────────────────────────────────────────────────

def _search_payment_sync(name: str) -> dict | None:
    """Runs in a thread. Returns payment info dict or None."""
    today = datetime.now(SP_TZ).strftime("%d-%b-%Y")
    print(f"📧 Conectando ao IMAP {IMAP_HOST}...")

    try:
        with imaplib.IMAP4_SSL(IMAP_HOST) as mail:
            mail.login(EMAIL_USER, EMAIL_PASS)
            mail.select("INBOX")
            print(f"✅ Conectado ao email {EMAIL_USER}")

            # Filter emails received today
            _, data = mail.search(None, f'(SINCE "{today}")')
            ids = data[0].split()
            print(f"📨 Encontrados {len(ids)} emails de hoje ({today})")

            for eid in reversed(ids):  # newest first
                _, msg_data = mail.fetch(eid, "(RFC822)")
                msg = email.message_from_bytes(msg_data[0][1])

                body = ""
                if msg.is_multipart():
                    for part in msg.walk():
                        if part.get_content_type() == "text/plain":
                            body += part.get_payload(decode=True).decode(errors="ignore")
                else:
                    body = msg.get_payload(decode=True).decode(errors="ignore")

                if name.lower() not in body.lower():
                    continue
                
                print(f"✅ Nome '{name}' encontrado no email!")

                # Generate unique transaction ID based on email content
                tx_id = str(abs(hash(body[:200])))[:12]

                # Extract amount
                amount_match = re.search(r"R\$\s?[\d.,]+", body)
                amount = amount_match.group(0) if amount_match else "N/A"

                # Extract sender/origin
                origin = msg.get("From", "Desconhecido")

                return {
                    "tx_id":  tx_id,
                    "amount": amount,
                    "origin": origin,
                    "name":   name,
                }
            
            print(f"❌ Nome '{name}' não encontrado em nenhum email de hoje")
    except Exception as e:
        print(f"❌ Erro ao buscar email: {e}")
        return None

    return None


# ── Bot ───────────────────────────────────────────────────────────────────────

class SelfBot(discord.Client):
    async def on_ready(self):
        print(f"✅ Logged in as {self.user}")
        print(f"📋 Monitorando servidor ID: {SERVER_ID}")
        print(f"📋 Monitorando categoria ID: {CATEGORY_ID}")
        print(f"💬 Mensagem configurada: {THREAD_MESSAGE[:50]}...")
        print(f"🖼️  Imagem configurada: {THREAD_IMAGE if THREAD_IMAGE else 'Nenhuma'}")
        print("⏳ Aguardando criação de threads...")
        clear_tx_ids.start()

    # ── New thread greeting ───────────────────────────────────────────────────
    async def on_thread_create(self, thread: discord.Thread):
        print(f"\n🆕 Thread criada detectada: {thread.name}")
        print(f"   Guild ID: {thread.guild.id} (esperado: {SERVER_ID})")
        
        if thread.guild.id != SERVER_ID:
            print(f"   ❌ Guild ID não corresponde. Ignorando.")
            return
        
        print(f"   Parent: {thread.parent}")
        if thread.parent:
            print(f"   Category ID: {thread.parent.category_id} (esperado: {CATEGORY_ID})")
        
        if not (thread.parent and thread.parent.category_id == CATEGORY_ID):
            print(f"   ❌ Categoria não corresponde. Ignorando.")
            return

        print(f"   ✅ Thread válida! Aguardando 9 segundos...")
        await asyncio.sleep(9)
        
        try:
            print(f"   🔗 Entrando na thread...")
            await thread.join()
            print(f"   ✅ Entrou na thread com sucesso!")
            
            file = None
            if THREAD_IMAGE:
                print(f"   🖼️  Preparando imagem: {THREAD_IMAGE}")
                if THREAD_IMAGE.startswith(("http://", "https://")):
                    import urllib.request, tempfile
                    ext = os.path.splitext(THREAD_IMAGE.split("?")[0])[1] or ".jpg"
                    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=ext)
                    await asyncio.to_thread(urllib.request.urlretrieve, THREAD_IMAGE, tmp.name)
                    file = discord.File(tmp.name, filename=f"painel{ext}")
                    print(f"   ✅ Imagem baixada: {tmp.name}")
                else:
                    ext = os.path.splitext(THREAD_IMAGE)[1]
                    file = discord.File(THREAD_IMAGE, filename=f"painel{ext}")
                    print(f"   ✅ Imagem local carregada")

            print(f"   📤 Enviando mensagem...")
            await thread.send(THREAD_MESSAGE, file=file)
            print(f"   ✅ Mensagem enviada na thread: {thread.name}")
        except discord.Forbidden as e:
            print(f"   ❌ Erro de permissão: {e}")
            print(f"   ℹ️  O bot não tem permissão para enviar mensagens nesta thread")
        except discord.HTTPException as e:
            print(f"   ❌ Erro HTTP do Discord: {e}")
        except Exception as e:
            print(f"   ❌ Erro ao enviar mensagem na thread {thread.name}: {e}")
            import traceback
            traceback.print_exc()

    # ── Payment command ───────────────────────────────────────────────────────
    async def on_message(self, message: discord.Message):
        # Ignora mensagens de outros usuários que não sejam comandos
        if message.author != self.user:
            content = message.content.strip()
            print(f"📨 Mensagem recebida: '{content}' de {message.author}")
            
            # Aceita: "pg Nome", "pago Nome", "pg Nome Sobrenome", "pago Nome Sobrenome"
            if not re.match(r"^(pg|pago)\s+\S+", content, re.IGNORECASE):
                return

            parts = content.split(maxsplit=1)
            if len(parts) < 2:
                return
            
            name  = parts[1].strip()  # "Nome" ou "Nome Sobrenome"
            print(f"🔍 Verificando pagamento para: {name}")

            # Reply with "checking" message
            checking_msg = await message.reply("🕒 Verificando pagamento… aguarde!")
            print(f"⏳ Buscando pagamento no email para: {name}")

            # IMAP search in thread pool (non-blocking)
            result = await asyncio.to_thread(_search_payment_sync, name)
            
            print(f"📧 Resultado da busca: {result}")

            # Delete the "checking" message
            try:
                await checking_msg.delete()
            except discord.HTTPException:
                pass

            if result is None:
                print(f"❌ Pagamento não encontrado para: {name}")
                await message.reply("🚫 Este pagamento não foi encontrado!")
                return

            tx_id = result["tx_id"]
            print(f"✅ Pagamento encontrado! TX ID: {tx_id}")

            # Anti-fraud check
            if tx_id and tx_id in used_transaction_ids:
                await message.reply(
                    "⚠️ Atenção- este pagamento já foi utilizado em outro tópico"
                )
                return

            if tx_id:
                used_transaction_ids.add(tx_id)

            bot_id = random.randint(1000, 9999)
            await message.reply(
                f"✅ Pagamento confirmado!\n"
                f"**Origem:** {result['origin']}\n"
                f"**Nome:** {result['name']}\n"
                f"**Valor:** {result['amount']}\n"
                f"**ID:** #{bot_id}"
            )
            return
        
        # ── Comando !comando (apenas para o dono do selfbot) ──────────────────
        if message.author == self.user:
            content = message.content.strip()
            
            # Verifica se é o comando !comando
            if not content.lower() == "!comando":
                return
            
            # Verifica se está em uma thread
            if not isinstance(message.channel, discord.Thread):
                print(f"⚠️  Comando !comando usado fora de uma thread")
                return
            
            thread = message.channel
            
            # Verifica se a thread está na categoria configurada
            if not (thread.parent and thread.parent.category_id == CATEGORY_ID):
                print(f"⚠️  Comando !comando usado em thread fora da categoria monitorada")
                return
            
            print(f"📋 Comando !comando executado na thread: {thread.name}")
            
            # Deleta a mensagem do comando
            try:
                await message.delete()
            except discord.HTTPException:
                pass
            
            # Envia as instruções
            instrucoes = (
                "📋 **Como verificar seu pagamento:**\n\n"
                "Para verificar seu pagamento, envie o comando:\n"
                "```\n"
                "pg Nome Sobrenome\n"
                "```\n"
                "ou\n"
                "```\n"
                "pago Nome Sobrenome\n"
                "```\n\n"
                "**Exemplos:**\n"
                "• `pg João Silva`\n"
                "• `pago Maria Santos`\n"
                "• `pg Pedro`\n\n"
                "⚠️ **Importante:** Use o nome que está no comprovante de pagamento!"
            )
            
            await thread.send(instrucoes)
            print(f"✅ Instruções enviadas na thread: {thread.name}")


# ── Periodic task ─────────────────────────────────────────────────────────────

@tasks.loop(minutes=2)
async def clear_tx_ids():
    used_transaction_ids.clear()


# ── Entry point ───────────────────────────────────────────────────────────────

client = SelfBot()
client.run(TOKEN)
