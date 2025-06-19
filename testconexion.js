const pool = require('./config/db');

pool.query('SELECT NOW()')
  .then(res => {
    console.log('✅ Conexión exitosa a Supabase:', res.rows);
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error al conectar:', err);
    process.exit(1);
  });
