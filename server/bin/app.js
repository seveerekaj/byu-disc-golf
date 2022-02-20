var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var courseRouter = require('./routers/course');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/course', courseRouter);

// send frontend
// keeping commented out so we know what to do to server static files from our Angular frontend project
/* app.use('/*', (_, res) => {
  res.sendFile(
    path.join(__dirname, 'client', 'dist', 'byu-disc-golf', 'index.html')
  );
}); */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('ENV') === 'dev' ? err : {};

  res.status(err.status || 500);
  res.send('An error has occurred');
});

module.exports = app;
