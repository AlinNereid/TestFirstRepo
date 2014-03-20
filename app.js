
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here geo'));
app.use(express.session());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/*
var db = mongoose.connect('mongodb://localhost/db1');

var Schema=new mongoose.Schema({
    _id : String,
    name : String,
    age : Number
});
var intrare=mongoose.model('col2',Schema);
intrare({_id:"blabla",name:"bla",age:15}).save(function(err,doc){
    if(err)
    console.log("erroare");
    else
    console.log("film");
});*/
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function callback () {
    // all your database operations(CRUD) here
//});
/*
app.get('/',function(req,res){
    if(req.session.bla){
        res.send('sesiune zice'+req.session.bla);
    }
    else
    {
        req.session.bla='blaaa';
        res.send('nica');
    }
});*/
app.get('/users', user.list);
app.get('/color',function(req,res){
    if(req.session.culoare){
        res.render('color', { culoare: req.session.culoare });
    }
    else{
        res.render('color', { culoare: 'green' });
    }

});
app.post('/color',function(req,res){
    var culoare=req.body.culoareSelectata;
    if(!culoare)
    {
        console.log("nu a fost selectata");
        res.render('color', { culoare: 'green' });
    }
    else
    {
        req.session.culoare=culoare;
        console.log("a fost selectata"+culoare);
        res.render('color', { culoare: culoare });
    }

});
app.get('/colorC',function(req,res){
    if(req.cookies.culoare){
        res.render('color', { culoare: req.cookies.culoare });
    }
    else{
        res.cookie('culoare','black');
        res.render('color', { culoare: 'yellow' });
    }
});

app.get('/socket',function(req,res){
    res.render('socket',{title : 'socket'});

});

app.get('/', function (req, res) {
    res.render('socket',{title : 'socket'});
});

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

/*
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});*/



//testare GIT