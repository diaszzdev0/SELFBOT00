# 🚀 DEPLOY ATUALIZADO - SquareCloud

## ✅ Atualizações Incluídas (v1.2.0)

### Backend:
- ✅ Sistema de persistência de configurações no banco de dados
- ✅ Tabela `user_configs` criada automaticamente
- ✅ Rotas API: `GET/POST /api/config/:key`

### Bot Python:
- ✅ Correção: envio de mensagens nas threads (`thread.join()`)
- ✅ Correção: comando `pg Nome` funciona com 1 ou mais palavras
- ✅ Logs detalhados em todas as operações
- ✅ Detecção de erros de permissão

---

## 📦 Arquivos para Deploy

### SquareCloud (Servidor Node.js):
```
deploy-final.zip contém:
├── server.js              ✅ Atualizado
├── database.js            ✅ Atualizado (user_configs)
├── painel.html           ✅ Painel admin
├── cliente.html          ⚠️ Precisa integrar funções DB
├── package.json          ✅ Dependências
├── squarecloud.config    ✅ Configuração
├── start.sh              ✅ Script de inicialização
└── .env.example          ✅ Exemplo de variáveis
```

### Bot Python (Rodar Separadamente):
```
Arquivos necessários:
├── bot.py                ✅ Atualizado com logs
├── requirements.txt      ✅ Dependências Python
└── .env                  ✅ Suas credenciais
```

---

## 🔧 Passo a Passo

### 1. Deploy do Servidor Node.js

**Opção A - Via CLI:**
```bash
npm install -g @squarecloud/cli
squarecloud login
squarecloud upload deploy-final.zip
```

**Opção B - Upload Manual:**
1. Acesse https://squarecloud.app/dashboard
2. Clique em "Upload Application"
3. Faça upload do `deploy-final.zip`
4. Configure as variáveis de ambiente
5. Inicie a aplicação

### 2. Configurar Variáveis de Ambiente

No painel da SquareCloud, adicione:

```env
# Banco de Dados Neon
DATABASE_URL=postgresql://user:password@ep-xxx.aws.neon.tech/neondb?sslmode=require

# Porta (SquareCloud usa 80 ou 3000)
PORT=3000
```

### 3. Verificar Deploy do Servidor

Acesse:
- Painel Admin: `https://seu-app.squarecloud.app/`
- Painel Cliente: `https://seu-app.squarecloud.app/cliente`
- API: `https://seu-app.squarecloud.app/api/users`

### 4. Deploy do Bot Python

O bot Python precisa rodar separadamente. Opções:

**Opção A - Localmente:**
```bash
cd "c:\Users\Usuario\Desktop\ultima tentativa"
python bot.py
```

**Opção B - VPS (Recomendado):**
```bash
# No servidor VPS
git clone https://github.com/diaszzdev0/SELFBOT00.git
cd SELFBOT00
pip install -r requirements.txt

# Criar .env
nano .env
# Cole suas credenciais

# Executar
python bot.py

# Ou usar screen/tmux para manter rodando
screen -S selfbot
python bot.py
# Ctrl+A+D para desanexar
```

**Opção C - Replit:**
1. Acesse https://replit.com
2. Crie novo Repl Python
3. Faça upload de `bot.py` e `requirements.txt`
4. Configure Secrets (variáveis de ambiente)
5. Execute

**Opção D - PythonAnywhere:**
1. Acesse https://www.pythonanywhere.com
2. Faça upload dos arquivos
3. Configure variáveis de ambiente
4. Execute via console

### 5. Configurar .env do Bot

Crie o arquivo `.env` onde o bot vai rodar:

```env
# Discord SelfBot
DISCORD_TOKEN=seu_token_de_selfbot
SERVER_ID=123456789012345678
CATEGORY_ID=987654321098765432

# Email IMAP
EMAIL_USER=seu@email.com
EMAIL_PASS=senha_de_app_16_digitos
IMAP_SERVER=imap.gmail.com

# Mensagem e Imagem
THREAD_MESSAGE=Olá! Digite: pago Nome Sobrenome para validar seu pagamento de hoje.
THREAD_IMAGE=https://exemplo.com/imagem.png
```

---

## 🧪 Testar Após Deploy

### 1. Testar Servidor Web
```bash
curl https://seu-app.squarecloud.app/
```
Deve retornar o HTML do painel admin.

### 2. Testar API
```bash
curl https://seu-app.squarecloud.app/api/users
```
Deve retornar JSON com usuários.

### 3. Testar Bot Python

Execute o bot e veja os logs:
```
✅ Logged in as SeuUsuario#1234
📋 Monitorando servidor ID: 123456789
📋 Monitorando categoria ID: 987654321
💬 Mensagem configurada: Olá! Digite: pago Nome Sobrenome...
⏳ Aguardando criação de threads...
```

Crie uma thread na categoria configurada e veja:
```
🆕 Thread criada detectada: fila-1234567
   Guild ID: 123456789 (esperado: 123456789)
   ✅ Thread válida! Aguardando 9 segundos...
   🔗 Entrando na thread...
   ✅ Entrou na thread com sucesso!
   📤 Enviando mensagem...
   ✅ Mensagem enviada na thread: fila-1234567
```

### 4. Testar Comando de Pagamento

Em uma thread, digite:
```
pg João
```

Veja os logs:
```
📨 Mensagem recebida: 'pg João' de Usuario#1234
🔍 Verificando pagamento para: João
📧 Conectando ao IMAP imap.gmail.com...
✅ Conectado ao email seu@email.com
📨 Encontrados 5 emails de hoje
✅ Nome 'João' encontrado no email!
✅ Pagamento encontrado! TX ID: 123456789012
```

---

## 📊 Monitoramento

### Ver Logs do Servidor (SquareCloud):
```bash
squarecloud logs
```

### Ver Logs do Bot Python:
O bot imprime no console onde está rodando.

Para salvar logs em arquivo:
```bash
python bot.py 2>&1 | tee bot.log
```

---

## 🔄 Atualizar Deploy

Quando fizer mudanças:

### Atualizar Servidor:
```bash
# Recriar zip
powershell -Command "Compress-Archive -Path server.js,database.js,painel.html,cliente.html,package.json,squarecloud.config,start.sh,.env.example -DestinationPath deploy-final.zip -Force"

# Upload
squarecloud upload deploy-final.zip
```

### Atualizar Bot:
```bash
# Parar bot
Ctrl+C

# Atualizar código
git pull origin main

# Reiniciar
python bot.py
```

---

## ⚠️ Importante

### Servidor Node.js (SquareCloud):
- ✅ Roda 24/7 automaticamente
- ✅ Reinicia automaticamente se cair
- ✅ Banco de dados Neon sempre disponível

### Bot Python:
- ⚠️ Precisa rodar separadamente
- ⚠️ Se parar, precisa reiniciar manualmente
- ⚠️ Recomendado usar VPS ou serviço 24/7

---

## 🆘 Problemas Comuns

### Servidor não inicia:
```bash
# Ver logs
squarecloud logs

# Verificar se DATABASE_URL está configurada
# Verificar se package.json está correto
```

### Bot não conecta:
```bash
# Verificar token
python -c "from dotenv import load_dotenv; import os; load_dotenv(); print(os.getenv('DISCORD_TOKEN')[:20])"

# Verificar IDs
python -c "from dotenv import load_dotenv; import os; load_dotenv(); print('SERVER:', os.getenv('SERVER_ID')); print('CATEGORY:', os.getenv('CATEGORY_ID'))"
```

### Bot não envia mensagens:
Veja o guia completo: [TROUBLESHOOTING_THREADS.md](TROUBLESHOOTING_THREADS.md)

---

## 📞 Comandos Úteis

```bash
# SquareCloud
squarecloud status          # Ver status da aplicação
squarecloud logs            # Ver logs
squarecloud restart         # Reiniciar aplicação
squarecloud stop            # Parar aplicação
squarecloud start           # Iniciar aplicação

# Git
git pull origin main        # Atualizar código
git status                  # Ver mudanças
git log --oneline -5        # Ver últimos commits

# Bot Python
python bot.py               # Executar bot
python bot.py 2>&1 | tee bot.log  # Executar e salvar logs
```

---

## ✅ Checklist Final

- [ ] Servidor Node.js deployado na SquareCloud
- [ ] Variável DATABASE_URL configurada
- [ ] Painel admin acessível
- [ ] Painel cliente acessível
- [ ] Bot Python rodando
- [ ] Bot detecta threads
- [ ] Bot envia mensagens nas threads
- [ ] Comando `pg Nome` funciona
- [ ] Validação de pagamentos funciona
- [ ] Configurações persistem no banco

---

**Versão:** 1.2.0
**Data:** 2025-01-25
**Status:** ✅ PRONTO PARA DEPLOY

🚀 **Faça o deploy agora!**
