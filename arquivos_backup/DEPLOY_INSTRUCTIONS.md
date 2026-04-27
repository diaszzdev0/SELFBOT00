# 🚀 Instruções de Deploy - Cloud SelfBot Manager

## ✅ Correção Aplicada

O selfbot agora envia mensagens corretamente nas threads! A correção incluiu:
- ✓ Adicionado `await thread.join()` antes de enviar mensagens
- ✓ Adicionado tratamento de erros com logs detalhados
- ✓ Corrigido import do módulo `re`

---

## 📋 Pré-requisitos

1. **Banco de Dados Neon** configurado
2. **Conta SquareCloud** (ou outro host)
3. **Token do Discord** (selfbot)
4. **Credenciais IMAP** (Gmail com senha de app)

---

## 🔧 Configuração do .env

Crie o arquivo `.env` na raiz do projeto:

```env
# Banco de Dados Neon
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require

# Discord SelfBot
DISCORD_TOKEN=seu_token_de_selfbot_aqui
SERVER_ID=123456789012345678
CATEGORY_ID=123456789012345678

# Email IMAP
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app_16_digitos
IMAP_SERVER=imap.gmail.com

# Mensagem e Imagem
THREAD_MESSAGE=Olá! Digite: pago Nome Sobrenome para validar seu pagamento de hoje.
THREAD_IMAGE=https://exemplo.com/imagem.png
```

---

## 🌐 Deploy na SquareCloud

### Opção 1: Via CLI (Recomendado)

```bash
# 1. Instalar CLI da SquareCloud
npm install -g @squarecloud/cli

# 2. Fazer login
squarecloud login

# 3. Fazer deploy
squarecloud upload
```

### Opção 2: Upload Manual

1. Acesse https://squarecloud.app/dashboard
2. Clique em "Upload Application"
3. Faça upload do arquivo `deploy-squarecloud.zip`
4. Configure as variáveis de ambiente no painel
5. Inicie a aplicação

---

## 📦 Criar Pacote de Deploy

Execute o script de preparação:

**Windows:**
```cmd
preparar-deploy.bat
```

**PowerShell:**
```powershell
.\criar-zip.ps1
```

Isso criará o arquivo `deploy-squarecloud.zip` pronto para upload.

---

## 🔐 Configurar Variáveis de Ambiente

No painel da SquareCloud, adicione:

```
DATABASE_URL=sua_connection_string_neon
DISCORD_TOKEN=seu_token
SERVER_ID=seu_server_id
CATEGORY_ID=sua_category_id
EMAIL_USER=seu_email
EMAIL_PASS=sua_senha_app
IMAP_SERVER=imap.gmail.com
THREAD_MESSAGE=Sua mensagem personalizada
THREAD_IMAGE=URL_da_imagem
```

---

## 🐍 Executar o Bot Python

Após o deploy do servidor Node.js, execute o bot Python:

```bash
# Instalar dependências
pip install -r requirements.txt

# Executar o bot
python bot.py
```

**Importante:** O bot Python precisa rodar separadamente do servidor Node.js. Você pode:
- Rodar localmente na sua máquina
- Hospedar em um VPS (Contabo, DigitalOcean, etc)
- Usar Replit ou PythonAnywhere

---

## 🧪 Testar o Deploy

### 1. Testar Servidor Web
```
https://seu-app.squarecloud.app/
```

### 2. Testar Painel Cliente
```
https://seu-app.squarecloud.app/cliente
```

### 3. Testar API
```bash
curl https://seu-app.squarecloud.app/api/users
```

### 4. Testar Bot
- Crie uma thread na categoria configurada
- O bot deve enviar a mensagem automaticamente após 9 segundos
- Digite `pago Nome Sobrenome` para testar validação de pagamento

---

## 📊 Monitoramento

### Ver Logs do Servidor
```bash
squarecloud logs
```

### Ver Status
```bash
squarecloud status
```

### Ver Logs do Bot Python
O bot imprimirá no console:
- `✓ Mensagem enviada na thread: nome-da-thread` (sucesso)
- `✗ Erro ao enviar mensagem na thread: erro` (falha)

---

## 🔍 Troubleshooting

### Bot não envia mensagens nas threads

**Solução:** Verifique se:
1. O token do Discord está correto
2. O SERVER_ID e CATEGORY_ID estão corretos
3. O bot tem permissões no servidor
4. O bot está rodando (execute `python bot.py`)

### Erro "Thread not found"

**Solução:** O bot precisa fazer `join()` na thread primeiro (já corrigido no código)

### Erro de autenticação IMAP

**Solução:** 
1. Use senha de app do Gmail (não a senha normal)
2. Ative autenticação de 2 fatores
3. Gere senha de app em: https://myaccount.google.com/apppasswords

### Banco de dados não conecta

**Solução:**
1. Verifique se a DATABASE_URL está correta
2. Teste a conexão: `node test-db.js`
3. Verifique se o IP está na whitelist do Neon

---

## 📁 Estrutura de Arquivos para Deploy

```
deploy-squarecloud.zip
├── server.js              # Servidor Node.js
├── database.js            # Conexão com Neon
├── painel.html           # Painel Admin
├── cliente.html          # Painel Cliente
├── package.json          # Dependências Node
├── squarecloud.config    # Config SquareCloud
├── start.sh              # Script de inicialização
└── .env                  # Variáveis de ambiente
```

**Arquivos Python (rodar separadamente):**
```
├── bot.py                # Bot Discord
├── requirements.txt      # Dependências Python
```

---

## 🎯 Próximos Passos

1. ✅ Fazer deploy do servidor Node.js
2. ✅ Configurar variáveis de ambiente
3. ✅ Testar painel admin e cliente
4. ✅ Executar bot Python
5. ✅ Testar envio de mensagens nas threads
6. ✅ Configurar validação de pagamentos

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs: `squarecloud logs`
2. Teste localmente primeiro: `npm start`
3. Verifique as variáveis de ambiente
4. Confirme que o bot Python está rodando

---

## 🔄 Atualizar Deploy

Para atualizar após mudanças:

```bash
# Via CLI
squarecloud commit

# Ou recriar o zip e fazer upload manual
preparar-deploy.bat
```

---

**✨ Deploy concluído com sucesso!**
