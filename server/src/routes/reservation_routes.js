// routes/reservation_route.js

const express = require('express');
const router = express.Router();
// Importation du contorller de reservation
const reservation_controller = require('../controllers/reservation_controller');



// Route pour créer une nouvelle réservation
router.post('/', reservation_controller.create_reservation);

// Route pour obtenir toutes les réservations
router.get('/', reservation_controller.get_all_reservations)

// Route pour récupérer les détails d'une réservation par son id
router.get('/:id', reservation_controller.get_reservation_details)

// route pour mettre à jour les détails d'une réservation par son id
router.put('/:id', reservation_controller.update_reservation_details);

// Route pour supprimer une réservation par son ID
router.delete('/:id', reservation_controller.delete_reservation);

// Route pour supprimer toutes les réservations
router.delete('/', reservation_controller.delete_all_reservations);

// Route pour récupérer les notes d'une réservation par son ID
router.get('/:id/ratings', reservation_controller.get_reservation_rating);



module.exports = router;