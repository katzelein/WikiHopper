'use strict'; 

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');
var session = require('express-session');

app.use(require('./logging.middleware'));
app.use(require('./request-state.middleware'));
app.use(require('./statics.middleware'));

app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'tongiscool' // or whatever you like
}));

app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

app.use('/api', require('../api/api.router'));

app.post('/login', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  console.log("HIII session in /login", req.session);
  return User.findOne({
    where: {
      email: email, 
      password: password
    }
  })
  .then((user) => {
    if(!user) return res.sendStatus(401);
    console.log("REQ.SESSION", req.session);
    req.session.userId = user.id;
    res.status(200).json({user});

  })
  .catch(next);
})

app.post('/signup', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  console.log("THIS IS OUR REQ.SESSION", req.session);
  return User.findOne({
    where: {
      email: email, 
      password: password
    }
  })
  .then((user) => {
    // console.log(user)
    if(user) {
      console.log("USER ALREADY EXISTS");
      return res.sendStatus(401);
    }
    else {
      req.session.userId = user.id;
      res.status(200).json(user);  
    }
  })
  .catch(next);
})


var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
