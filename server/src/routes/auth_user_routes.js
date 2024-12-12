// Importation du framework express 
const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/auth_user_controllers');

// Route pour se connecter à un utilisateur
router.post('/', auth_controller.login_user )

// Route pour la déconnexion de l'utilisateur
router.get('/logout', auth_controller.logout_user);

// Route pour obtenir les informations d'un utilisateurs connecté
router.get('/get-logged-in-user', auth_controller.get_logged_in_user)




module.exports = router;