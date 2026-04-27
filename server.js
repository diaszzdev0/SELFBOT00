const express = require('express');
const path = require('path');
const db = require('./database');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

// Rotas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'painel.html'));
});

app.get('/cliente', (req, res) => {
  res.sendFile(path.join(__dirname, 'cliente.html'));
});

// API - Login Admin
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const valid = await db.verifyAdmin(username, password);
    res.json({ success: valid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API - Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { username, key, plan, expires_at, rooms } = req.body;
    const user = await db.createUser(username, key, plan, expires_at, rooms);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users/:key', async (req, res) => {
  try {
    const user = await db.getUserByKey(req.params.key);
    res.json(user || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/:key', async (req, res) => {
  try {
    const user = await db.updateUser(req.params.key, req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:key', async (req, res) => {
  try {
    await db.deleteUser(req.params.key);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API - Rooms
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await db.getRooms();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/rooms', async (req, res) => {
  try {
    const { room_id, room_pass, mode } = req.body;
    const room = await db.createRoom(room_id, room_pass, mode);
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/rooms/:id', async (req, res) => {
  try {
    await db.deleteRoom(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor
db.initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
    console.log(`📊 Painel Admin: http://localhost:${PORT}/`);
    console.log(`👤 Painel Cliente: http://localhost:${PORT}/cliente`);
  });
});
