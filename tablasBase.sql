DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS destacados;
DROP TABLE IF EXISTS ofertas;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  fullName TEXT NOT NULL,
  phone TEXT
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio NUMERIC(10, 2) NOT NULL,
  imagen VARCHAR(255),
  stock INTEGER DEFAULT 1,
  estado VARCHAR(20), -- Ejemplo: 'Nuevo' o 'Usado'
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL, -- Relación con users
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE destacados (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  imagen TEXT,
  descripcion TEXT,
  categoria VARCHAR(50),
  precio NUMERIC(10, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(20) DEFAULT 'Nuevo' 
);

CREATE TABLE ofertas (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  imagen TEXT,
  descripcion TEXT,
  categoria VARCHAR(50),
  precio NUMERIC(10, 2) NOT NULL,
  precio_anterior NUMERIC(10, 2),
  stock INTEGER NOT NULL DEFAULT 0,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(20) DEFAULT 'Nuevo' 
);

INSERT INTO destacados (nombre, imagen, descripcion, precio, stock) VALUES
('Guitarra Eléctrica Jackson JS22', '/destacados/jacksonJS22.jpg', 'Cuerpo sólido, perfecta para metal.', 350, 10),
('Micrófono Shure SM58', '/destacados/shureSM58.jpg', 'Estándar de la industria para voces.', 120, 15),
('Amplificador Marshall MG30', '/destacados/marshallMG30.jpg', 'Sonido potente para práctica y pequeños conciertos.', 280, 8),
('Batería Acústica Pearl Export', '/destacados/bateriaPearl.jpg', 'Set completo con excelente resonancia para escenarios.', 950, 5),
('Controlador MIDI Akai MPK Mini', '/destacados/controladorAKAI.jpg', 'Ideal para producción musical y beats.', 145, 20),
('Auriculares Audio-Technica ATH-M50X', '/destacados/auricularesAudioTechnica.jpg', 'Sonido plano y preciso, ideal para mezcla y monitoreo.', 170, 12);

INSERT INTO ofertas (nombre, imagen, descripcion, precio, precio_anterior, stock) VALUES
('Guitarra Eléctrica Fender Stratocaster', '/ofertas/fenderStratocaster.jpg', 'Clásica, versátil y con sonido icónico.', 1200, 1500, 5),
('Teclado Yamaha P-125', '/ofertas/yamahaP125.jpg', 'Piano digital con acción de martillo graduada.', 600, 750, 7),
('Bajo Eléctrico Ibanez SR300', '/ofertas/ibanezSR300.png', 'Sonido profundo y cómodo de tocar.', 450, 700, 6),
('Pedal de Efectos Boss DS-1', '/ofertas/bossDS1.jpg', 'Distorsión clásica, ideal para rock y metal.', 80, 95, 20),
('Caja de Ritmos Roland TR-8S', '/ofertas/rolandTR8S.jpg', 'Caja de ritmos versátil con sonidos clásicos.', 500, 600, 0),
('Monitores de Estudio KRK Rokit 5', '/ofertas/krkRokit5.jpg', 'Sonido preciso y potente para producción musical.', 300, 450, 10);
