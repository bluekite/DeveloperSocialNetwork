
/**
 * Module dependencies.
 */

var express = require('express');


//Server function control
var webcrawler = require('./controllers/webcrawler.js');

//Web routes control
var routes = require('./routes');
var user = require('./routes/user');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/smssnd');

var http = require('http');
var path = require('path');

var MongoStore = require('connect-mongo')(express);
var flash = require('connect-flash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser('cold_smssnd'));
app.use(express.session({
    secret: 'cold_smssnd',
    cookie: { expire: false },
    store: new MongoStore({
        mongoose_connection : mongoose.connections[0]
    })
}));

app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


webcrawler(app);

routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
