

function isAdmin(req, res, next) {
  const user = req.user; 

  if (!user || user.email !== 'sonicplaceAdmin@sonicplace.com') {
    return res.status(403).json({ error: 'Acceso restringido: solo para administradores' });
  }

  next();
}
module.exports = isAdmin;