// database_infos.js

// Importation du module mongoose
const mongoose = require("mongoose");
// Charger le module des variables d'environnement & exportation des variables d'environnements
require('dotenv').config();




// Variable qui permet de Stocker l'url de la base de données
const database_url = process.env.DATABASE_URL;



// Vérification

// Vérifie si l'url de la base de données est accessible
if(!database_url) {
    throw new Error("database_url n'est pas défini dans la variable d'environnement.");
}



// Etablie une connexion à mongodb en utilisant mongoose avec l'url de la base de données
mongoose.connect(database_url);



// Récupération de l'objet de connexion mongodb crée par mongoose
const objet_connexion = mongoose.connection;



// Gestionnaires lié à la connexion

// Gestionnaire d'évènement une fois la connexion établie avec succès
objet_connexion.once('open', () => {
    console.log('Connexion à la base de données réussie.');
});

// Gestionnaire d'erreur pour les problèmes de connexion à mongodb
objet_connexion.on('error', () => {
    console.log('Erreur lors de la connexion à la base de données.');
    process.exit(1);
});



// Exportation de l'objet de connexion à la base de données
module.exports = {mongoose, objet_connexion};