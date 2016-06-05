var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://202.120.40.73/law');
var HomepageAd = require('./models/HomepageAd');
var User = require('./models/User');
var Dispatch = require('./models/Dispatch');
var Release = require('./models/Release');
var Exchange = require('./models/Exchange');
var Currency = require('./models/Currency');
var Claim = require('./models/Claim');
var Company = require('./models/Company');
var Rate = require('./models/Rate');
var RateDate = require('./models/RateDate');
HomepageAd.register();
User.register();
Dispatch.register();
Release.register();
Exchange.register();
Currency.register();
Claim.register();
Company.register();
Rate.register();
RateDate.register();
// var redis = require('redis');
// var RedisStore = require('connect-redis')(session);

var routes = require('./routes/index');
var creditor = require('./routes/creditor');
var users = require('./routes/users');
var companies = require('./routes/companies');
var currencies = require('./routes/currencies');
var claims = require('./routes/claims');
var dispatches = require('./routes/dispatches');

var app = express();

// var redisClient = redis.createClient(26379, "202.120.40.73");
// redisClient.on('error', function(err) {
//   console.error("Redis error: " + err);
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine({
    beautify: true,
    transformViews: true,
    babel: {presets: ['react', 'es2015']}
}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: '110211', /* storage: redisClient,*/ resave: false, saveUninitialized: true}));
// app.use(function (req,res,next) {
//   if(!req.session) {
//     next(new Error('session storage not connected'));
//   }
// });
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/creditor', creditor);
app.use('/users', users);
app.use('/companies', companies);
app.use('/currencies', currencies);
app.use('/claims', claims);
app.use('/dispatches', dispatches);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.error(err.message);
        console.error(err.stack);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
