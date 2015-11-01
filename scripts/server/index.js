var express = require('express');
//var http = require('http');
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;

var port = process.env.PORT || 3000;

var app = express();

//app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function index(req, res) {
    res.render('pages/index');
});

var rootFolder = __dirname + './../../build/client';
app.use(express.static(rootFolder, { maxAge: '1d' }));

app.listen(port);
console.log("Dirname " + rootFolder);
console.log("Express server listening on port " + port);


//app.post('/login',
//    passport.authenticate('local'),
//    function (req, res) {
//        // If this function gets called, authentication was successful.
//        // `req.user` contains the authenticated user.
//        res.redirect('/users/' + req.user.username);
//    });
//
//
//function index(req, res) {
//    res.send('Hello ' + say);
//}

