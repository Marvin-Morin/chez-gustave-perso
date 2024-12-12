// main.js

//  Point d'entrée de l'application



// Charger le module des variables d'environnement & exportation des variables d'environnements
require('dotenv').config();
// Importation de la configuration de l'application
const app = require("./app.js");




// Mise en écoute du server

const PORT = process.env.SERVER_PORT;

// Configuration du port d'écoute 
app.listen(PORT, () => {
    console.log('Serveur en écoute sur le port : ', PORT);
});