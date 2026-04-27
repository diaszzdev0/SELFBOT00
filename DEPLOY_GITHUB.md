# 🚀 Deploy via GitHub - Configuração

## ✅ Commit Realizado com Sucesso!

**Commit:** `update`
**Arquivos:** 41 arquivos commitados
**Branch:** master

---

## 📋 Próximos Passos para Deploy via GitHub

### 1️⃣ Criar Repositório no GitHub

1. **Acesse:** https://github.com/new
2. **Nome do repositório:** `cloud-selfbot-manager` (ou outro nome)
3. **Visibilidade:** Private (recomendado) ou Public
4. **NÃO marque:** "Initialize with README" (já temos arquivos)
5. **Clique em:** "Create repository"

---

### 2️⃣ Conectar Repositório Local ao GitHub

Após criar o repositório, o GitHub vai mostrar comandos. Execute:

```bash
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

**OU execute estes comandos (substitua SEU_USUARIO e SEU_REPOSITORIO):**

```bash
cd "c:\Users\Usuario\Desktop\ultima tentativa"
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

---

### 3️⃣ Fazer Login no Git (se necessário)

Se pedir credenciais:

**Opção A: Via Token (Recomendado)**
1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token (classic)"
3. Marque: `repo` (acesso completo)
4. Copie o token
5. Use como senha ao fazer push

**Opção B: Via GitHub CLI**
```bash
gh auth login
```

---

### 4️⃣ Configurar SquareCloud com GitHub

**No Painel da SquareCloud:**

1. Acesse: https://squarecloud.app/dashboard
2. Selecione: Cloud SelfBot Manager
3. Vá em: **Configurações** → **GitHub Integration**
4. Conecte sua conta GitHub
5. Selecione o repositório: `cloud-selfbot-manager`
6. Configure:
   - Branch: `main`
   - Auto-deploy: ✅ Ativado

**Agora, sempre que você fizer push, o deploy será automático!**

---

## 🔄 Comandos para Futuros Updates

Sempre que modificar o código:

```bash
git add .
git commit -m "descrição da mudança"
git push
```

O deploy na SquareCloud será automático! 🎉

---

## ⚠️ IMPORTANTE: Variável de Ambiente

Certifique-se que a variável **DATABASE_URL** está configurada na SquareCloud:

```
DATABASE_URL=postgresql://neondb_owner:npg_3RJa4bcMnUKm@ep-silent-cloud-anryyduw-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**Como configurar:**
1. SquareCloud Dashboard
2. Sua aplicação
3. Configurações → Variáveis de Ambiente
4. Adicione DATABASE_URL

---

## 🎯 Alternativa: Deploy Manual (Sem GitHub)

Se preferir não usar GitHub, você pode fazer upload manual:

1. Use o arquivo: `deploy-squarecloud.zip`
2. Acesse: https://squarecloud.app/dashboard
3. Selecione sua aplicação
4. Faça upload do ZIP

---

## 📊 Status Atual

- ✅ Git inicializado
- ✅ Commit realizado (41 arquivos)
- ⚠️ Repositório remoto não configurado
- ⚠️ Push pendente

---

## 🆘 Precisa de Ajuda?

### Não tem conta no GitHub?
1. Crie em: https://github.com/signup
2. É gratuito!

### Erro ao fazer push?
- Verifique se o repositório foi criado
- Confirme que a URL está correta
- Use token de acesso pessoal como senha

### Prefere deploy manual?
- Use o arquivo `deploy-squarecloud.zip`
- Faça upload direto no painel

---

## 💡 Recomendação

**Use GitHub + SquareCloud Integration:**
- ✅ Deploy automático
- ✅ Histórico de versões
- ✅ Fácil rollback
- ✅ Colaboração facilitada

---

## 🚀 Próxima Ação

**Escolha uma opção:**

**Opção 1: GitHub (Recomendado)**
1. Crie repositório no GitHub
2. Execute os comandos de conexão
3. Configure integração na SquareCloud
4. Faça push

**Opção 2: Upload Manual**
1. Use `deploy-squarecloud.zip`
2. Faça upload no painel da SquareCloud

---

**Me avise qual opção você escolheu para eu te ajudar! 🎯**
