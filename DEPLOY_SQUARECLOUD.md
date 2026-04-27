# 🚀 Deploy SquareCloud - Atualização Neon

## 📋 Checklist Antes do Deploy

- [x] Código atualizado com PostgreSQL
- [x] Dependências atualizadas (pg, dotenv)
- [x] Connection string do Neon configurada
- [x] Tabelas testadas e funcionando
- [ ] Variável DATABASE_URL configurada na SquareCloud

---

## 🔧 Passo 1: Configurar Variável de Ambiente

### No Painel da SquareCloud:

1. Acesse: https://squarecloud.app/dashboard
2. Selecione sua aplicação: **Cloud SelfBot Manager**
3. Vá em **"Configurações"** ou **"Settings"**
4. Procure por **"Variáveis de Ambiente"** ou **"Environment Variables"**
5. Adicione a variável:

```
Nome: DATABASE_URL
Valor: postgresql://neondb_owner:npg_3RJa4bcMnUKm@ep-silent-cloud-anryyduw-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require
```

6. Clique em **"Salvar"** ou **"Save"**

---

## 📦 Passo 2: Preparar Arquivos para Upload

### Arquivos que DEVEM ser enviados:
```
✅ server.js (atualizado)
✅ database.js (novo)
✅ package.json (atualizado)
✅ painel.html
✅ cliente.html
✅ squarecloud.config
✅ squarecloud.app
✅ .gitignore
```

### Arquivos que NÃO devem ser enviados:
```
❌ .env (credenciais locais)
❌ node_modules/ (será instalado automaticamente)
❌ data.json (não é mais usado)
❌ *.md (documentação)
❌ test-db.js (apenas para testes locais)
❌ migrate.js (apenas para migração local)
❌ check-tables.js (apenas para verificação local)
```

---

## 🎯 Passo 3: Fazer Deploy

### Opção A: Via CLI (Recomendado)

```bash
# No terminal, na pasta do projeto:
npm run deploy
```

### Opção B: Via Painel Web

1. Acesse: https://squarecloud.app/dashboard
2. Selecione sua aplicação
3. Clique em **"Upload"** ou **"Commit"**
4. Selecione os arquivos necessários
5. Clique em **"Deploy"**

### Opção C: Via GitHub (Automático)

Se você configurou integração com GitHub:
1. Faça commit das mudanças:
   ```bash
   git add .
   git commit -m "Integração com Neon PostgreSQL"
   git push origin main
   ```
2. O deploy será automático

---

## 🔍 Passo 4: Verificar Deploy

### Logs da Aplicação:

```bash
# Via CLI
npm run logs

# Ou no painel web
# Dashboard → Sua App → Logs
```

### O que você deve ver nos logs:
```
✅ Banco de dados inicializado
✅ Servidor rodando na porta 3000
📊 Painel Admin: http://...
👤 Painel Cliente: http://...
```

---

## 🧪 Passo 5: Testar a Aplicação

1. **Acesse o Painel Admin:**
   - URL: `https://cloudselfbot.squarecloud.app/`
   - Login: `Cloud` / `Dev0`

2. **Teste criar um usuário:**
   - Gere uma key
   - Crie um usuário de teste
   - Verifique se foi salvo no banco

3. **Acesse o Painel Cliente:**
   - URL: `https://cloudselfbot.squarecloud.app/cliente`
   - Faça login com o usuário criado

4. **Verifique no Neon Console:**
   - Acesse: https://console.neon.tech
   - Execute: `SELECT * FROM users;`
   - Confirme que o usuário foi salvo

---

## ⚠️ Troubleshooting

### Erro: "DATABASE_URL não configurada"
**Solução:** Configure a variável de ambiente no painel da SquareCloud

### Erro: "Connection refused"
**Solução:** Verifique se a connection string está correta na variável de ambiente

### Erro: "Module not found: pg"
**Solução:** Certifique-se que o `package.json` foi enviado e reinicie a aplicação

### Aplicação não inicia
**Solução:** 
1. Verifique os logs: `npm run logs`
2. Confirme que todos os arquivos foram enviados
3. Reinicie a aplicação no painel

---

## 📊 Monitoramento Pós-Deploy

### SquareCloud Dashboard:
- 📈 CPU e Memória
- 📝 Logs em tempo real
- 🔄 Status da aplicação

### Neon Console:
- 📊 Queries executadas
- 💾 Uso de armazenamento
- 🔍 Dados em tempo real

---

## 🎯 Comandos Úteis

```bash
# Ver status da aplicação
npm run status

# Ver logs em tempo real
npm run logs

# Fazer novo deploy
npm run deploy
```

---

## ✅ Checklist Final

Após o deploy, verifique:

- [ ] Aplicação iniciou sem erros
- [ ] Logs mostram "Banco de dados inicializado"
- [ ] Painel admin acessível
- [ ] Login admin funcionando
- [ ] Criação de usuário funciona
- [ ] Dados são salvos no Neon
- [ ] Painel cliente acessível
- [ ] Login cliente funcionando

---

## 🎉 Deploy Concluído!

Sua aplicação agora está rodando com:
- ✅ Servidor na SquareCloud
- ✅ Banco de dados no Neon
- ✅ Dados persistentes e seguros
- ✅ Backup automático
- ✅ Pronto para produção!

---

**Próximo passo:** Configure a variável `DATABASE_URL` e faça o deploy!
