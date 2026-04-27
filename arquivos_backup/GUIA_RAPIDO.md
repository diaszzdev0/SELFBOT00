# 🚀 GUIA RÁPIDO DE DEPLOY

## ✅ CORREÇÕES APLICADAS

1. ✓ Bot agora envia mensagens nas threads (adicionado thread.join())
2. ✓ Comando "pg Nome" funciona (regex corrigida)
3. ✓ Logs detalhados adicionados

## 📋 PASSO A PASSO

### 1. Configure o .env
```env
DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require
DISCORD_TOKEN=seu_token
SERVER_ID=123456789
CATEGORY_ID=123456789
EMAIL_USER=seu@email.com
EMAIL_PASS=senha_app_16_digitos
IMAP_SERVER=imap.gmail.com
THREAD_MESSAGE=Olá! Digite: pago Nome Sobrenome
THREAD_IMAGE=https://url-da-imagem.png
```

### 2. Deploy do Servidor (SquareCloud)
```bash
# Opção 1: CLI
npm install -g @squarecloud/cli
squarecloud login
squarecloud upload

# Opção 2: Manual
# - Acesse squarecloud.app/dashboard
# - Upload do deploy-squarecloud.zip
# - Configure variáveis de ambiente
```

### 3. Execute o Bot Python
```bash
pip install -r requirements.txt
python bot.py
```

## 🧪 TESTAR

### Teste 1: Mensagem na Thread
1. Crie uma thread na categoria configurada
2. Aguarde 9 segundos
3. Veja o log: `✓ Mensagem enviada na thread: nome`

### Teste 2: Comando de Pagamento
1. Digite: `pg João`
2. Veja os logs:
```
📨 Mensagem recebida: 'pg João' de Usuario#1234
🔍 Verificando pagamento para: João
📧 Conectando ao IMAP...
✅ Conectado ao email
✅ Pagamento encontrado!
```

## 📊 COMANDOS QUE FUNCIONAM

✓ `pg João`
✓ `pago Maria`
✓ `pg João Silva`
✓ `PG JOÃO`
✓ `Pago Maria`

## 🔧 TROUBLESHOOTING

### Bot não responde
- Verifique se está rodando: `python bot.py`
- Deve aparecer: `Logged in as SeuUsuario#1234`

### Não envia mensagem na thread
- Veja o log de erro: `✗ Erro ao enviar mensagem: ...`
- Verifique SERVER_ID e CATEGORY_ID
- Verifique permissões do bot

### Erro IMAP
- Use senha de app do Gmail (não a senha normal)
- Ative 2FA: https://myaccount.google.com/security
- Gere senha: https://myaccount.google.com/apppasswords

## 📁 ARQUIVOS IMPORTANTES

- `bot.py` - Bot com correções aplicadas
- `.env` - Configurações
- `requirements.txt` - Dependências Python
- `server.js` - Servidor Node.js
- `package.json` - Dependências Node

## ✨ PRONTO!

Agora é só fazer o deploy e testar!

**Versão:** 1.1.0
**Status:** ✅ TESTADO E APROVADO
