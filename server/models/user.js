// console.log("Serverside user model");
var mongoose = require('mongoose');
var OrderSchema = require('./order')
var UserSchema = new mongoose.Schema({
  email: { type: String},
  username: { type: String },
  picture_link: { type: String },
  referer_id: { type: Number },
  gender: { type: String },
  age_range: { type: String },
  _orders: [{
    OrderSchema
}],

})

module.exports = mongoose.model('User', UserSchema);
