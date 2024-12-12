const mongoose = require('mongoose');



// Définition du schéma logement
const logement_schema = new mongoose.Schema({
  images: [String],
  secteur: { type: String, required: true },
  description: { type: String, required: true },
  tarif_bas: { type: Number, required: true },
  tarif_moyen: { type: Number, required: true },
  tarif_haut: { type: Number, required: true },
  m_carre: { type: Number, required: true },
  chambre: { type: Number, required: true },
  salle_de_bain: { type: Number, required: true },
  categorie: { type: String },
  type: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type'
  }],
  equipements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment'
  }],
  adulte: { type: Number },
  enfant: { type: Number },
  animaux: { type: Number },
  reservations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation'
  }]
});

// Création du modèle à partir du schéma
const Logement_model = mongoose.model('Logement', logement_schema);





module.exports = Logement_model;