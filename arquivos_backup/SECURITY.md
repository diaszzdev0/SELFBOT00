# 🔒 Segurança e Boas Práticas

## ⚠️ IMPORTANTE - Antes do Deploy

### 1. Proteger Credenciais Admin

O usuário admin padrão (`Cloud/Dev0`) deve ser alterado em produção:

```sql
-- Conecte ao Neon Console e execute:
UPDATE admin_users 
SET username = 'seu_novo_usuario', password = 'sua_senha_forte' 
WHERE username = 'Cloud';
```

Ou adicione hash de senha no código (recomendado):

```bash
npm install bcrypt
```

```javascript
// Em database.js
const bcrypt = require('bcrypt');

async function createAdmin(username, password) {
  const hash = await bcrypt.hash(password, 10);
  await pool.query(
    'INSERT INTO admin_users (username, password) VALUES ($1, $2)',
    [username, hash]
  );
}

async function verifyAdmin(username, password) {
  const result = await pool.query(
    'SELECT * FROM admin_users WHERE username = $1',
    [username]
  );
  if (result.rows.length === 0) return false;
  return await bcrypt.compare(password, result.rows[0].password);
}
```

### 2. Variáveis de Ambiente

**NUNCA** commite o arquivo `.env` no GitHub:

```bash
# Verifique se está no .gitignore
cat .gitignore | grep .env
```

### 3. Connection String Segura

Use variáveis de ambiente em produção:

```javascript
// ✅ CORRETO
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// ❌ ERRADO
const pool = new Pool({
  connectionString: 'postgresql://user:pass@host/db'
});
```

### 4. Validação de Entrada

Adicione validação nos endpoints:

```javascript
app.post('/api/users', async (req, res) => {
  const { username, key, plan } = req.body;
  
  // Validar campos obrigatórios
  if (!username || !key || !plan) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }
  
  // Validar formato da key
  if (!/^CLOUD-[A-Z0-9]{8}$/.test(key)) {
    return res.status(400).json({ error: 'Formato de key inválido' });
  }
  
  // Validar plano
  if (!['semanal', 'mensal', 'permanente'].includes(plan)) {
    return res.status(400).json({ error: 'Plano inválido' });
  }
  
  // Criar usuário...
});
```

### 5. Rate Limiting

Proteja contra ataques de força bruta:

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requisições
});

app.use('/api/', limiter);
```

### 6. CORS

Configure CORS adequadamente:

```bash
npm install cors
```

```javascript
const cors = require('cors');

app.use(cors({
  origin: 'https://seu-dominio.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
```

### 7. HTTPS

Use HTTPS em produção:
- SquareCloud: Automático
- Vercel: Automático
- Render: Automático

### 8. SQL Injection

✅ O código já está protegido usando queries parametrizadas:

```javascript
// ✅ SEGURO (parametrizado)
pool.query('SELECT * FROM users WHERE key = $1', [key]);

// ❌ INSEGURO (concatenação)
pool.query(`SELECT * FROM users WHERE key = '${key}'`);
```

### 9. Logs Sensíveis

Não logue informações sensíveis:

```javascript
// ❌ ERRADO
console.log('User password:', password);

// ✅ CORRETO
console.log('User authenticated:', username);
```

### 10. Backup do Banco

O Neon faz backup automático, mas você pode exportar:

```bash
# No Neon Console
# Settings → Backups → Export Database
```

## 🛡️ Checklist de Segurança

Antes do deploy, verifique:

- [ ] `.env` está no `.gitignore`
- [ ] Credenciais admin alteradas
- [ ] DATABASE_URL configurada como variável de ambiente
- [ ] Validação de entrada implementada
- [ ] Rate limiting configurado
- [ ] CORS configurado
- [ ] HTTPS habilitado
- [ ] Logs não expõem dados sensíveis
- [ ] Queries parametrizadas (SQL injection)
- [ ] Backup configurado

## 🔐 Neon Security

O Neon já fornece:
- ✅ SSL/TLS obrigatório
- ✅ Criptografia em repouso
- ✅ Backup automático
- ✅ Isolamento de dados
- ✅ Autenticação segura

## 📞 Em Caso de Comprometimento

1. Revogue imediatamente a connection string no Neon
2. Gere nova connection string
3. Atualize a variável `DATABASE_URL`
4. Altere todas as senhas de admin
5. Revise logs de acesso
6. Notifique usuários se necessário

## 📚 Recursos

- [Neon Security](https://neon.tech/docs/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
