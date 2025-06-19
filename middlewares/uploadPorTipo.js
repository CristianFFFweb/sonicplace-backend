
const multer = require('multer');
const path = require('path');

const storageFactory = (tipo) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      let folder = tipo === 'ofertas' ? 'ofertas' : 'destacados';
      cb(null, path.join(__dirname, `../public/${folder}`));
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    }
  });
};

const uploadPorTipo = (req, res, next) => {
  const tipo = req.params.tipo; 
  console.log(`Tipo de publicación recibido: ${tipo}`);
  

  if (!tipo || !['ofertas', 'destacados'].includes(tipo)) {
    return res.status(400).json({ error: 'Tipo de publicación inválido o faltante (ofertas/destacados).' });
  }

  const upload = multer({ storage: storageFactory(tipo) }).single('imagen');
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error al subir la imagen', detalle: err.message });
    }
    next();
  });
};

module.exports = uploadPorTipo;
