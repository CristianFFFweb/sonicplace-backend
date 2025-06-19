const express = require('express');
const router = express.Router();
const pool = require('../config/db');
// GET /api/busqueda?query=nombre
router.get('/', async (req, res) => {
  const { nombre } = req.query;
  if (!nombre) return res.status(400).json({ error: 'Falta nombre de búsqueda' });

  try {
    const [productos, destacados, ofertas] = await Promise.all([
      pool.query("SELECT *, 'products' as origen FROM products WHERE LOWER(nombre) LIKE LOWER($1)", [`%${nombre}%`]),
      pool.query("SELECT *, 'destacados' as origen FROM destacados WHERE LOWER(nombre) LIKE LOWER($1)", [`%${nombre}%`]),
      pool.query("SELECT *, 'ofertas' as origen FROM ofertas WHERE LOWER(nombre) LIKE LOWER($1)", [`%${nombre}%`]),
    ]);

    const resultados = [
      ...productos.rows,
      ...destacados.rows,
      ...ofertas.rows
    ];

    res.json(resultados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno en búsqueda' });
  }
});

module.exports = router;