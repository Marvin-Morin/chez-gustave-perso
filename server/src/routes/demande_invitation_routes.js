const express = require('express');
const router = express.Router();
const demande_invitation_controller = require('../controllers/demande_invitation_controller');



// Route pour envoyer la demande d'invitation à l'administrateur
router.post('/', demande_invitation_controller.send_invitation_request);





module.exports = router;