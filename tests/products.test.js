const request = require('supertest');
const app = require('../index'); // Importa tu app Express
const pool = require('../config/db');

// Limpia la DB antes y después de los tests
beforeAll(async () => {
  await pool.query('DELETE FROM products'); // Ajusta según tu tabla
});

afterAll(async () => {
  await pool.end(); // Cierra la conexión a la DB
});

// Test para obtener todos los productos
test('GET /api/products - Obtener todos los productos', async () => {
  const response = await request(app).get('/api/products');
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});


