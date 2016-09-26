var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models = require('../models');
var Page = models.Page; 
var User = models.User; 


router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


router.get('/', function (req, res, next) {
  var allPages = Page.findAll()
  .then(function(allPages) {
    res.render('index', { pages: allPages });
  })
  .catch(next);
});


// router.post('/', function (req, res, next) {
//   res.json(req.body.content);
// });

router.get('/add', function (req, res, next) {
  res.render('addpage');
});

router.post('/', function(req, res, next) {

  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: 'open'
  });

  var author = User.build({
    name: req.body.name,
    email: req.body.email
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.

  page.save().then(function (page) {
    res.redirect(page.urlTitle);
  });
});

router.get('/:urlTitle', function(req,res,next) {

  var page = Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  }).then(function() {
    var user = User.findOne({
      where: {
        id: page.authorId
      }
    });
  })
  .then(function(page){
    res.render('wikipage', { page: page, user: user });
  })
  .catch(next);

});

module.exports = router;