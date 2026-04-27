# 🔧 Correção: Persistência de Configurações no Banco de Dados

## ❌ Problema

As configurações do painel cliente estão sendo salvas apenas no `localStorage` do navegador, que não persiste após o deploy ou ao acessar de outro dispositivo.

## ✅ Solução

Salvar as configurações no banco de dados PostgreSQL (Neon) para que persistam entre deploys e dispositivos.

---

## 📋 Mudanças Necessárias

### 1. Banco de Dados (database.js)

**✅ JÁ APLICADO** - Tabela `user_configs` criada com os campos:
- `discord_token` - Token do Discord
- `server_id` - ID do servidor
- `category_id` - ID da categoria
- `thread_message` - Mensagem da thread
- `image_url` - URL da imagem
- `use_sala_command` - Formato de envio (!sala ou direto)
- `imap_server` - Servidor IMAP
- `email_user` - Email do usuário
- `email_pass` - Senha do email
- `salas_ativas` - Quantidade de salas ativas
- `modos_config` - Configuração dos modos de jogo (JSON)

### 2. API (server.js)

**✅ JÁ APLICADO** - Rotas criadas:
- `GET /api/config/:key` - Buscar configurações do usuário
- `POST /api/config/:key` - Salvar configurações do usuário

### 3. Cliente (cliente.html)

**⚠️ PRECISA APLICAR** - Adicionar funções para salvar/carregar do banco

---

## 🚀 Como Aplicar

### Opção 1: Substituir Funções Manualmente

Abra o arquivo `cliente.html` e substitua as seguintes funções pelas versões do arquivo `client-db-functions.js`:

1. `saveTokenConfig()` - Linha ~XXX
2. `saveModosConfig()` - Linha ~XXX
3. `saveSalasConfig()` - Linha ~XXX
4. `saveImapConfig()` - Linha ~XXX
5. `checkAuth()` - Linha ~XXX
6. `window.addEventListener('load')` - Linha ~XXX

E adicione as novas funções:
- `saveConfigToDatabase()`
- `loadConfigFromDatabase()`

### Opção 2: Script Automático

Execute o script de atualização:

```bash
node update-client.js
```

---

## 🧪 Como Testar

### 1. Testar Salvamento

1. Faça login no painel cliente
2. Configure o token do Discord
3. Clique em "Salvar Token & Mensagem"
4. Deve aparecer: **"Token e mensagem salvos no servidor!"**

### 2. Testar Carregamento

1. Limpe o localStorage do navegador (F12 > Application > Local Storage > Clear)
2. Recarregue a página
3. Faça login novamente
4. As configurações devem ser carregadas automaticamente do banco

### 3. Testar Persistência Entre Dispositivos

1. Configure no computador
2. Acesse de outro dispositivo ou navegador
3. Faça login com o mesmo usuário
4. As configurações devem estar lá

---

## 📊 Fluxo de Salvamento

```
Cliente preenche formulário
        ↓
Clica em "Salvar"
        ↓
Salva no localStorage (backup local)
        ↓
Envia para API: POST /api/config/:key
        ↓
API salva no PostgreSQL (Neon)
        ↓
Retorna sucesso
        ↓
Mostra toast: "Salvo no servidor!"
```

## 📊 Fluxo de Carregamento

```
Cliente faz login
        ↓
checkAuth() é chamado
        ↓
loadConfigFromDatabase() busca da API
        ↓
API busca do PostgreSQL: GET /api/config/:key
        ↓
Retorna configurações
        ↓
Preenche formulários automaticamente
        ↓
Mostra log: "Configurações carregadas do servidor"
```

---

## 🔍 Verificar se Está Funcionando

### No Console do Navegador (F12):

**Ao salvar:**
```
✓ Configurações salvas no banco de dados
```

**Ao carregar:**
```
✓ Configurações carregadas do banco de dados
```

### No Banco de Dados:

```sql
SELECT * FROM user_configs WHERE user_key = 'SUA_KEY';
```

Deve retornar uma linha com todas as configurações.

---

## ⚠️ Fallback

Se o servidor estiver indisponível:
- Salva apenas no localStorage
- Mostra toast: **"Salvo localmente (servidor indisponível)"**
- Ao voltar online, salve novamente para sincronizar

---

## 🔐 Segurança

**Importante:** As senhas são salvas no banco. Em produção, considere:
1. Criptografar senhas antes de salvar
2. Usar HTTPS sempre
3. Não expor a API publicamente sem autenticação

---

## 📝 Checklist de Implementação

- [x] Criar tabela `user_configs` no banco
- [x] Adicionar funções no `database.js`
- [x] Criar rotas na API (`server.js`)
- [ ] Atualizar funções no `cliente.html`
- [ ] Testar salvamento
- [ ] Testar carregamento
- [ ] Testar persistência entre dispositivos
- [ ] Fazer deploy

---

## 🚀 Deploy

Após aplicar as mudanças:

```bash
# Commit
git add .
git commit -m "feat: persistência de configurações no banco de dados"
git push origin main

# Deploy
squarecloud upload
```

---

## 📞 Troubleshooting

### Erro: "Servidor indisponível"
- Verifique se o servidor Node.js está rodando
- Verifique a conexão com o banco Neon
- Teste a rota: `curl http://localhost:3000/api/config/TEST_KEY`

### Configurações não carregam
- Verifique o console do navegador (F12)
- Verifique se a key do usuário está correta
- Verifique se há dados no banco: `SELECT * FROM user_configs;`

### Erro ao salvar
- Verifique se a tabela `user_configs` existe
- Verifique se o usuário está autenticado
- Verifique os logs do servidor: `squarecloud logs`

---

**Status:** ⚠️ IMPLEMENTAÇÃO PENDENTE
**Prioridade:** 🔴 ALTA
**Tempo estimado:** 15-30 minutos
