var express = require('express')
//var http = require('http');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var port = 3000;
var say = "World";

var app = express();
var server = app.listen(port);
console.log("Express server listening on port " + port);

app.get('/', index);


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

