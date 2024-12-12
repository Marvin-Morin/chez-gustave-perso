const mongoose = require('mongoose');



// Fonction pour formater les dates au format français
function formatDate(date) {
    return date.toLocaleString('fr-FR');
}



// Définition du shema reservation
const reservation_schema = new mongoose.Schema({
    start_date: {
        type: Date,
        required: true,
        get: function (date) {
            return date.toLocaleDateString('fr-FR');
        }
    },
    end_date: {
        type: Date,
        required: true,
        get: function (date) {
            return date.toLocaleDateString('fr-FR');
        }
    },
    chef_cuisine: { type: Boolean, default: false },
    visite: { type: Date, get: formatDate },
    rating: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
    },
    logement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Logement'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});




const Reservation_model = mongoose.model('Reservation', reservation_schema);

module.exports = Reservation_model;
