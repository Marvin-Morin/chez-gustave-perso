const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');



// Route pour créer un nouvel utilisateur
router.post('/', user_controller.create_user);

// Route pour récupérer tous les utilisateurs
router.get('/', user_controller.get_all_users);

// Route rechercher les informations d'un utilisateur via son id
router.get('/:id', user_controller.get_user_by_id)

// Route pour mettre à jour un utilisateur par son ID
router.put('/:id', user_controller.update_user);

// Route pour supprimer un utilisateur par son ID
router.delete('/:id', user_controller.delete_user);

// Route pour récupérer les réservations d'un utilisateur
router.get('/:id/reservation', user_controller.get_user_reservations);

// Route pour supprimer toutes les réservations d'un utilisateur
router.delete('/:id/reservation', user_controller.delete_reservations_user)





module.exports = router;