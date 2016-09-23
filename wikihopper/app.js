var app = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var models = require('./models')

app.use(bodyParser.urlencoded({extended: true})); //for HTML form submits
app.use(bodyParser.json); // for AJAX requests (doesn't matter for this project, but good to include)


// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.get('/', function (res, req, next) {
  res.render('index.html');
});

models.User.sync({})
  .then(function() {
    return models.Page.sync({});
  })
  .then(function() {
    server.listen(3001, function() {
      console.log('Server is listening on port 3001!');
    });
  })
  .catch(console.error);