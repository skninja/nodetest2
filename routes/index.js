var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET hello world page */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', {title: 'Hello world!'});
});

/* GET userlist page */
router.get('/users', function(req, res, next) {
  var db = req.db;
  var collection = db.get("users");
  collection.find({}, {}, function(err, docs){
    res.render('users', { "users": docs});
  });
});

/* GET newuser page */
router.get('/newuser', function(req, res, next){
  res.render("newuser", { title: "Add new user" });
});

/* POST adduser page */
router.post('/adduser', function(req, res, next){
  // set up db and collection variables
  var db = req.db;
  var collection = db.get("users");

  // data recieved is stored in local vars
  var username = req.body.username;
  var useremail = req.body.useremail;
  
  // insert in db
  collection.insert({
    "username": username,
    "email": useremail
  }, function(err, docs){
      if(err){
        res.send("There was a problem adding information to the database");
      }
      else{
        res.redirect("users");
      }
  });
});

module.exports = router;
