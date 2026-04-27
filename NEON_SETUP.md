# Configuração do Banco de Dados Neon

## 1. Obter Connection String do Neon

1. Acesse seu projeto no [Neon Console](https://console.neon.tech)
2. Vá em **Dashboard** → **Connection Details**
3. Copie a **Connection String** (formato: `postgresql://user:password@host/database?sslmode=require`)

## 2. Configurar no Projeto

Edite o arquivo `.env` e adicione sua connection string:

```env
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

## 3. Instalar Dependências

```bash
npm install
```

## 4. Iniciar Servidor

```bash
npm start
```

O banco de dados será inicializado automaticamente com as tabelas:
- `users` - Usuários do sistema
- `rooms` - Salas disponíveis
- `admin_users` - Administradores (usuário padrão: Cloud/Dev0)

## 5. Deploy no GitHub + Neon

### No GitHub:
1. Adicione `.env` ao `.gitignore` (já configurado)
2. Faça commit e push do código

### No Neon:
- O banco já está vinculado ao GitHub automaticamente
- As tabelas serão criadas na primeira execução

### Variáveis de Ambiente (SquareCloud/Vercel/Render):
Configure a variável:
```
DATABASE_URL=sua_connection_string_aqui
```

## Estrutura das Tabelas

### users
- `id` - ID único
- `username` - Nome do usuário
- `key` - Chave de acesso (única)
- `plan` - Plano (semanal/mensal/permanente)
- `expires_at` - Data de expiração
- `rooms` - Quantidade de salas
- `created_at` - Data de criação

### rooms
- `id` - ID único
- `room_id` - ID da sala
- `room_pass` - Senha da sala
- `mode` - Modo de jogo
- `status` - Status (disponível/em uso)
- `created_at` - Data de criação

### admin_users
- `id` - ID único
- `username` - Usuário admin
- `password` - Senha
- `created_at` - Data de criação
