console.log("Serverside user model");
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({

  email: { type: String},
  // admin: { type: Number, },
  first_name: { type: String },
  last_name: { type: String },
  picture_link: {type: String},
  auth_id: {type: Number},
  items_bought: [{
    type: String
}],

}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);
