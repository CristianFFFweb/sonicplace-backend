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




module.exports = app; // 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

