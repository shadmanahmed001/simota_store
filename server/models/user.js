console.log("Serverside user model");
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  email: { type: String},
  // admin: { type: Number, },
  username: { type: String },
  picture_link: { type: String },
  referer_id: { type: Number },
  gender: { type: String },
  age_range: { type: String },
  items_bought: [{
    type: String
}],

})

module.exports = mongoose.model('User', UserSchema);
