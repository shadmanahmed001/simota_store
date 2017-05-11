var mongoose = require('mongoose');
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

module.exports = ProductSchema
// var Product = mongoose.model('Product', ProductSchema);
