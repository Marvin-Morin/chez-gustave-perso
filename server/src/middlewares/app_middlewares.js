// middlewares/app_middlewares.js



// Middlewares de l'application



// Importation du middleware express-session
const express_session = require('express-session');
// Importation du middleware cookie-parser 
const CookieParser = require('cookie-parser');
require('dotenv').config();




// Configuration du middleware express-session dans l'application Express
// Middleware pour la session
const session_middleware = express_session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: 'None',
    },
  });


// Configuration du middleware cookie-parser
// Middleware pour le cookie
const cookie_parser_middleware = CookieParser();



// Middleware pour parser le corps des requêtes
// Importation du module body-parser
const body_parser = require('body-parser');
const body_parser_middleware = body_parser.json();





module.exports = {
    session_middleware,
    cookie_parser_middleware,
    body_parser_middleware,
};