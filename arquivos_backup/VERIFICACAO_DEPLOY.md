# ✅ Verificação Pós-Deploy SquareCloud

## 🔍 Passo 1: Encontrar a URL da Sua Aplicação

### No Painel da SquareCloud:

1. Acesse: https://squarecloud.app/dashboard
2. Clique na sua aplicação: **Cloud SelfBot Manager**
3. Procure pela URL/Domínio da aplicação

A URL pode estar em um destes formatos:
- `https://cloudselfbot.squarecloud.app`
- `https://seu-app.squarecloud.app`
- `https://custom-domain.com` (se configurou domínio próprio)

---

## 🧪 Passo 2: Testar a Aplicação

### Teste Manual:

1. **Abra a URL no navegador**
   - Deve carregar o painel admin

2. **Teste o login:**
   - Usuário: `Cloud`
   - Senha: `Dev0`

3. **Tente criar um usuário:**
   - Gere uma key
   - Preencha os dados
   - Clique em criar

### Se funcionar:
✅ **Parabéns! Está tudo funcionando!**

### Se não funcionar:
❌ Continue para o Passo 3

---

## 🔧 Passo 3: Verificar Configurações

### A) Verificar Variável de Ambiente

No painel da SquareCloud:
1. Vá em **Configurações** → **Variáveis de Ambiente**
2. Confirme que existe:
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_3RJa4bcMnUKm@ep-silent-cloud-anryyduw-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

### B) Verificar Logs

No painel da SquareCloud:
1. Vá em **Logs**
2. Procure por:
   - ✅ `"Banco de dados inicializado"`
   - ✅ `"Servidor rodando na porta 3000"`
   - ❌ Erros de conexão
   - ❌ "DATABASE_URL não configurada"

### C) Verificar Status

No painel da SquareCloud:
1. Vá em **Status** ou **Overview**
2. Confirme que está:
   - ✅ **Running** (Rodando)
   - ❌ **Stopped** (Parado)
   - ❌ **Error** (Erro)

---

## 🐛 Troubleshooting

### Erro: "DATABASE_URL não configurada"

**Solução:**
1. Adicione a variável no painel da SquareCloud
2. Reinicie a aplicação

### Erro: "Cannot connect to database"

**Solução:**
1. Verifique se a connection string está correta
2. Teste a conexão localmente: `npm run test-db`
3. Confirme que não tem espaços extras na variável

### Erro: "Module not found: pg"

**Solução:**
1. Confirme que o `package.json` foi enviado
2. Reinicie a aplicação (ela vai reinstalar as dependências)

### Aplicação não inicia

**Solução:**
1. Verifique os logs
2. Confirme que todos os arquivos foram enviados:
   - ✅ server.js
   - ✅ database.js
   - ✅ package.json
   - ✅ painel.html
   - ✅ cliente.html
3. Reinicie a aplicação

### Página em branco

**Solução:**
1. Abra o console do navegador (F12)
2. Verifique se há erros JavaScript
3. Confirme que os arquivos HTML foram enviados

---

## 📊 Checklist de Verificação

Marque conforme verifica:

### Configuração:
- [ ] DATABASE_URL configurada na SquareCloud
- [ ] Todos os arquivos enviados (server.js, database.js, etc)
- [ ] package.json com dependências corretas

### Status:
- [ ] Aplicação com status "Running"
- [ ] Logs mostram "Banco de dados inicializado"
- [ ] Logs mostram "Servidor rodando"
- [ ] Sem erros nos logs

### Funcionalidade:
- [ ] URL abre o painel admin
- [ ] Login admin funciona (Cloud/Dev0)
- [ ] Consegue criar usuário
- [ ] Dados são salvos (verifique no Neon Console)
- [ ] Painel cliente acessível (/cliente)

---

## 🎯 Teste Rápido via API

Se você souber a URL correta, edite o arquivo `test-production.js`:

```javascript
// Linha 3, altere para sua URL:
const BASE_URL = 'sua-url-aqui.squarecloud.app';
```

Depois execute:
```bash
npm run test-prod
```

---

## ✅ Tudo Funcionando?

Se todos os testes passaram:

1. **Altere a senha do admin** (recomendado):
   - Acesse: https://console.neon.tech
   - Execute:
     ```sql
     UPDATE admin_users 
     SET password = 'SuaSenhaForte123!' 
     WHERE username = 'Cloud';
     ```

2. **Comece a usar:**
   - Crie usuários
   - Adicione salas
   - Configure os clientes

3. **Monitore:**
   - Logs da SquareCloud
   - Neon Console (uso do banco)

---

## 📞 Ainda com Problemas?

### Informações para Debug:

Colete estas informações:
1. URL da aplicação
2. Status no painel (Running/Stopped/Error)
3. Últimas linhas dos logs
4. Mensagem de erro (se houver)

### Comandos Úteis:

```bash
# Ver logs em tempo real
npm run logs

# Ver status da aplicação
npm run status

# Testar banco localmente
npm run test-db

# Verificar tabelas no Neon
npm run check-tables
```

---

## 🎉 Próximos Passos

Quando tudo estiver funcionando:

1. ✅ Teste criar alguns usuários
2. ✅ Teste o painel cliente
3. ✅ Configure os tokens do Discord
4. ✅ Adicione salas
5. ✅ Monitore o uso

**Seu sistema está pronto para produção! 🚀**
