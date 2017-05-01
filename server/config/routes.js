var mongoose = require('mongoose');
var products = require('../controllers/product')
var path = require('path')

module.exports = function(app){
app.get('/products', function(request, response) {
  products.index(request, response);
});
app.get('/edit/:id', function(request, response) {
  products.show(request, response);
});

// this is where the stripe get method is going to go
// need to send it to json so angualr has the info


// then add the charge method using the code there


app.post('/products', function(request, response) {
  products.create(request, response);
});
app.put('/products/:id', function(request, response) {
  products.update(request, response);
});
app.delete('/products/:id', function(request, response) {
  products.delete(request, response);
});
}
