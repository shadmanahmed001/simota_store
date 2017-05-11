// console.log('order schema started');
var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ProductSchema = require('./product')
// console.log(ProductSchema);
var OrderSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  products: [{
    item: ProductSchema,
    quantityBought: {type: Number, required: true, min: 1}
  }],
  dateOfOrder: {type: Date, default: new Date()}
});

module.exports - mongoose.model('Orders', OrderSchema)
