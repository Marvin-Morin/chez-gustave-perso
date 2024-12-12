// routes/rating_route.js



// Importation du module express
const express = require('express');
// Création du router
const router = express.Router();
// Importer le contrôleur pour créer une note
const rating_controller = require('../controllers/rating_controller');



// Route pour Créer une note 
router.post('/', rating_controller.create_rating);

// Route pour récupérer toutes les notes
router.get('/', rating_controller.get_all_ratings);

// Route pour mettre à jour le detail d'une note avec son id
router.put('/:id', rating_controller.update_rating);

// Route pour supprimer une note par son ID
router.delete('/:id', rating_controller.delete_rating);

// Route pour récupérer les détails d'une note par son ID
router.get('/:id', rating_controller.get_rating_details);







// Exportation du router
module.exports = router;
