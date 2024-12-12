const jwt = require('jsonwebtoken');



exports.auth_middleware = (req, res, next) => {
  // Vérifier si le cookie contient le token
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé - Token manquant' });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Ajouter les informations de l'utilisateur à la requête
    req.user = decoded.user;

    next();
    
  } catch (error) {
    return res.status(401).json({ message: 'Accès non autorisé - Token invalide' });
  }
};
