// app.js



// Importation de la configuration de la connexionà l'application
const {mongoose, objet_connexion} = require("./config/db_info.js");
// Importation du framework express 
const express = require('express');
// Importation de la bibliothèque JWT
const jwt = require('jsonwebtoken');
// Importation des middlewares de l'application
const { session_middleware, cookie_parser_middleware, body_parser_middleware } = require('./middlewares/app_middlewares');
// Importation du module cors
const cors = require('cors');
require('dotenv').config()


// Création d'une nouvelle instance de l'application Express
const app = express();


// Utilisation du middleware CORS
app.use(cors({
    origin: 'http://127.0.0.1:5501', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
    credentials: true, // Autoriser l'envoi de cookies via des requêtes CORS
}));




// Utilisation des middlewares
app.use(body_parser_middleware);
app.use(cookie_parser_middleware);
app.use(session_middleware);





// Utilisation des routes
const routes = require('./routes');
app.use('/', routes);





// Décoder le token dans le cookie à l'aide de JWT
app.use((req, res, next) => {
    const token = req.cookies.token;
    console.log('token : ' + token);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            logger.error('Erreur de vérification JWT token :', error);
            res.clearCookie('token');
        }
    }
    next();
});










// Exportation de l'application
module.exports = app;