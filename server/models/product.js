var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  others_price: Number,

})
var Product = mongoose.model('Product', ProductSchema);
