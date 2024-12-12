const mongoose = require('mongoose');



const type_schema = new mongoose.Schema({
    tag : { type : String}
});



const type_model = mongoose.model('Type', type_schema)

module.exports = type_model;
