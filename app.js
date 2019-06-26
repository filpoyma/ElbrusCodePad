const createError = require('http-errors');
const express = require('express');
const morgan = require("morgan");
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const redis   = require("redis");
const RedisStore = require('connect-redis')(session);
const client  = redis.createClient();
const {cookiesCleaner} = require('./middleware/auth');
const logger = require('morgan');
const methodOverride = require('method-override')

const indexRouter = require('./routes/index');
const entriesRouter = require('./routes/entries');

const app = express();


// Подключаем mongoose.
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/elbruscodepad', { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
    store: new RedisStore({
        client,
        host: 'localhost',
        port: 6379,
        ttl :  2600
    }),
    key: 'user_sid',
    secret: 'anything here',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 6000000
    }
}));

app.use(cookiesCleaner);

// Allows you to use PUT, DELETE with forms.
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/', indexRouter);
app.use('/entries', entriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
