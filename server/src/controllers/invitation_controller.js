const Invitation = require('../models/invitation_model');
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const transporter = require('../config/nodeMailer');
const generate_randomPassword = require('../config/random_password');
// Contorller d'ajout d'un utilisateur
const bcrypt = require('bcrypt');



// Controller pour envoyer une invitation grâçe à la demande d'un utilisateur
// Controller for send invit grace at the request of user
exports.create_invitation = async (req, res) => {
  try {

    const { token } = req.cookies;
    console.log("token controller invti :", token);

    if (!token) {
      console.log("Désolé, token invalide.");
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodedToken) {
      return res.status(401).json({ message: "Token invalide." });
    }

    const user_id = decodedToken.user._id;

    if (!user_id) {
      return res.status(401).json({ message: "Identifiant de l'utilisateur manquant." });
    }

    const user = await User.findById(user_id)

    const { email, message } = req.body;

    // Générer un mot de passe aléatoire de longueur 10 grâce à une fonction qui génère aléatoirement un mot de passe nommé "generate_randomPassword"
    // Generate a password random of lenght 10 grace at an function who send a random password appointed "generate_randomPassword"
    const password = generate_randomPassword(10);

    // Hasher le mot de passe
    // Hashing the password
    const hashed_password = await bcrypt.hash(password, 10);

    const new_invitation = new Invitation({
      sponsor: user,
      email,
      message
    });

    // Sauvegarde de l'invitation dans la base de données
    // Save of invite in the dataBase
    await new_invitation.save();

    // Envoi de l'e-mail d'invitation avec le mot de passe non hashé
    // Send of invitation email with the password no hashed 
    await transporter.sendMail({
      from: 'marvinmorin@gmail.com',
      to: email,
      subject: 'Invitation à rejoindre notre plateforme',
      html: `
<p>Cher(e) utilisateur,</p>
<p>Vous avez été invité(e) à rejoindre notre plateforme. Voici vos informations de connexion :</p>
<p>E-mail: ${email}</p>
<p>Mot de passe provisoire: ${password}</p>
<p>${message}</p>
<p>Bienvenue !</p>`
    });

   // Création d'un nouvel utilisateur avec l'email et le password hashé généré automatiquement aléatoirement 
   // Creation of new user with email and the hashed password generated automatically randomly 
    const invited_user = new User({
      email,
      name: '',
      tel: '',
      password: hashed_password, // Utilisation du mot de passe hashé // Using of hashed Password
      is_admin: false
    });

     // Enregistrer l'e-mail de l'utilisateur invité avec le mot de passe hashé
    // Save the email of user invited with the hashed passord
    await invited_user.save();

    res.status(201).json({ message: 'Invitation created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





exports.get_invitations = async (req, res) => {
  try {
    const invitations = await Invitation.find({ sponsor: req.user._id }); // Get invitations for the logged-in user
    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};





// Controller pour Supprimer toutes les invitations
exports.delete_all_invitations = async (req, res) => {
  try {
    // Supprimer toutes les invitations
    await Invitation.deleteMany({});
    res.status(200).json({ message: 'Toutes les invitations ont été supprimées avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression des invitations' });
  }
};