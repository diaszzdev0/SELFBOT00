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

DATABASE_URL = os.getenv("DATABASE_URL")
SP_TZ = pytz.timezone("America/Sao_Paulo")

# Armazena instâncias de bots por user_key
bot_instances = {}
user_configs = {}
used_transaction_ids = {}

# Função para buscar pagamento no email
def _search_payment_sync(name: str, email_user: str, email_pass: str, imap_server: str) -> dict | None:
    today = datetime.now(SP_TZ).strftime("%d-%b-%Y")
    
    try:
        with imaplib.IMAP4_SSL(imap_server) as mail:
            mail.login(email_user, email_pass)
            mail.select("INBOX")
            
            _, data = mail.search(None, f'(SINCE "{today}")')
            ids = data[0].split()
            
            for eid in reversed(ids):
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
                
                tx_id = str(abs(hash(body[:200])))[:12]
                amount_match = re.search(r"R\$\s?[\d.,]+", body)
                amount = amount_match.group(0) if amount_match else "N/A"
                origin = msg.get("From", "Desconhecido")
                
                return {
                    "tx_id": tx_id,
                    "amount": amount,
                    "origin": origin,
                    "name": name,
                }
    except Exception as e:
        print(f"Erro ao buscar email: {e}")
    
    return None

# Classe do SelfBot
class UserSelfBot(discord.Client):
    def __init__(self, user_key, config):
        intents = discord.Intents.default()
        intents.message_content = True
        intents.guilds = True
        intents.members = True
        super().__init__(intents=intents)
        
        self.user_key = user_key
        self.config = config
        self.server_id = int(config['server_id'])
        self.category_id = int(config['category_id'])
        
        if user_key not in used_transaction_ids:
            used_transaction_ids[user_key] = set()
    
    async def on_ready(self):
        print(f"✅ Bot conectado: {self.user} (User: {self.user_key})")
        print(f"   Server: {self.server_id}, Category: {self.category_id}")
        print(f"   Mensagem: {self.config.get('thread_message', '')[:50]}...")
        print(f"   Aguardando threads...")
    
    async def on_thread_create(self, thread: discord.Thread):
        print(f"\n🆕 Thread detectada: {thread.name}")
        print(f"   Guild: {thread.guild.id} (esperado: {self.server_id})")
        print(f"   Parent: {thread.parent}")
        
        if thread.guild.id != self.server_id:
            print(f"   ❌ Guild diferente, ignorando")
            return
        
        if thread.parent:
            print(f"   Category: {thread.parent.category_id} (esperado: {self.category_id})")
        
        if not (thread.parent and thread.parent.category_id == self.category_id):
            print(f"   ❌ Categoria diferente, ignorando")
            return
        
        print(f"   ✅ Thread válida! Aguardando 9 segundos...")
        await asyncio.sleep(9)
        
        try:
            print(f"   🔗 Entrando na thread...")
            await thread.join()
            print(f"   ✅ Entrou na thread!")
            
            file = None
            image_url = self.config.get('image_url', '').strip()
            
            if image_url:
                print(f"   🖼️ Preparando imagem: {image_url}")
                if image_url.startswith(("http://", "https://")):
                    import urllib.request, tempfile
                    ext = os.path.splitext(image_url.split("?")[0])[1] or ".jpg"
                    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=ext)
                    await asyncio.to_thread(urllib.request.urlretrieve, image_url, tmp.name)
                    file = discord.File(tmp.name, filename=f"painel{ext}")
                    print(f"   ✅ Imagem baixada")
                else:
                    ext = os.path.splitext(image_url)[1]
                    file = discord.File(image_url, filename=f"painel{ext}")
                    print(f"   ✅ Imagem local carregada")
            
            message = self.config.get('thread_message', 'Olá! Digite: pago Nome Sobrenome')
            print(f"   📤 Enviando mensagem...")
            await thread.send(message, file=file)
            print(f"   ✅ Mensagem enviada na thread: {thread.name}")
        except discord.Forbidden as e:
            print(f"   ❌ Erro de permissão: {e}")
        except discord.HTTPException as e:
            print(f"   ❌ Erro HTTP: {e}")
        except Exception as e:
            print(f"   ❌ Erro ao enviar mensagem: {e}")
            import traceback
            traceback.print_exc()
    
    async def on_message(self, message: discord.Message):
        if message.author != self.user:
            content = message.content.strip()
            
            if not re.match(r"^(pg|pago)\s+\S+", content, re.IGNORECASE):
                return
            
            parts = content.split(maxsplit=1)
            if len(parts) < 2:
                return
            
            name = parts[1].strip()
            checking_msg = await message.reply("🕒 Verificando pagamento… aguarde!")
            
            result = await asyncio.to_thread(
                _search_payment_sync,
                name,
                self.config['email_user'],
                self.config['email_pass'],
                self.config.get('imap_server', 'imap.gmail.com')
            )
            
            try:
                await checking_msg.delete()
            except:
                pass
            
            if result is None:
                await message.reply("🚫 Este pagamento não foi encontrado!")
                return
            
            tx_id = result["tx_id"]
            
            if tx_id and tx_id in used_transaction_ids[self.user_key]:
                await message.reply("⚠️ Atenção- este pagamento já foi utilizado em outro tópico")
                return
            
            if tx_id:
                used_transaction_ids[self.user_key].add(tx_id)
            
            bot_id = random.randint(1000, 9999)
            await message.reply(
                f"✅ Pagamento confirmado!\n"
                f"**Origem:** {result['origin']}\n"
                f"**Nome:** {result['name']}\n"
                f"**Valor:** {result['amount']}\n"
                f"**ID:** #{bot_id}"
            )

# Carregar configurações do banco
async def load_configs_from_db():
    if not DATABASE_URL:
        print("❌ DATABASE_URL não configurada")
        return
    
    try:
        import asyncpg
        conn = await asyncpg.connect(DATABASE_URL)
        
        rows = await conn.fetch("""
            SELECT uc.user_key, uc.discord_token, uc.server_id, uc.category_id,
                   uc.thread_message, uc.image_url, uc.imap_server, 
                   uc.email_user, uc.email_pass
            FROM user_configs uc
            JOIN users u ON uc.user_key = u.key
            WHERE u.expires_at > NOW()
              AND uc.discord_token IS NOT NULL
              AND uc.server_id IS NOT NULL
              AND uc.category_id IS NOT NULL
        """)
        
        for row in rows:
            user_configs[row['user_key']] = {
                'token': row['discord_token'],
                'server_id': row['server_id'],
                'category_id': row['category_id'],
                'thread_message': row['thread_message'] or "Olá! Digite: pago Nome Sobrenome",
                'image_url': row['image_url'] or "",
                'imap_server': row['imap_server'] or "imap.gmail.com",
                'email_user': row['email_user'],
                'email_pass': row['email_pass']
            }
        
        await conn.close()
        print(f"✅ {len(user_configs)} configurações carregadas")
    except Exception as e:
        print(f"❌ Erro ao carregar configurações: {e}")

# Iniciar bots
async def start_bots():
    await load_configs_from_db()
    
    tasks = []
    for user_key, config in user_configs.items():
        bot = UserSelfBot(user_key, config)
        bot_instances[user_key] = bot
        tasks.append(bot.start(config['token']))
    
    if tasks:
        await asyncio.gather(*tasks)
    else:
        print("❌ Nenhuma configuração válida encontrada")

# Executar
if __name__ == "__main__":
    asyncio.run(start_bots())
