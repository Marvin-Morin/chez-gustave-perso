const jwt = require('jsonwebtoken');
const Reservation = require('../models/reservation_model');
const Logement = require('../models/logement_model');
const User = require('../models/user_model');
require('dotenv').config()


exports.create_reservation = async (req, res) => {
    try {
        const {token} = req.cookies;
        console.log("reservation token: ", token);
        if (!token) {
            return res.status(401).json({ message: "Token manquant." });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        if (!decodedToken) {
            return res.status(401).json({ message: "Token invalide." });
        }

        const user_id = decodedToken.user._id;

        if (!user_id) {
            return res.status(401).json({ message: "Identifiant de l'utilisateur manquant." });
        }

        const user = await User.findById(user_id);



        const { start_date, end_date, chef_cuisine, visite, logement } = req.body;

        const logement_id = await Logement.findById(logement);


        if (!logement_id) {
            return res.status(404).json({ message: "Logement not found" });
        }

        // Calcul de la date d'entré est supérieur à 7 jours et inférieur à 30 jours
        const diffInDays = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24));
        if (diffInDays < 7) {
            return res.status(400).json({ message: "La période de réservation doit être d'au moins 7 jours." });
        }
        if (diffInDays > 30) {
            return res.status(400).json({ message: "La période de réservation ne peut pas dépasser 30 jours." });
        }

        // Stocker la nouvelle réservation dans la base de données
        const reservation = new Reservation({
            start_date,
            end_date,
            chef_cuisine,
            visite,
            logement: logement_id,
            user: user
        });

        console.log("reservation : ", reservation._id);

        // Ajouter la réservation à la liste des réservations de l'utilisateur
        user.reservations.push(reservation);

        // Sauvegarder l'utilisateur avec la nouvelle réservation
        await user.save();

        // Push la reservation dans logement
        logement_id.reservations.push(reservation._id);

        await logement_id.save();

        // Sauvegarder la réservation dans le modèle de réservation
        const saved_reservation = await reservation.save();

        await saved_reservation.populate("logement");

        // Envoyer le token d'authentification dans l'en-tête Authorization
        res.set('Authorization', `Bearer ${token}`);

        res.sendStatus(201);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
}





// Controller pour obtenir toutes les réservations
exports.get_all_reservations = async (req, res) => {
    try {
        // Récupérer toutes les réservations dans la base de données
        const reservations = await Reservation.find();

        // Renvoyer les réservations dans la réponse
        res.status(200).json(reservations);
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur avec un message
        console.error("Une erreur s'est produite lors de la récupération des réservations :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des réservations." });
    }
};





// Contrôleur pour récupérer les détails d'une réservation
exports.get_reservation_details = async (req, res) => {
    try {
        // Récupérer l'ID de la réservation depuis les paramètres de l'URL
        const reservation_id = req.params.id;

        // Recherche de la réservation dans la base de données par son ID
        const reservation = await Reservation.findById(reservation_id);

        // Vérifier si la réservation existe
        if (!reservation) {
            return res.status(404).json({ message: "Réservation non trouvée." });
        }
        b
        // Renvoyer les détails de la réservation dans la réponse
        res.status(200).json(reservation);
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur avec un message
        console.error("Erreur lors de la récupération des détails de la réservation :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des détails de la réservation." });
    }
};





// Contrôleur pour mettre à jour les détails d'une réservation par son id
exports.update_reservation_details = async (req, res) => {
    try {
        // Récupérer l'ID de la réservation depuis les paramètres de l'URL
        const reservation_id = req.params.id;

        // Récupérer les nouvelles données de la réservation depuis le corps de la requête
        const updated_data = req.body;

        // Mettre à jour les détails de la réservation dans la base de données
        const updated_reservation = await Reservation.findByIdAndUpdate(reservation_id, updated_data, { new: true });

        // Vérifier si la réservation a été trouvée et mise à jour
        if (!updated_reservation) {
            return res.status(404).json({ message: "Réservation non trouvée." });
        }

        // Renvoyer la réservation mise à jour dans la réponse
        res.status(200).json(updated_reservation);
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur avec un message
        console.error("Erreur lors de la mise à jour des détails de la réservation :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des détails de la réservation." });
    }
};





// Controller pour Supprimer une réservation par son id
exports.delete_reservation = async (req, res) => {
    try {
        // Récupération de l'ID de la réservation depuis les paramètres de l'URL
        const reservation_id = req.params.id;
        console.log("reservation_id : " + reservation_id);

        // Suppression de la réservation dans logement
        const update_logement = await Logement.findOneAndUpdate(
            { reservations: reservation_id },
            // Suppression de la reservation avec l'opérateur $pull
            { $pull: { reservations: reservation_id } },
            // Garantis le document mis à jour
            { new: true }
        )
        if (!update_logement) {
            return res.status(400).json({ message: "Erreur lors de la suppression de la réservation dans le logement" });
        }

        // Suppression de la réservation dans user
        const update_user = await User.findOneAndUpdate(
            { reservations: reservation_id },
            { $pull: { reservations: reservation_id } },
            { new: true }
        )
        if(!update_user) {
            return res.status(400).json({ message : "Impossible de supprimer la reservationd ans le model user." });
        }

        // Recherche de la réservation dans la base de données par son ID et suppression
        const deleted_reservation = await Reservation.findByIdAndDelete(reservation_id);

        // Vérification si la réservation a été trouvée et supprimée
        if (!deleted_reservation) {
            return res.status(404).json({ message: "Réservation non trouvée." });
        }

        // Renvoi d'une réponse de succès
        res.status(200).json({ message: "Réservation supprimée avec succès." });
    } catch (error) {
        // En cas d'erreur, renvoi d'un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la suppression de la réservation :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de la réservation." });
    }
};





// Controller pour Supprimer toutes les réservations
exports.delete_all_reservations = async (req, res) => {
    try {
        // Suppression de toutes les réservations dans la base de données
        await Reservation.deleteMany();

        // Renvoi d'une réponse de succès
        res.status(200).json({ message: "Toutes les réservations ont été supprimées avec succès." });
    } catch (error) {
        // En cas d'erreur, renvoi d'un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la suppression de toutes les réservations :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de toutes les réservations." });
    }
};





// Contrtoller pour Récupérer les notes d'une réservation par son id
exports.get_reservation_rating = async (req, res) => {
    try {
        // Récupération de l'ID de la réservation depuis les paramètres de l'URL
        const reservation_id = req.params.id;

        // Recherche de la réservation dans la base de données par son ID
        const reservation = await Reservation.findById(reservation_id);

        // Vérification si la réservation existe
        if (!reservation) {
            return res.status(404).json({ message: "Réservation non trouvée." });
        }

        // Vérification si la réservation a une note
        if (!reservation.rating) {
            return res.status(404).json({ message: "Cette réservation n'a pas encore de note." });
        }

        // Renvoi de la note de la réservation dans la réponse
        res.status(200).json({ rating: reservation.rating });
    } catch (error) {
        // En cas d'erreur, renvoi d'un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la récupération de la note de la réservation :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de la note de la réservation." });
    }
};