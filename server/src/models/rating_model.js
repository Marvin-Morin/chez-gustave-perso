const mongoose = require('mongoose');



// Définition du schéma notes rating / notes
const ratingSchema = new mongoose.Schema({
  rated: { type: Number, min: 0, max: 5, required: true },
  text: { type: String },
  logement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Logement'
  },
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Création du modèle à partir du schéma
const Rating = mongoose.model('Rating', ratingSchema);





module.exports = Rating;
