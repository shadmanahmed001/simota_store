// console.log('the cart schema has started');

var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var CartSchema = new Schema({
  products: [{
    item: {type: Schema.Types.ObjectId, ref: 'Product', required: true}
  , quantity : {type: Number, min: 1}
  }]
})

module.exports = mongoose.model('Cart', CartSchema);
