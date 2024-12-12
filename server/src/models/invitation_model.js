const mongoose = require('mongoose');



const invitation_schema = new mongoose.Schema({
  sponsor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  name: { type: String },
  tel: { type: String },
  message: { type: String },
  isUsed: { type: Boolean, default: false }
});

const Invitation = mongoose.model('Invitation', invitation_schema);





module.exports = Invitation;