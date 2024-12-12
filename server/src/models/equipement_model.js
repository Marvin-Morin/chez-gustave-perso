const mongoose = require('mongoose');



// Définition du schéma equipement
const equipment_schema = new mongoose.Schema({
  name: { type: String, required: true }
});

// Création du modèle à partir du schéma
const Equipment_model = mongoose.model('Equipment', equipment_schema);





module.exports = Equipment_model;