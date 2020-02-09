const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/webhook', cors(), require('./routes/webhook'));
app.use('/api/user', require('./routes/user'));
app.use('/api/server', require('./routes/server'));

// catch 404 and forward to error handler
app.use(/^\/api(.*)/, (req, res, next) => {
  next(createError(404));
});

// error handler
app.use(/^\/api(.*)/, (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: err.status || 500});
});

app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/dist/index.html'))
});

module.exports = app;
