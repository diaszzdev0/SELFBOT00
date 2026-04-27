# 🔧 ERRO: Configurar .env

## ❌ Erro Encontrado

```
ValueError: invalid literal for int() with base 10: 'id_do_servidor'
```

**Causa:** O arquivo `.env` está com valores de exemplo ao invés dos valores reais.

---

## ✅ Solução

Você precisa editar o arquivo `.env` e substituir os valores de exemplo pelos valores reais.

### 📝 Como Pegar os Valores:

#### 1. DISCORD_TOKEN (Token do Selfbot)

**Como pegar:**
1. Abra o Discord no navegador (Chrome/Firefox)
2. Pressione `F12` para abrir DevTools
3. Vá na aba "Network" (Rede)
4. Pressione `Ctrl+R` para recarregar
5. Digite "api" no filtro
6. Clique em qualquer requisição
7. Vá em "Headers" (Cabeçalhos)
8. Procure por "authorization"
9. Copie o valor (é um texto longo)

**Exemplo:**
```
DISCORD_TOKEN=SEU_TOKEN_AQUI_MUITO_LONGO
```

#### 2. SERVER_ID (ID do Servidor)

**Como pegar:**
1. Ative o Modo Desenvolvedor no Discord:
   - Configurações > Avançado > Modo Desenvolvedor (ativar)
2. Clique com botão direito no servidor
3. Clique em "Copiar ID"

**Exemplo:**
```
SERVER_ID=1234567890123456789
```

#### 3. CATEGORY_ID (ID da Categoria)

**Como pegar:**
1. Com Modo Desenvolvedor ativado
2. Clique com botão direito na categoria que você quer monitorar
3. Clique em "Copiar ID"

**Exemplo:**
```
CATEGORY_ID=9876543210987654321
```

#### 4. EMAIL_USER e EMAIL_PASS (Gmail)

**EMAIL_USER:**
```
EMAIL_USER=seu_email@gmail.com
```

**EMAIL_PASS (Senha de App):**

⚠️ **NÃO use sua senha normal do Gmail!**

**Como gerar senha de app:**
1. Acesse: https://myaccount.google.com/security
2. Ative "Verificação em duas etapas" (se não estiver ativada)
3. Acesse: https://myaccount.google.com/apppasswords
4. Selecione "App: Outro (nome personalizado)"
5. Digite: "SelfBot Discord"
6. Clique em "Gerar"
7. Copie a senha de 16 dígitos (sem espaços)

**Exemplo:**
```
EMAIL_PASS=abcdefghijklmnop
```

#### 5. THREAD_MESSAGE (Opcional)

Mensagem que o bot envia quando uma thread é criada.

**Exemplo:**
```
THREAD_MESSAGE=Olá! Digite: pago Nome Sobrenome para validar seu pagamento de hoje.
```

#### 6. THREAD_IMAGE (Opcional)

URL de uma imagem para enviar junto com a mensagem.

**Exemplo:**
```
THREAD_IMAGE=https://i.imgur.com/exemplo.png
```

Ou deixe vazio se não quiser imagem:
```
THREAD_IMAGE=
```

---

## 📝 Arquivo .env Completo (Exemplo)

Edite o arquivo `.env` e substitua pelos seus valores:

```env
# Banco de Dados Neon (já está correto)
DATABASE_URL=postgresql://neondb_owner:npg_3RJa4bcMnUKm@ep-silent-cloud-anryyduw-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require

# Discord SelfBot (SUBSTITUA PELOS VALORES REAIS)
DISCORD_TOKEN=COLE_SEU_TOKEN_AQUI
SERVER_ID=1234567890123456789
CATEGORY_ID=9876543210987654321

# Email IMAP (SUBSTITUA PELOS VALORES REAIS)
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=abcdefghijklmnop
IMAP_SERVER=imap.gmail.com

# Mensagem e Imagem (OPCIONAL)
THREAD_MESSAGE=Olá! Digite: pago Nome Sobrenome para validar seu pagamento de hoje.
THREAD_IMAGE=
```

---

## 🔧 Como Editar o .env

### Opção 1: Notepad
```bash
notepad .env
```

### Opção 2: VS Code
```bash
code .env
```

### Opção 3: Qualquer editor de texto
1. Abra o arquivo `.env` com qualquer editor
2. Substitua os valores
3. Salve o arquivo

---

## ✅ Verificar se está correto

Depois de editar, execute este comando para verificar:

```bash
python -c "from dotenv import load_dotenv; import os; load_dotenv(); print('TOKEN:', os.getenv('DISCORD_TOKEN')[:20]+'...'); print('SERVER_ID:', os.getenv('SERVER_ID')); print('CATEGORY_ID:', os.getenv('CATEGORY_ID')); print('EMAIL:', os.getenv('EMAIL_USER'))"
```

**Resultado esperado:**
```
TOKEN: (seu token aparecerá aqui)
SERVER_ID: 1234567890123456789
CATEGORY_ID: 9876543210987654321
EMAIL: seu_email@gmail.com
```

**Se aparecer:**
```
SERVER_ID: id_do_servidor
```
→ Você ainda não substituiu os valores!

---

## 🚀 Depois de Configurar

Execute o bot:
```bash
python bot.py
```

**Deve aparecer:**
```
✅ Logged in as SeuUsuario#1234
📋 Monitorando servidor ID: 1234567890123456789
📋 Monitorando categoria ID: 9876543210987654321
💬 Mensagem configurada: Olá! Digite: pago Nome Sobrenome...
⏳ Aguardando criação de threads...
```

---

## 🆘 Ainda com Erro?

### Erro: "invalid literal for int()"
→ SERVER_ID ou CATEGORY_ID ainda estão com texto ao invés de números

### Erro: "LoginFailure: Improper token"
→ DISCORD_TOKEN está errado ou expirado

### Erro: "Authentication failed"
→ EMAIL_USER ou EMAIL_PASS estão errados

---

## 📋 Checklist

- [ ] Copiei o DISCORD_TOKEN do DevTools
- [ ] Copiei o SERVER_ID (clique direito no servidor)
- [ ] Copiei o CATEGORY_ID (clique direito na categoria)
- [ ] Configurei EMAIL_USER (meu email do Gmail)
- [ ] Gerei e copiei EMAIL_PASS (senha de app de 16 dígitos)
- [ ] Salvei o arquivo .env
- [ ] Executei `python bot.py`
- [ ] Bot conectou com sucesso

---

**⚠️ IMPORTANTE:** Nunca compartilhe seu arquivo `.env` com ninguém! Ele contém informações sensíveis.

---

**Versão:** 1.3.0
**Data:** 2025-01-25
