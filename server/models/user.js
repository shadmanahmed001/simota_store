var mongoose = require('mongoose');
var Order = require('./order');
var Cart = require('./cart')
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  email: { type: String},
  username: { type: String },
  picture_link: { type: String },
  referer_id: { type: String },
  gender: { type: String },
  age_range: { type: String },
  orders: [],
  cart: [{item:
    {type: Schema.Types.ObjectId, ref:'Product', required: true},
    quantity: {type: Number, min: 1}
    }]

})

module.exports = mongoose.model('User', UserSchema);
