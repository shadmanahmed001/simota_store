// console.log("Serverside adminuser model");
var mongoose = require('mongoose');
var AdminUserSchema = new mongoose.Schema({
  email: { type: String},
  username: { type: String },
  password: { type: String },

})

module.exports = mongoose.model('AdminUser', AdminUserSchema);
