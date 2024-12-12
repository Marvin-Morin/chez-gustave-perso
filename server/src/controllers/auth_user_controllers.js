
// Importation du model user
const User = require('../models/user_model');
// Importation de jwt pour vérifier les cookies d el'utilisateur
const jwt = require('jsonwebtoken');
// Contorller d'ajout d'un utilisateur
const bcrypt = require('bcrypt');
require('dotenv').config()


// Controller d'authentification de l'ustilisateur
exports.login_user = async (req, res) => {
    try {
        // Vérifiez si l'utilisateur existe dans la base de données
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: 'Adresse e-mail incorrecte' });
        }

        // Vérifiez si le mot de passe est correct
        const password_match = await bcrypt.compare(req.body.password, user.password);
        if (!password_match) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Exclure le champ password de l'utilisateur dans le retour de la requête
        user.password = undefined;

        // Générez le token JWT en incluant les informations de l'utilisateur
        const token = jwt.sign({ user: user }, process.env.SECRET_KEY);
        // console.log("Generated token: ", token);

        // Définir le cookie dans la réponse avec le token
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // Assurez-vous que 'secure' est true en production
            sameSite: 'none', // Ajustez selon les besoins, 'Strict', 'Lax' ou 'None'
            domain: '127.0.0.1',
        });

        // Envoyer une réponse JSON indiquant que l'authentification a réussi
        res.status(200).json({
            token: token,
            user: user,
        });


    } catch (error) {
        console.error(`Erreur lors de l'authentification :`, error);
        res.status(500).json({ message: `Erreur lors de l'authentification` });
    }
};





// Contrôleur pour la déconnexion de l'utilisateur
exports.logout_user = async (req, res) => {
    try {
        // Récupérer le token JWT à partir des cookies
        const token = req.cookies.token;

        // Vérification si le token existe
        if (!token) {
            return res.status(401).json({
                message: `Aucun token trouvé. L'utilisateur n'est probablement pas connecté.`,
            });
        }

        // Supprimer le cookie en le remplaçant par un cookie vide et en définissant sa durée de vie à 0
        res.clearCookie('token', {
            httpOnly: true,
            secure: true, // Assurez-vous que 'secure' est true en production
            sameSite: 'none', // Ajustez selon les besoins, 'Strict', 'Lax' ou 'None'
            domain: 'localhost',
        });

        // Répondre avec un message de déconnexion réussie
        res.status(200).json({ message: 'Déconnexion réussie.' });
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};





// Contrôleur pour obtenir les informations de l'utilisateur connecté
exports.get_logged_in_user = async (req, res) => {
    console.log('Cookies:', req.cookies);
    const token = req.cookies.token;
    console.log('Token from cookies:', token);

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        res.status(200).json({ user: decoded.user, token: token });
    } catch (error) {
        console.log('Token verification error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};
