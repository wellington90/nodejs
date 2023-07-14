var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var Sentry = require('@sentry/node');
var Tracing = require("@sentry/tracing");

console.log("jon-autodevops");

try {
  // nonExistentFunction();
  Sentry.init({
    dsn: "https://dade7d2fee6541e995cd21fef1069954@o1353808.ingest.sentry.io/6659525",
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({
        // to trace all requests to the default router
        app,
        // alternatively, you can specify the routes you want to trace:
        // router: someRouter,
      }),
    ],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });


} catch (error) {

  console.log("------------");
  console.log(error);
  console.log("------------");
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}


// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/debug-sentry', function mainHandler(req, res) {
  
  var transaction = Sentry.startTransaction({
    op: "test",
    name: "My First Test Transaction",
  });

  setTimeout(() => {
    try {
      foo();
    } catch (e) {
      sentry.captureException(e);
    } finally {
      transaction.finish();
    }
  }, 99);
  
  res.send('respond with a resource');

  
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

/*
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
module.exports = app;
