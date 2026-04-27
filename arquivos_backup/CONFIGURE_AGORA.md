# 🎯 CONFIGURE AGORA - Passo a Passo

## ⚡ Configuração Rápida (5 minutos)

### Passo 1: Obter Connection String do Neon

1. Acesse: https://console.neon.tech
2. Faça login (ou crie conta gratuita)
3. Clique no seu projeto (ou crie um novo)
4. No Dashboard, procure por **"Connection Details"** ou **"Connection String"**
5. Copie a string que parece com isso:
   ```
   postgresql://usuario:senha@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### Passo 2: Colar no .env

Abra o arquivo `.env` e substitua:

**ANTES:**
```env
DATABASE_URL=sua_connection_string_do_neon_aqui
```

**DEPOIS:**
```env
DATABASE_URL=postgresql://usuario:senha@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### Passo 3: Testar Conexão

Abra o terminal e execute:
```bash
npm run test-db
```

✅ Se ver "Conexão estabelecida com sucesso!" → Tudo certo!
❌ Se der erro → Verifique se copiou a string completa

### Passo 4: Iniciar Servidor

```bash
npm start
```

### Passo 5: Acessar Painéis

- **Admin**: http://localhost:3000/
- **Cliente**: http://localhost:3000/cliente

---

## 🆘 Não tem conta no Neon?

### Criar Conta Gratuita (2 minutos):

1. Acesse: https://console.neon.tech
2. Clique em **"Sign Up"**
3. Use GitHub, Google ou Email
4. Crie um novo projeto
5. Copie a Connection String
6. Cole no `.env`

### Plano Gratuito Inclui:
- ✅ 0.5 GB de armazenamento
- ✅ Backup automático
- ✅ SSL/TLS
- ✅ Suficiente para centenas de usuários

---

## 📋 Checklist Rápido

- [ ] Conta criada no Neon
- [ ] Connection String copiada
- [ ] Colada no arquivo `.env`
- [ ] Executado `npm install` (já feito ✅)
- [ ] Executado `npm run test-db`
- [ ] Executado `npm start`
- [ ] Acessado http://localhost:3000/

---

## 🎬 Exemplo Visual

Sua Connection String deve ter este formato:

```
postgresql://[usuario]:[senha]@[host]/[database]?sslmode=require
           └─────┬─────┘ └──┬──┘ └────┬────┘ └────┬────┘
                 │          │         │            │
            Credenciais   Servidor   Nome DB    SSL obrigatório
```

**Exemplo real:**
```
postgresql://myuser:abc123xyz@ep-cool-morning-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

## ⚠️ Problemas Comuns

### "DATABASE_URL não configurada"
→ Você esqueceu de salvar o arquivo `.env`

### "Connection refused"
→ Verifique se copiou a string completa (incluindo `?sslmode=require`)

### "SSL required"
→ Adicione `?sslmode=require` no final da string

---

## 🚀 Depois de Configurar

Execute estes comandos em ordem:

```bash
# 1. Testar conexão
npm run test-db

# 2. Iniciar servidor (cria as tabelas automaticamente)
npm start

# 3. Acessar painel admin
# Abra: http://localhost:3000/
# Login: Cloud / Dev0
```

---

## 💡 Dica Pro

Salve sua Connection String em um lugar seguro (gerenciador de senhas).
Você vai precisar dela para deploy em produção!

---

**Pronto para começar? Configure o `.env` e execute `npm start`! 🎉**
