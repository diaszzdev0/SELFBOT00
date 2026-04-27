const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Inicializar tabelas
async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        key VARCHAR(100) UNIQUE NOT NULL,
        plan VARCHAR(20) NOT NULL,
        expires_at TIMESTAMP,
        rooms INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS rooms (
        id SERIAL PRIMARY KEY,
        room_id VARCHAR(50) NOT NULL,
        room_pass VARCHAR(50) NOT NULL,
        mode VARCHAR(50) NOT NULL,
        status VARCHAR(20) DEFAULT 'disponivel',
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      INSERT INTO admin_users (username, password) 
      VALUES ('Cloud', 'Dev0') 
      ON CONFLICT (username) DO NOTHING;
    `);
    console.log('✅ Banco de dados inicializado');
  } catch (err) {
    console.error('❌ Erro ao inicializar DB:', err);
  } finally {
    client.release();
  }
}

// Users
async function getUsers() {
  const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
  return result.rows;
}

async function createUser(username, key, plan, expiresAt, rooms = 0) {
  const result = await pool.query(
    'INSERT INTO users (username, key, plan, expires_at, rooms) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [username, key, plan, expiresAt, rooms]
  );
  return result.rows[0];
}

async function getUserByKey(key) {
  const result = await pool.query('SELECT * FROM users WHERE key = $1', [key]);
  return result.rows[0];
}

async function updateUser(key, data) {
  const fields = [];
  const values = [];
  let idx = 1;

  if (data.rooms !== undefined) {
    fields.push(`rooms = $${idx++}`);
    values.push(data.rooms);
  }
  if (data.expires_at !== undefined) {
    fields.push(`expires_at = $${idx++}`);
    values.push(data.expires_at);
  }
  if (data.plan !== undefined) {
    fields.push(`plan = $${idx++}`);
    values.push(data.plan);
  }

  values.push(key);
  const result = await pool.query(
    `UPDATE users SET ${fields.join(', ')} WHERE key = $${idx} RETURNING *`,
    values
  );
  return result.rows[0];
}

async function deleteUser(key) {
  await pool.query('DELETE FROM users WHERE key = $1', [key]);
}

// Rooms
async function getRooms() {
  const result = await pool.query('SELECT * FROM rooms ORDER BY created_at DESC');
  return result.rows;
}

async function createRoom(roomId, roomPass, mode) {
  const result = await pool.query(
    'INSERT INTO rooms (room_id, room_pass, mode) VALUES ($1, $2, $3) RETURNING *',
    [roomId, roomPass, mode]
  );
  return result.rows[0];
}

async function deleteRoom(id) {
  await pool.query('DELETE FROM rooms WHERE id = $1', [id]);
}

// Admin
async function verifyAdmin(username, password) {
  const result = await pool.query(
    'SELECT * FROM admin_users WHERE username = $1 AND password = $2',
    [username, password]
  );
  return result.rows.length > 0;
}

module.exports = {
  initDB,
  getUsers,
  createUser,
  getUserByKey,
  updateUser,
  deleteUser,
  getRooms,
  createRoom,
  deleteRoom,
  verifyAdmin
};
