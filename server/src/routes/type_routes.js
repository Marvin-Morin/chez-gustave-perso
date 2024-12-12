const express = require('express');
const router = express.Router();
const type_controller = require('../controllers/type_controller');

// Route pour l'ajout d'un nouveau type
router.post('/', type_controller.ajouter_type);


// Route pour récupérer tous les types
router.get('/', type_controller.get_all_types);

// Récupérer un type pas son id 
router.get('/:id', type_controller.get_type_id)


module.exports = router;