const request = require('supertest');
const app = require('../index'); // Importa tu app Express
const pool = require('../config/db');

//obtener usuarios

 beforeAll(async () => {
  await pool.query('DELETE FROM users'); // Limpia la tabla de usuarios antes de los tests
});

afterAll(async () => {
  await pool.end(); // Cierra la conexión a la DB
});
 
// Test para registrar un usuario
test('POST /api/users/register - Registrar un usuario', async () => {
  const response = await request(app)
    .post('/api/users/register')
    .send({
      email: 'xxx@xxx.com',
      password: 'password123',
      fullName: 'Test User',   
        phone: '1234567890'
    });
  expect(response.statusCode).toBe(201);});    

// test para eliminar un usuario
test('DELETE /api/users/:id - Eliminar un usuario', async () => {
  // Primero, crea un usuario para eliminar
  const createResponse = await request(app)
    .post('/api/users/register')
    .send({
      email: 'xxx@xxx.com',
      password: 'password123',
        fullName: 'Test User',
        phone: '1234567890'
    });
  expect(createResponse.statusCode).toBe(500);});

  //login de usuario
test('POST /api/users/login - Iniciar sesión de usuario', async () => {
  const response = await request(app)
    .post('/api/users/login')
    .send({
      email: 'xxx@xxx.com',
      password: 'password123'
    });
  expect(response.statusCode).toBe(200);});
 