// console.log('serverside admin controller');
var mongoose = require('mongoose');
var AdminUser = mongoose.model('AdminUser');

module.exports = {
  // Making Admin and Manager accounts
    createAdminUser: function(){
    AdminUser.findOne({email:"admin@smiota.com"}, function (err, user) {
      if (err) {
        console.log(err);
        response.json(err)
      }
      if (!user) {
        console.log("Admin Not Found! Creating one at email: admin@smiota.com pass: asdf");
        var newAdmin = new AdminUser({
          username: 'Smiota Admin',
          email: 'admin@smiota.com',
          password: 'asdf',
        });
        newAdmin.save(function (err, user) {
          if (err) {
            console.log("Email already Registered");
            // error_messages.push("Email Already Registered! Please Login.");
            res.json({success: false, error_messages: error_messages});
            console.log(err);
            throw err;
          }
        });
      } else {
        console.log("Admin Available @ email: admin@smiota.com pass: asdf");
      }
    });

    AdminUser.findOne({email:"manager@smiota.com"}, function (err, user) {
      if (err) {
        console.log(err);
        response.json(err)
      }
      if (!user) {
        console.log("Manager Not Found! Creating one at email: manager@smiota.com pass: asdf");
        var newManager = new AdminUser({
          username: 'Smiota Manager',
          email: 'manager@smiota.com',
          password: 'asdf',
        });
        newManager.save(function (err, user) {
          if (err) {
            console.log("Email already Registered");
            // error_messages.push("Email Already Registered! Please Login.");
            res.json({success: false, error_messages: error_messages});
            console.log(err);
            throw err;
          }
        });
      } else {
        console.log("Manager Available @ email: manager@smiota.com pass: asdf");
      }
    });
  },

  // End of creating Admin and Manager


}
