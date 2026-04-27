# 🚀 Atualizar na SquareCloud

## ✅ Arquivos Preparados

O arquivo `deploy-squarecloud-atualizado.zip` está pronto com as correções:
- ✓ Bot Python agora inicia automaticamente
- ✓ Python3 e pip instalados via APT
- ✓ Servidor Node.js e Bot Python rodando juntos

## 📤 Passo a Passo

### 1. Acesse a SquareCloud
```
https://squarecloud.app/dashboard
```

### 2. Localize sua Aplicação
- Procure por: **Cloud SelfBot Manager**
- ID: `e0d4fc377f3840919e659646c26108c7`

### 3. Faça Upload do Arquivo
1. Clique em **"Commit"** ou **"Upload"**
2. Selecione: `deploy-squarecloud-atualizado.zip`
3. Aguarde o upload completar

### 4. Configure Variáveis de Ambiente
Vá em **Settings** > **Environment Variables** e adicione:

```env
DATABASE_URL=postgresql://neondb_owner:npg_3RJa4bcMnUKm@ep-silent-cloud-anryyduw-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require
DISCORD_TOKEN=seu_token_aqui
SERVER_ID=seu_server_id_aqui
CATEGORY_ID=seu_category_id_aqui
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_app_aqui
IMAP_SERVER=imap.gmail.com
THREAD_MESSAGE=Olá! Digite: pago Nome Sobrenome para validar seu pagamento de hoje.
THREAD_IMAGE=
```

### 5. Reinicie a Aplicação
- Clique em **"Restart"** ou **"Start"**

### 6. Verifique os Logs
Procure por estas mensagens:
```
📦 Instalando dependências Node.js...
📦 Instalando dependências Python...
🤖 Iniciando bot Python em background...
🚀 Iniciando servidor Node.js...
✅ Bot conectado como: SeuUsuario#1234
```

## ⚠️ Se Não Funcionar

A SquareCloud pode não suportar Python + Node.js juntos. Nesse caso:

### Opção A: Criar 2 Aplicações Separadas

**Aplicação 1 - Painel Web (Node.js)**
- Upload apenas: `server.js`, `package.json`, arquivos HTML
- START: `node server.js`

**Aplicação 2 - Bot Python**
- Upload apenas: `bot.py`, `requirements.txt`
- START: `python bot.py`
- APT: `python3,python3-pip`

### Opção B: Usar Outro Host para o Bot
- **Render.com** (gratuito)
- **Railway.app** (gratuito)
- **Heroku** (pago)

## 📞 Suporte SquareCloud

Se precisar de ajuda:
- Discord: https://discord.gg/squarecloud
- Docs: https://docs.squarecloud.app

---

**Arquivo gerado:** `deploy-squarecloud-atualizado.zip`
**Data:** $(date)
