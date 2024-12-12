const express = require('express');
const router = express.Router();
const invitation_controller = require('../controllers/invitation_controller');
// const auth_middleware = require('../middlewares/authentification_users_middleware');



// Route pour ajouter une invitation
router.post('/', invitation_controller.create_invitation);

// Route pour obtenir les invitations
router.get('/', invitation_controller.get_invitations);

// Route pour supprimer toutes les invitations
router.delete('/', invitation_controller.delete_all_invitations)





module.exports = router;