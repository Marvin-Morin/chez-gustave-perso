// Importation du module express
const express = require('express');
// Création du router
const router = express.Router();
// Importation du controller pour créer un équipement
const equipment_controller = require('../controllers/equipement_controller');



// Route pour créer un équipement
router.post('/', equipment_controller.create_equipment);

// Route pour récupérer tous les équipements
router.get('/', equipment_controller.get_all_equipments);

// Route pour mettre à jour un équipement par son ID
router.put('/:id', equipment_controller.update_equipment);

// Route pour supprimer un équipement par son ID
router.delete('/:id', equipment_controller.delete_equipment);

// Route pour récupérer les détails d'un équipement par son ID
router.get('/:id', equipment_controller.get_equipment_details);





// Exportation du router
module.exports = router;
