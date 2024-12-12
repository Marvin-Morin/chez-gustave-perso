const nodemailer = require('nodemailer');
// Charger le module des variables d'environnement & exportation des variables d'environnements
require('dotenv').config();


// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_NODEMAILER,
    pass: process.env.PASS_NODEMAILER
  }
});





module.exports = transporter;