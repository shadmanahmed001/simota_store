var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  description: String,
  image: String,
  price: { type: Number, default: 0 },
  others_price: Number,
  expiry: Date,
  quantity: { type: Number, default: 0 },
  category: String

}, {timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);
