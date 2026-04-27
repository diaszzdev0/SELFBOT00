# 🔧 Troubleshooting: Bot Não Envia Mensagens nas Threads

## 📋 Checklist de Verificação

### 1. ✅ Bot está rodando?

Execute o bot:
```bash
python bot.py
```

**Deve aparecer:**
```
✅ Logged in as SeuUsuario#1234
📋 Monitorando servidor ID: 123456789
📋 Monitorando categoria ID: 987654321
💬 Mensagem configurada: Olá! Digite: pago Nome Sobrenome...
🖼️ Imagem configurada: https://exemplo.com/imagem.png
⏳ Aguardando criação de threads...
```

### 2. ✅ Variáveis de ambiente configuradas?

Verifique o arquivo `.env`:
```env
DISCORD_TOKEN=seu_token_aqui
SERVER_ID=123456789012345678
CATEGORY_ID=987654321098765432
THREAD_MESSAGE=Olá! Digite: pago Nome Sobrenome
THREAD_IMAGE=https://exemplo.com/imagem.png
```

**Teste:**
```bash
python -c "from dotenv import load_dotenv; import os; load_dotenv(); print('TOKEN:', os.getenv('DISCORD_TOKEN')[:20]+'...'); print('SERVER_ID:', os.getenv('SERVER_ID')); print('CATEGORY_ID:', os.getenv('CATEGORY_ID'))"
```

### 3. ✅ IDs estão corretos?

#### Como pegar o SERVER_ID:
1. Ative o Modo Desenvolvedor no Discord (Configurações > Avançado > Modo Desenvolvedor)
2. Clique com botão direito no servidor
3. Copiar ID

#### Como pegar o CATEGORY_ID:
1. Clique com botão direito na categoria
2. Copiar ID

**Importante:** Os IDs devem ser números, não strings!

### 4. ✅ Thread está na categoria correta?

Quando criar uma thread, veja os logs:
```
🆕 Thread criada detectada: nome-da-thread
   Guild ID: 123456789 (esperado: 123456789)
   Parent: <TextChannel id=987654321 name='canal'>
   Category ID: 111111111 (esperado: 111111111)
   ✅ Thread válida! Aguardando 9 segundos...
```

**Se aparecer:**
```
❌ Guild ID não corresponde. Ignorando.
```
→ O SERVER_ID está errado

**Se aparecer:**
```
❌ Categoria não corresponde. Ignorando.
```
→ O CATEGORY_ID está errado ou a thread não está na categoria monitorada

### 5. ✅ Bot tem permissões?

O bot precisa de:
- ✅ Ver canais
- ✅ Enviar mensagens
- ✅ Enviar mensagens em threads
- ✅ Anexar arquivos (se usar imagem)

**Teste de permissão:**
Se aparecer:
```
❌ Erro de permissão: 403 Forbidden
ℹ️ O bot não tem permissão para enviar mensagens nesta thread
```
→ Dê permissões de administrador ao bot ou ajuste as permissões do canal

### 6. ✅ Token é válido?

**Teste o token:**
```python
import discord
import os
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")

client = discord.Client()

@client.event
async def on_ready():
    print(f"✅ Token válido! Logado como {client.user}")
    await client.close()

client.run(TOKEN)
```

**Se der erro:**
```
discord.errors.LoginFailure: Improper token has been passed
```
→ Token inválido ou expirado

---

## 🐛 Problemas Comuns

### Problema 1: Bot não detecta threads

**Sintoma:** Nenhum log aparece quando cria thread

**Causas:**
1. Bot não está rodando
2. SERVER_ID ou CATEGORY_ID errados
3. Thread não está na categoria monitorada

**Solução:**
```bash
# Verifique se o bot está rodando
ps aux | grep bot.py

# Verifique os IDs no .env
cat .env | grep -E "SERVER_ID|CATEGORY_ID"

# Teste criando thread na categoria correta
```

### Problema 2: Bot detecta mas não envia

**Sintoma:** Logs mostram thread detectada mas não envia mensagem

**Logs esperados:**
```
🆕 Thread criada detectada: nome
   ✅ Thread válida! Aguardando 9 segundos...
   🔗 Entrando na thread...
   ✅ Entrou na thread com sucesso!
   📤 Enviando mensagem...
   ✅ Mensagem enviada na thread: nome
```

**Se parar em algum ponto:**

**Parou em "Entrando na thread":**
```
❌ Erro: 403 Forbidden
```
→ Sem permissão. Dê permissões ao bot.

**Parou em "Enviando mensagem":**
```
❌ Erro HTTP do Discord: 500 Internal Server Error
```
→ Problema temporário do Discord. Tente novamente.

### Problema 3: Erro ao baixar imagem

**Sintoma:**
```
❌ Erro ao enviar mensagem: [Errno 11001] getaddrinfo failed
```

**Solução:**
1. Verifique se a URL da imagem está acessível
2. Teste a URL no navegador
3. Use uma URL pública (não localhost)
4. Ou remova a imagem: `THREAD_IMAGE=`

### Problema 4: Bot envia mas não aparece

**Sintoma:** Logs mostram sucesso mas mensagem não aparece

**Causas:**
1. Mensagem foi enviada em outra thread
2. Você não está vendo a thread correta
3. Discord está com delay

**Solução:**
1. Verifique o nome da thread nos logs
2. Procure a thread no servidor
3. Aguarde alguns segundos

---

## 🧪 Teste Manual

### Script de Teste Completo:

```python
import discord
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv("DISCORD_TOKEN")
SERVER_ID = int(os.getenv("SERVER_ID"))
CATEGORY_ID = int(os.getenv("CATEGORY_ID"))

class TestBot(discord.Client):
    async def on_ready(self):
        print(f"✅ Bot conectado: {self.user}")
        print(f"📋 Servidor ID: {SERVER_ID}")
        print(f"📋 Categoria ID: {CATEGORY_ID}")
        
        # Buscar servidor
        guild = self.get_guild(SERVER_ID)
        if not guild:
            print(f"❌ Servidor {SERVER_ID} não encontrado!")
            await self.close()
            return
        
        print(f"✅ Servidor encontrado: {guild.name}")
        
        # Buscar categoria
        category = discord.utils.get(guild.categories, id=CATEGORY_ID)
        if not category:
            print(f"❌ Categoria {CATEGORY_ID} não encontrada!")
            await self.close()
            return
        
        print(f"✅ Categoria encontrada: {category.name}")
        print(f"📋 Canais na categoria:")
        for channel in category.channels:
            print(f"   - {channel.name} (ID: {channel.id})")
        
        await self.close()
    
    async def on_thread_create(self, thread):
        print(f"\n🆕 Thread detectada: {thread.name}")
        print(f"   Guild: {thread.guild.name} (ID: {thread.guild.id})")
        if thread.parent:
            print(f"   Canal pai: {thread.parent.name}")
            print(f"   Categoria: {thread.parent.category_id}")
        
        if thread.guild.id == SERVER_ID and thread.parent and thread.parent.category_id == CATEGORY_ID:
            print(f"   ✅ Thread válida!")
            await asyncio.sleep(2)
            try:
                await thread.join()
                print(f"   ✅ Entrou na thread")
                await thread.send("🧪 Teste de mensagem!")
                print(f"   ✅ Mensagem enviada!")
            except Exception as e:
                print(f"   ❌ Erro: {e}")

client = TestBot()
client.run(TOKEN)
```

Salve como `test_bot.py` e execute:
```bash
python test_bot.py
```

---

## 📊 Logs de Debug

### Logs Normais (Funcionando):
```
✅ Logged in as BotName#1234
📋 Monitorando servidor ID: 123456789
📋 Monitorando categoria ID: 987654321
⏳ Aguardando criação de threads...

🆕 Thread criada detectada: fila-1234567
   Guild ID: 123456789 (esperado: 123456789)
   Parent: <TextChannel id=111 name='pagamentos'>
   Category ID: 987654321 (esperado: 987654321)
   ✅ Thread válida! Aguardando 9 segundos...
   🔗 Entrando na thread...
   ✅ Entrou na thread com sucesso!
   📤 Enviando mensagem...
   ✅ Mensagem enviada na thread: fila-1234567
```

### Logs com Erro (Categoria Errada):
```
🆕 Thread criada detectada: fila-1234567
   Guild ID: 123456789 (esperado: 123456789)
   Parent: <TextChannel id=111 name='outro-canal'>
   Category ID: 111111111 (esperado: 987654321)
   ❌ Categoria não corresponde. Ignorando.
```

### Logs com Erro (Sem Permissão):
```
🆕 Thread criada detectada: fila-1234567
   ✅ Thread válida! Aguardando 9 segundos...
   🔗 Entrando na thread...
   ✅ Entrou na thread com sucesso!
   📤 Enviando mensagem...
   ❌ Erro de permissão: 403 Forbidden
   ℹ️ O bot não tem permissão para enviar mensagens nesta thread
```

---

## 🔧 Soluções Rápidas

### Solução 1: Resetar Bot
```bash
# Parar bot
Ctrl+C

# Limpar cache
rm -rf __pycache__

# Reiniciar
python bot.py
```

### Solução 2: Verificar Intents
Adicione no início do bot.py:
```python
intents = discord.Intents.default()
intents.message_content = True
intents.guilds = True

client = SelfBot(intents=intents)
```

### Solução 3: Testar em Canal Normal
Teste enviando mensagem em canal normal primeiro:
```python
@client.event
async def on_ready():
    channel = client.get_channel(ID_DO_CANAL)
    await channel.send("Teste!")
```

---

## 📞 Ainda Não Funciona?

Execute o bot com logs detalhados e envie a saída:

```bash
python bot.py 2>&1 | tee bot_debug.log
```

Depois crie uma thread e veja o arquivo `bot_debug.log`.

**Informações necessárias:**
1. Saída completa do `bot_debug.log`
2. Screenshot da estrutura do servidor (categorias/canais)
3. Screenshot das permissões do bot
4. Conteúdo do `.env` (sem o token completo)

---

**Versão:** 1.1.1
**Data:** 2025-01-25
