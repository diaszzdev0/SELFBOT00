# 📡 Exemplos de Uso da API

## Autenticação Admin

```javascript
// Login
fetch('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'Cloud',
    password: 'Dev0'
  })
})
.then(r => r.json())
.then(data => console.log(data.success)); // true ou false
```

## Gerenciar Usuários

### Criar Usuário
```javascript
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'João',
    key: 'CLOUD-ABC123',
    plan: 'mensal',
    expires_at: '2024-12-31T23:59:59',
    rooms: 5
  })
})
.then(r => r.json())
.then(user => console.log(user));
```

### Listar Todos os Usuários
```javascript
fetch('/api/users')
  .then(r => r.json())
  .then(users => console.log(users));
```

### Buscar Usuário por Key
```javascript
fetch('/api/users/CLOUD-ABC123')
  .then(r => r.json())
  .then(user => console.log(user));
```

### Atualizar Usuário
```javascript
fetch('/api/users/CLOUD-ABC123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    rooms: 10,
    expires_at: '2025-01-31T23:59:59'
  })
})
.then(r => r.json())
.then(user => console.log(user));
```

### Deletar Usuário
```javascript
fetch('/api/users/CLOUD-ABC123', {
  method: 'DELETE'
})
.then(r => r.json())
.then(result => console.log(result.success));
```

## Gerenciar Salas

### Criar Sala
```javascript
fetch('/api/rooms', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    room_id: '123456',
    room_pass: '7890',
    mode: 'Gelo Normal 2x2 Mobile'
  })
})
.then(r => r.json())
.then(room => console.log(room));
```

### Listar Todas as Salas
```javascript
fetch('/api/rooms')
  .then(r => r.json())
  .then(rooms => console.log(rooms));
```

### Deletar Sala
```javascript
fetch('/api/rooms/1', {
  method: 'DELETE'
})
.then(r => r.json())
.then(result => console.log(result.success));
```

## Exemplos Práticos

### Verificar Login do Cliente
```javascript
async function loginCliente(username, key) {
  const response = await fetch(`/api/users/${key}`);
  const user = await response.json();
  
  if (user && user.username === username) {
    // Verificar expiração
    if (user.expires_at && new Date(user.expires_at) < new Date()) {
      return { success: false, error: 'Plano expirado' };
    }
    return { success: true, user };
  }
  
  return { success: false, error: 'Credenciais inválidas' };
}
```

### Adicionar Salas ao Usuário
```javascript
async function adicionarSalas(key, quantidade) {
  const response = await fetch(`/api/users/${key}`);
  const user = await response.json();
  
  if (!user) return { success: false, error: 'Usuário não encontrado' };
  
  const novaQuantidade = user.rooms + quantidade;
  
  const updateResponse = await fetch(`/api/users/${key}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rooms: novaQuantidade })
  });
  
  return await updateResponse.json();
}
```

### Renovar Plano
```javascript
async function renovarPlano(key, dias) {
  const response = await fetch(`/api/users/${key}`);
  const user = await response.json();
  
  if (!user) return { success: false, error: 'Usuário não encontrado' };
  
  const dataAtual = user.expires_at ? new Date(user.expires_at) : new Date();
  const novaData = new Date(dataAtual.getTime() + dias * 24 * 60 * 60 * 1000);
  
  const updateResponse = await fetch(`/api/users/${key}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expires_at: novaData.toISOString() })
  });
  
  return await updateResponse.json();
}
```

### Gerar Key Única
```javascript
function gerarKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = 'CLOUD-';
  for (let i = 0; i < 8; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}
```

## Tratamento de Erros

```javascript
async function exemploComErros() {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Teste',
        key: 'CLOUD-TEST',
        plan: 'semanal'
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error('Erro:', error.error);
      return;
    }
    
    const user = await response.json();
    console.log('Usuário criado:', user);
  } catch (err) {
    console.error('Erro de rede:', err);
  }
}
```
