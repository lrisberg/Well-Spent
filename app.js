var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var tokens = require('./routes/tokens');
var purchases = require('./routes/purchases');
var happiness = require('./routes/happiness');
var categories = require('./routes/categories');
var dashboard = require('./routes/dashboard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the React app
// https://daveceddia.com/create-react-app-express-production/
app.use(express.static(path.join(__dirname, 'client/build')));

// app.use('/', index);
app.use('/api/users', users);
app.use('/api/tokens', tokens);
app.use('/api/purchases', purchases);
app.use('/api/purchases', happiness);
app.use('/api/categories', categories);
app.use('/api/dashboard', dashboard);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// https://daveceddia.com/create-react-app-express-production/
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
