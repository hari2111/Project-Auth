var express  = require('express');
var http=require('http')
var app=express();
var mongoose=require('mongoose');
var morgan=require('morgan');
var bodyParser=require('body-parser');
var router=require('./router');


//DB setup
mongoose.connect('mongodb://localhost:27017/auth');
//App setup
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
router(app);


//Server Setup
var port= process.env.PORT || 8080;
var ser=http.createServer(app);
ser.listen(port);
console.log('server listening on ' + port);