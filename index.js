var express = require('express')
  , http = require('http');

var port=3000;
var say="World";

var app = express();
var server = app.listen(port);
console.log("Express server listening on port "+ port);

app.get('/',index);

function index(req,res){
   res.send('Hello ' + say);
}

