// middleware/multerVoyage.js

// Importation du module multer pour la gestion des fichiers uploadés
const multer = require("multer");
// Importation du module path pour manipuler les chemins de fichiers
const path = require("path");



// Configuration du stockage des fichiers uploadés avec multer
const storage = multer.diskStorage({
  // Fonction pour définir le répertoire de destination des fichiers uploadés
  destination: function (req, file, cb) {
    // Callback avec le chemin du répertoire de destination
    cb(null, "src/uploads/logements");
  },
  // Fonction pour définir le nom du fichier uploadé
  filename: function (req, file, cb) {
    // Utilisation du nom original du fichier sans l'extension pour garantir l'unicité
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}${file.originalname}`);
  }
});

// Configuration de multer avec les options de stockage définies
const upload_logements = multer({ storage: storage });

module.exports = upload_logements;
