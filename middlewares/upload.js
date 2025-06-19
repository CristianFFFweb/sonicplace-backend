const multer = require('multer');
const path = require('path');

// Configuración de multer para manejar la carga de archivos
// Este middleware se utiliza para manejar la carga de archivos en las rutas que lo requieran
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;