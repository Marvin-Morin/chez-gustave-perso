// Importation du modèle d'équipement
const Equipment = require('../models/equipement_model');



// Controller pour ajouter un équipement
exports.create_equipment = async (req, res) => {
    try {
        // Récupération du nom de l'équipement depuis le corps de la requête
        const { name } = req.body;

        // Vérification si le nom de l'équipement est fourni
        if (!name) {
            return res.status(400).json({ message: "Le nom de l'équipement est requis." });
        }

        // Création d'une nouvelle instance d'équipement avec le nom fourni
        const new_equipment = new Equipment({
            name
        });

        // Sauvegarde de l'équipement dans la base de données
        const saved_equipment = await new_equipment.save();

        // Réponse avec l'équipement créé
        res.status(201).json(saved_equipment);
    } catch (error) {
        // En cas d'erreur, renvoi d'un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la création de l'équipement :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la création de l'équipement." });
    }
};





// Controller pour récupérer tous les équipements
exports.get_all_equipments = async (req, res) => {
    try {
        // Récupération de tous les équipements depuis la base de données
        const equipments = await Equipment.find();

        // Renvoi des équipements dans la réponse
        res.status(200).json(equipments);
    } catch (error) {
        // En cas d'erreur, renvoi d'un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la récupération des équipements :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des équipements." });
    }
};





// Controller pour mettre à jour un équipement par son id
exports.update_equipment = async (req, res) => {
    try {
        // Récupération de l'ID de l'équipement depuis les paramètres de l'URL
        const equipment_id = req.params.id;

        // Recherche de l'équipement dans la base de données par son ID
        let equipment = await Equipment.findById(equipment_id);

        // Vérification si l'équipement existe
        if (!equipment) {
            return res.status(404).json({ message: 'Équipement non trouvé' });
        }

        // Récupération des données mises à jour de l'équipement depuis le corps de la requête
        const { name } = req.body;

        // Mise à jour des données de l'équipement
        equipment.name = name;

        // Sauvegarde de l'équipement mis à jour dans la base de données
        const updated_equipment = await equipment.save();

        // Renvoi de l'équipement mis à jour dans la réponse
        res.status(200).json(updated_equipment);
    } catch (error) {
        // En cas d'erreur, renvoi d'un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la mise à jour de l'équipement :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de l'équipement." });
    }
};





// Controller pour supprimer un équipement par son id
exports.delete_equipment = async (req, res) => {
    try {
        // Récupération de l'ID de l'équipement depuis les paramètres de l'URL
        const equipment_id = req.params.id;

        // Recherche de l'équipement dans la base de données par son ID et suppression
        const deleted_equipment = await Equipment.findByIdAndDelete(equipment_id);

        // Vérification si l'équipement a été trouvé et supprimé
        if (!deleted_equipment) {
            return res.status(404).json({ message: "Équipement non trouvé." });
        }

        // Renvoyer une réponse de succès
        res.status(200).json({ message: "Équipement supprimé avec succès." });
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur avec un message
        console.error("Erreur lors de la suppression de l'équipement :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'équipement." });
    }
};





// Controller pour Récupérer les détails d'un équipement
exports.get_equipment_details = async (req, res) => {
    try {
        // Récupération de l'ID de l'équipement depuis les paramètres de l'URL
        const equipment_id = req.params.id;

        // Recherche de l'équipement dans la base de données par son ID
        const equipment = await Equipment.findById(equipment_id);

        // Vérification si l'équipement existe
        if (!equipment) {
            return res.status(404).json({ message: "Équipement non trouvé." });
        }

        // Renvoyer les détails de l'équipement dans la réponse
        res.status(200).json(equipment);
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur avec un message
        console.error("Erreur lors de la récupération des détails de l'équipement :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des détails de l'équipement." });
    }
};