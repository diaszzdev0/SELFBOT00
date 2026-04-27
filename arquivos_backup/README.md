# Cloud SelfBot Manager

Sistema completo de gerenciamento de selfbots do Discord com painel administrativo, painel cliente e banco de dados PostgreSQL (Neon).

## ✅ Última Atualização (v1.3.0)

**Correções Aplicadas:**
- ✓ Bot agora envia mensagens nas threads corretamente (adicionado `thread.join()`)
- ✓ Comando `pg Nome` funciona com 1 ou mais palavras
- ✓ Logs detalhados em todas as operações
- ✓ Tratamento de erros adequado
- ✓ **NOVO:** Comando `!comando` para enviar instruções de verificação

**Comandos que funcionam:**
- `pg João` ✓
- `pago Maria` ✓
- `pg João Silva` ✓
- `PG JOÃO` ✓
- `!comando` ✓ (apenas para o dono do selfbot)

📖 **Documentação:** Veja [GUIA_RAPIDO.md](GUIA_RAPIDO.md) para deploy rápido

---

## 🚀 Funcionalidades

### Painel Admin (`/`)
- Geração de keys de acesso
- Gerenciamento de usuários
- Controle de planos (Semanal, Mensal, Permanente)
- Gerenciamento de salas disponíveis
- Integração com API SalasFF
- Sistema de renovação e adição de salas

### Painel Cliente (`/cliente`)
- Login com usuário e key
- Configuração de token do Discord
- Detecção automática de modos de jogo (Gelo Normal, Gel Infinito)
- Configuração de IMAP para validação de pagamentos
- Gerenciamento de salas ativas
- Sistema de logs em tempo real
- Formato customizável de envio de salas (!sala ou direto)

## 📦 Instalação Local

### 1. Configurar Banco de Dados Neon

1. Acesse [Neon Console](https://console.neon.tech)
2. Copie sua **Connection String**
3. Cole no arquivo `.env`:

```env
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

### 2. Instalar e Executar

```bash
npm install
npm start
```

Acesse:
- Painel Admin: http://localhost:3000/
- Painel Cliente: http://localhost:3000/cliente

## 🔐 Credenciais Padrão (Admin)

- Usuário: `Cloud`
- Senha: `Dev0`

## 🌐 Deploy

### Guia Rápido
➡️ **[GUIA_RAPIDO.md](GUIA_RAPIDO.md)** - Deploy em 5 minutos
➡️ **[DEPLOY_INSTRUCTIONS.md](DEPLOY_INSTRUCTIONS.md)** - Guia completo passo a passo
➡️ **[CORRECOES_APLICADAS.md](CORRECOES_APLICADAS.md)** - Detalhes técnicos das correções

### GitHub + Neon
1. Faça push do código para o GitHub
2. O Neon já está vinculado automaticamente
3. Configure a variável `DATABASE_URL` no seu host

### SquareCloud
1. Configure a variável de ambiente `DATABASE_URL`
2. Faça upload dos arquivos
3. Inicie a aplicação

### Bot Python
```bash
pip install -r requirements.txt
python bot.py
```

**Importante:** O bot Python precisa rodar separadamente do servidor Node.js.

## 🗄️ Banco de Dados

### Tabelas Criadas Automaticamente:
- **users** - Usuários e keys
- **rooms** - Salas disponíveis
- **admin_users** - Administradores

Veja [NEON_SETUP.md](NEON_SETUP.md) para detalhes.

## 📝 Configuração

### Modos de Jogo Detectados:
- **Gelo Normal**: 1x1, 2x2, 3x3, 4x4 (mobile, misto, emulador)
- **Gel Infinito**: 1x1 (mobile ou emulador)

### API SalasFF
- Key configurada no código
- Integração automática para buscar salas disponíveis

## 🛠️ Tecnologias

**Backend:**
- Node.js + Express
- Python 3.x + discord.py-self
- PostgreSQL (Neon)

**Frontend:**
- HTML5 + CSS3 + JavaScript
- LocalStorage para persistência

**Integrações:**
- Discord API (SelfBot)
- IMAP (Gmail)
- SalasFF API

## 🧪 Testes

Execute os testes para validar as correções:

```bash
python test_simples.py
```

**Resultado esperado:**
- ✓ 14/15 testes de padrões de comando (93%)
- ✓ 6/6 testes de extração de nome (100%)

## 📚 Documentação

- **[GUIA_RAPIDO.md](GUIA_RAPIDO.md)** - Deploy rápido em 5 minutos
- **[DEPLOY_INSTRUCTIONS.md](DEPLOY_INSTRUCTIONS.md)** - Guia completo de deploy
- **[CORRECOES_APLICADAS.md](CORRECOES_APLICADAS.md)** - Detalhes técnicos
- **[RESUMO_DEPLOY.md](RESUMO_DEPLOY.md)** - Resumo executivo
- **[NEON_SETUP.md](NEON_SETUP.md)** - Configuração do banco de dados
- **[COMANDO_INSTRUCOES.md](COMANDO_INSTRUCOES.md)** - Comando !comando para instruções
- **[TROUBLESHOOTING_THREADS.md](TROUBLESHOOTING_THREADS.md)** - Solução de problemas

## 📄 Licença

MIT
