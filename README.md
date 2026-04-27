# Cloud SelfBot Manager

Sistema de gerenciamento de selfbots do Discord com painel administrativo e cliente.

## 🚀 Arquivos Essenciais

### Backend
- `server.js` - Servidor Node.js (painel web)
- `bot.py` - Bot Discord (selfbot Python)
- `database.js` - Conexão com PostgreSQL (Neon)
- `data-manager.js` - Gerenciamento de dados
- `client-db-functions.js` - Funções do cliente
- `migrate.js` - Migração do banco de dados

### Frontend
- `painel.html` - Painel administrativo
- `cliente.html` - Painel do cliente

### Configuração
- `.env` - Variáveis de ambiente (configure aqui)
- `.env.template` - Template de configuração
- `package.json` - Dependências Node.js
- `requirements.txt` - Dependências Python
- `squarecloud.config` - Configuração SquareCloud
- `start.sh` - Script de inicialização

## ⚙️ Configuração Rápida

1. Configure o `.env` com suas credenciais
2. Instale dependências: `npm install && pip install -r requirements.txt`
3. Execute: `npm start` (Node.js) e `python bot.py` (Bot)

## 🌐 Deploy SquareCloud

1. Faça upload dos arquivos essenciais
2. Configure variáveis de ambiente no dashboard
3. Reinicie a aplicação

## 📦 Backup

Arquivos de documentação e testes foram movidos para `arquivos_backup/`
