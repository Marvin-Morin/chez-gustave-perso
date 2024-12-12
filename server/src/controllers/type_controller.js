const Type = require('../models/type_model');



exports.ajouter_type = async (req, res) => {
    try {
        const { tag } = req.body;

        // Créer un nouveau type
        const nouveau_type = new Type({ tag });

        // Sauvegarder le nouveau type dans la base de données
        const type_enregistre = await nouveau_type.save();

        // Répondre avec le type enregistré
        res.status(201).json(type_enregistre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



exports.get_all_types = async (req, res) => {
    try {
        const types = await Type.find();

        // Répondre avec la liste des types
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Controller pour récupérer un type par son ID
exports.get_type_id  = async (req, res) => {
    try {
        // Récupération de l'ID du type depuis les paramètres de l'URL
        const type_id = req.params.id;

        // Vérification si l'ID du type est présent
        if (!type_id) {
            return res.status(400).json({ message: "L'ID du type n'a pas été transmis." });
        }

        // Recherche du type dans la base de données par son ID
        const type = await Type.findById(type_id);

        // Vérification si le type existe
        if (!type) {
            return res.status(404).json({ message: "Type non trouvé dans la base de données." });
        }

        // Renvoyer le type trouvé dans la réponse
        res.status(200).json(type);
    } catch (error) {
        console.error("Erreur lors de la récupération du type :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération du type." });
    }
};
