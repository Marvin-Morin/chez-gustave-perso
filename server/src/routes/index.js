// Configurations de toutes les routes de l'application 



// Importation du framework express 
const express = require('express');
const router = express.Router();



// TEST
router.get("/", (req, res) => {
    res.json({test : "Test API"});
});

// Utilisation des routes pour les utilisateurs
// Using router for users 
const user_route = require('./user_route');
router.use('/user', user_route);

// Utilisation des routes pour l'authentification, la deconnexion et infos user connecté des utilisateurs
// Using router for authentificate, logout and infos user conected users
const auth_user_route = require('./auth_user_routes');
router.use('/auth', auth_user_route);

// Utilisation des routes pour les invitations par les admins
// Using routes for invited by admins
const invitation_route = require('./invitation_routes');
router.use('/invitation', invitation_route )

// Utilisation des routes pour les demandes d'invitation d'un utilisateur à un admin pour les parrainage
// Using routes for require invitations of user to an admin for they parrained
const demande_invitation_route = require('./demande_invitation_routes');
router.use('/demande-invitation', demande_invitation_route)

// Utilisation des routes pour les reservations
// Using routes for reservations
const reservation_route = require('./reservation_routes');
router.use('/reservation', reservation_route);

// Utilisation des routes pour les notes
// Using routes for ratings
const rating_route = require('./rating_routes');
router.use('/rating', rating_route);

// Utilisation des routes pour logement
// Using routes for housing
const logement_route = require('./logement_routes');
router.use('/logement', logement_route);

// Utilisation des routes pour les équipements des logements
// Using routes for housings equipements 
const equipement_route = require('./equipement_routes');
router.use('/equipement', equipement_route)

// Utilisation des routes pour les types de logements
// Using routes for housing types
const type_route = require('./type_routes');
router.use('/type', type_route);





module.exports = router;