const fs = require('fs');
const db = require('./database');

async function migrate() {
  console.log('🔄 Iniciando migração de dados...');

  try {
    // Verificar se existe arquivo data.json
    if (!fs.existsSync('./data.json')) {
      console.log('⚠️  Arquivo data.json não encontrado. Nada para migrar.');
      process.exit(0);
    }

    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

    // Migrar usuários
    if (data.users && data.users.length > 0) {
      console.log(`📦 Migrando ${data.users.length} usuários...`);
      for (const user of data.users) {
        try {
          await db.createUser(
            user.username,
            user.key,
            user.plan,
            user.expires_at || null,
            user.rooms || 0
          );
          console.log(`  ✅ ${user.username}`);
        } catch (err) {
          console.log(`  ⚠️  ${user.username} - ${err.message}`);
        }
      }
    }

    // Migrar salas
    if (data.rooms && data.rooms.length > 0) {
      console.log(`📦 Migrando ${data.rooms.length} salas...`);
      for (const room of data.rooms) {
        try {
          await db.createRoom(room.room_id, room.room_pass, room.mode);
          console.log(`  ✅ Sala ${room.room_id}`);
        } catch (err) {
          console.log(`  ⚠️  Sala ${room.room_id} - ${err.message}`);
        }
      }
    }

    console.log('✅ Migração concluída!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro na migração:', err);
    process.exit(1);
  }
}

// Inicializar DB e migrar
db.initDB().then(() => migrate());
