# Cloud SelfBot Manager

Sistema completo de gerenciamento de selfbots do Discord com painel administrativo, painel cliente e banco de dados PostgreSQL (Neon).

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

### GitHub + Neon
1. Faça push do código para o GitHub
2. O Neon já está vinculado automaticamente
3. Configure a variável `DATABASE_URL` no seu host

### SquareCloud
1. Configure a variável de ambiente `DATABASE_URL`
2. Faça upload dos arquivos
3. Inicie a aplicação

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

- Node.js + Express
- HTML5 + CSS3 + JavaScript
- LocalStorage para persistência
- Discord API
- SalasFF API

## 📄 Licença

MIT
