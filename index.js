const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const DestacadosOfertasRoutes = require('./routes/DestacadosOfertasRoutes');
const busquedaRoutes = require('./routes/busquedaRoutes');

const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/destacados', express.static(path.join(__dirname, 'public/destacados')));
app.use('/ofertas', express.static(path.join(__dirname, 'public/ofertas')));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api', DestacadosOfertasRoutes);
app.use('/api/busqueda', busquedaRoutes);
app.get('/probar-bd', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users LIMIT 1');
    res.json({
      mensaje: 'Conexión a Supabase exitosa 🎉',
      primerUsuario: result.rows[0] || 'No hay usuarios en la tabla',
    });
  } catch (error) {
    console.error('❌ Error al consultar Supabase:', error);
    res.status(500).json({ error: 'Error al conectar con la base de datos', detalle: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('✅ SonicPlace backend funcionando desde Render');
});

module.exports = app; // 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

