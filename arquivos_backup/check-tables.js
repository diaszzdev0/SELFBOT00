const { Pool } = require('pg');
require('dotenv').config();

async function checkTables() {
  console.log('🔍 Verificando tabelas no banco Neon...\n');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();

    // Listar todas as tabelas
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log('📋 Tabelas encontradas:');
    if (tables.rows.length === 0) {
      console.log('  ⚠️  Nenhuma tabela encontrada');
    } else {
      tables.rows.forEach(row => console.log(`  ✅ ${row.table_name}`));
    }

    // Verificar dados em cada tabela
    for (const row of tables.rows) {
      const tableName = row.table_name;
      const count = await client.query(`SELECT COUNT(*) FROM ${tableName}`);
      console.log(`     └─ ${count.rows[0].count} registros`);
    }

    client.release();
    await pool.end();
    console.log('\n✅ Verificação concluída!');
  } catch (err) {
    console.error('❌ Erro:', err.message);
    process.exit(1);
  }
}

checkTables();
