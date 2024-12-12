// Importation du model user
const User = require('../models/user_model');
// Controller pour récupérer les réservations d'un user
const Reservation = require('../models/reservation_model');
// Logement
const Logement = require('../models/logement_model');
// Contorller d'ajout d'un utilisateur
const bcrypt = require('bcrypt');
// const { findByIdAndDelete } = require('../models/logement_model');



// Controller pour l'inscritpion d'un utilisateur
// Controller for user inscription
exports.create_user = async (req, res) => {
    try {
        // Récupération des informations de l'utilisateur via la requête
        const { email, name, tel, password, is_admin } = req.body;

        // Hash du mot de passe
        // Hash of password
        const hashed_password = await bcrypt.hash(password, 10);

        // Création d'un nouvel utilisateur avec le mot de passe hashé
        // Creation new user with the hashed password
        const new_user = new User({
            email,
            name,
            tel,
            password: hashed_password, // Utilisation du mot de passe hashé // Using hashed password
            is_admin
        });

        // Sauvegarde de l'utilisateur
        // Save user
        await new_user.save();

        const user_saved_for_token = {
            email,
            name,
            tel,
            is_admin
        }

        // Réponse positive de l'utilisateur sauvegardé
        // Response of save user 
        res.status(201).json(user_saved_for_token);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};





// Controller pour obtenir tous les utilisateurs
exports.get_all_users = async (req, res) => {
    try {
        // Récupérer tous les utilisateurs depuis la base de données
        const users = await User.find();
        // Renvoyer la liste des utilisateurs dans la réponse
        res.status(200).json(users);
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur avec un message
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des utilisateurs." });
    }
};





// Controller de recherche d'informations d'un utilisateur via son id
exports.get_user_by_id = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
        const user_id = req.params.id;

        // Rechercher l'utilisateur dans la base de données par son ID
        const user = await User.findById(user_id);

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Si l'utilisateur existe, le renvoyer dans la réponse
        res.status(200).json(user);
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'utilisateur :`, error);
        res.status(500).json({ message: `Erreur lors de la récupération de l'utilisateur` });
    }
};





// Controller pour Mettre à jour un utilisateur via son id 
exports.update_user = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à mettre à jour depuis les paramètres de l'URL
        const user_id = req.params.id;
        // Récupérer les données de l'utilisateur à mettre à jour depuis le corps de la requête
        let user_data = req.body;

        // Vérifier si un nouveau mot de passe est fourni
        if (user_data.password) {
            // Hasher le nouveau mot de passe
            user_data.password = await bcrypt.hash(user_data.password, 10);
        }

        // Mettre à jour l'utilisateur dans la base de données
        const updated_user = await User.findByIdAndUpdate(user_id, user_data, { new: true });

        // Vérifier si l'utilisateur a été trouvé et mis à jour
        if (!updated_user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Renvoyer la réponse avec l'utilisateur mis à jour
        res.sendStatus(201);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la mise à jour des utilisateurs :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des utilisateurs." });
    }
};





// Controller pour supprimer un utilisateur via son id
exports.delete_user = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à supprimer depuis les paramètres de l'URL
        const user_id = req.params.id;

        // Supprimer toutes les réservations associées à cet utilisateur
        await Reservation.deleteMany({ user: user_id });

        // Supprimer l'utilisateur de la base de données
        const deleted_user = await User.findByIdAndDelete(user_id);

        // Vérifier si l'utilisateur a été trouvé et supprimé
        if (!deleted_user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Renvoyer une réponse réussie
        res.sendStatus(201);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression de l'utilisateur :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'utilisateur." });
    }
};





// Contorller pour récupérer les réservations d'un utilisateur par son id
exports.get_user_reservations = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL
        const user_id = req.params.id;

        // Rechercher les réservations de l'utilisateur dans la base de données
        const user_reservations = await Reservation.find({ user_id: user_id });

        // Renvoyer les réservations de l'utilisateur dans la réponse
        res.status(200).json(user_reservations);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des réservations de l'utilisateur :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des réservations de l'utilisateur." });
    }
};





// Controller pour récupérer les réservations d'un utilisateur spécifique par son id
exports.get_user_reservations = async (req, res) => {
    try {
        // Récupération de l'ID de l'utilisateur depuis les paramètres de l'URL
        const user_id = req.params.id;

        // Recherche des réservations de l'utilisateur dans la base de données
        const user = await User.findById(user_id);

        // Récupération des réservations de l'utilisateur à partir des IDs
        const user_reservations = await Reservation.find({ _id: { $in: user.reservations } });

        // Vérification si des réservations ont été trouvées
        if (!user_reservations || user_reservations.length === 0) {
            return res.status(404).json({ message: "Aucune réservation trouvée pour cet utilisateur." });
        }        

        // Renvoi des réservations dans la réponse
        res.status(200).json(user_reservations);
    } catch (error) {
        // En cas d'erreur, renvoi d'un code d'erreur avec un message
        console.error("Erreur lors de la récupération des réservations de l'utilisateur :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des réservations de l'utilisateur." });
    }
};


exports.delete_reservations_user = async (req, res) => {

    try {

        const id_user = req.params.id;
        console.log("id user : ", id_user);

        if (!id_user) {
            res.status(404).json({ message: "Id de l'utilisateur non renseigné" })
        }

        const user = await User.findById(id_user);

        if (!user) {
            res.status(404).json({ message: "Id de l'utilisateur non trouvé" })
        }

        // Récupération de toutes les réservations de l'utilisateur
        const reservation_user = await user.reservations;;
        console.log("reservation_user : ", reservation_user);

        // Suppression des réservations dans la table logement
        await Promise.all(reservation_user.map(reservation_id_logement => Logement.findByIdAndDelete(reservation_id_logement)));

        // Suppression des réservations de l'utilisateur dans la table réservation
        await Promise.all(reservation_user.map(reservation_id => Reservation.findByIdAndDelete(reservation_id)));

        user.reservations = [];
        await user.save();

        // Suppression de toutes les réservations de l'utilisateur
        const suppression_reservation_user = await User.findByIdAndDelete(user.reservations);

        if (!suppression_reservation_user) {
            res.status(404).json({ message: `Aucune réservation trouvé pour l'utilisateur ${user.name}` })
        }

        return res.status(200).json({ message: "Réservation(s) supprimés avec succès" })
    } catch (error) {
        console.error("Erreur lors de la supréssion de réservations :", error)
        return res.status(500).json({ message: "Erreur lors de la suppression des réservations" })
    }
};