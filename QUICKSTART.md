# 🚀 Guia Rápido - Neon Database

## Passo 1: Configurar Connection String

1. Acesse https://console.neon.tech
2. Selecione seu projeto
3. Copie a **Connection String** em Dashboard
4. Cole no arquivo `.env`:

```env
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

## Passo 2: Instalar Dependências

```bash
npm install
```

## Passo 3: Testar Conexão

```bash
npm run test-db
```

Você deve ver:
```
✅ Conexão estabelecida com sucesso!
📊 Versão do PostgreSQL: ...
```

## Passo 4: Iniciar Servidor

```bash
npm start
```

O banco será inicializado automaticamente com:
- Tabela `users`
- Tabela `rooms`
- Tabela `admin_users` (com usuário Cloud/Dev0)

## Passo 5: Acessar Painéis

- **Admin**: http://localhost:3000/
- **Cliente**: http://localhost:3000/cliente

## 🔄 Migrar Dados Antigos (Opcional)

Se você tinha dados no `data.json`:

```bash
npm run migrate
```

## 📝 Comandos Úteis

```bash
npm start          # Iniciar servidor
npm run test-db    # Testar conexão
npm run migrate    # Migrar dados antigos
```

## ⚠️ Troubleshooting

### Erro: "DATABASE_URL não configurada"
- Verifique se o arquivo `.env` existe
- Confirme que a variável `DATABASE_URL` está preenchida

### Erro: "Connection refused"
- Verifique se a connection string está correta
- Confirme que seu IP está autorizado no Neon (geralmente liberado por padrão)

### Erro: "SSL required"
- Certifique-se que a connection string termina com `?sslmode=require`

## 🌐 Deploy

### Variáveis de Ambiente Necessárias:
```
DATABASE_URL=sua_connection_string_do_neon
```

Configure em:
- **SquareCloud**: Painel → Variáveis de Ambiente
- **Vercel**: Settings → Environment Variables
- **Render**: Environment → Add Environment Variable
