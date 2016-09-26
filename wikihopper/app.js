var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var models = require('./models')
var wikiRouter = require('./routes/wiki');
var bodyParser = require('body-parser')


var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/wiki', wikiRouter);
app.use(morgan());
app.use(express.static('public'));

nunjucks.configure('views');
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


models.User.sync({})
  .then(function() {
    return models.Page.sync({ force: true });
  })
  .then(function() {
    app.listen(3001, function() {
      console.log('Server is listening on port 3001!');
    });
  })
  .catch(console.error);