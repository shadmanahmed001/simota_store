var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  // image: {
  //   data: Buffer, contentType: String
  // },
  image: String,
  price: Number,
  others_price: Number,

}, {timestamps: true});
var Product = mongoose.model('Product', ProductSchema);
