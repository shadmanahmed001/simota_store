// var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var User = require('../models/user');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var secret = 'shadman'
// var configAuth = require('./auth')

module.exports = function(app, passport) {

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false } }))

  passport.serializeUser(function(user, done) {
    token = jwt.sign({ username: user.username, email: user.email}, secret, {expiresIn: '24h'});
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
    done(err, user);
    });
  });


    passport.use(new FacebookStrategy({
      clientID: '833550933479237',
      clientSecret: '5fa5072baf46574bcf930bf0036e9bdd',
      callbackURL: 'https://35.161.87.187/auth/facebook/callback', // What Facebook gets after the auth is done
      profileFields: ['id', 'displayName', 'email', 'gender', 'age_range']
    },
    function(accessToken, refreshToken, profile, done) {    // Saving the user
      // console.log(profile);
      User.findOne({ email: profile._json.email}).select('username password email').exec(function(err, user){
        console.log("finding user");
        console.log(user);
        if (err) {
          console.log('this the the err in mongoose:' + err);
          return done(err);
        }
        if (!user){
          console.log("new user..adding to db with fb info");
          var newUser = new User({
            username: profile._json.name,
            referer_id: profile._json.id,
            gender: profile._json.gender,
            age_range: profile._json.age_range.min,
            email: profile._json.email,
          })
          console.log('This is the newUser:' + newUser);
          newUser.save(function(err, user) {
            if (user && user!= null){
              return done(null, user)
            } else {
              console.log(err);
              return done(err)
            }
          });
        } // this is the end of the creating of new user
      else {
        console.log('Send the user from the FB login' + user);
        return done(null, user)
      }

      });
    }
  ));

    // Facebook Login Routes
    app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
          failureRedirect: '/loginfailed' }), function(request, response){
            // console.log("this is response");
            // console.log(response);
            console.log('redirecting to /mainpage/TOKEN');
            return response.redirect('/mainpage/' + token); // What user is redirected to after auth is done
          });

    app.get('/auth/facebook',
      passport.authenticate('facebook', { scope: 'email' })
    );

  return passport;
}





















//   passport.serializeUser(function(user, done){
//     done(null, user.id);
//   });
//
//   passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//       done(err, user);
//     });
//   });
//
//   passport.use('local-signup', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true
//   },
//   function (req, email, password, done) {
//     process.nextTick(function() {
//       User.findOne({'local.email': email}, function(err, user) {
//         if(err)
//           return done(err);
//         if(user){
//           return done(null, false, req.flash('signupMessage', 'That email already taken'))
//         } else {
//           var newUser = new User();
//           newUser.local.email = email;
//           newUser.local.password = password;
//
//           newUser.save(function(err) {
//             if(err)
//               throw err;
//             return done(null, newUser);
//           })
//         }
//       })
//     })
//
//   }
// ));

// Facebook
// passport.use(new FacebookStrategy({
//     clientID: configAuth.facebookAuth.clientID,
//     clientSecret: configAuth.facebookAuth.clientSecret,
//     callbackURL: configAuth.facebookAuth.callbackURL
//   },
//   function(accessToken, refreshToken, profile, done) {
//       process.nextTick(function() {
//         User.findOne({'facebook.id': profile.id}, function(err, user){
//             if(err)
//               return done(err);
//             if(user)
//               return done(null, user);
//             else {
//               var newUser = new User()
//               newUser.facebook.id = profile.id;
//               newUser.facebook.token = accessToken;
//               newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
//               newUser.facebook.email = profile.emails[0].value;
//
//               newUser.save(function(err){
//                 if(err)
//                   throw err;
//                 return done(null, newUser)
//               })
//             }
//         });
//       });
//   }
// ));

// }
