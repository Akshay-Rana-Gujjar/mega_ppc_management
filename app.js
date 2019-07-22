var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var compression = require('compression');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mega_order',{ useNewUrlParser: true });

var indexRouter = require('./routes/index');
var customersRouter = require('./routes/customer');
var ordersRouter = require('./routes/order');
var gradesRouter = require('./routes/grade');
var productsRouter = require('./routes/product');
var shapesRouter = require('./routes/shape');
var mappingRouter = require('./routes/ingot_size_mapping.route');
var rollingRouter = require('./routes/rolling.route');
var rollinginRouter  = require('./routes/rollingin.route');

var app = express();

app.use(compression())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/customers', customersRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/grades', gradesRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/shapes', shapesRouter);
app.use('/api/v1/size-mapping', mappingRouter);
app.use('/api/v1/rolling', rollingRouter);
app.use('/api/v1/rolling-in', rollinginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
