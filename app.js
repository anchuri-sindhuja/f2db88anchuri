var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
require('dotenv').config();
const connectionString =
  process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

//Get the default connection 
var db = mongoose.connection;

//Bind connection to error event  
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once("open", function () {
  console.log("Connection to DB succeeded")
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hatRouter = require('./routes/hat');
var gridbuildRouter = require('./routes/gridbuild');
var selectorRouter = require('./routes/selector');
const hat = require('./models/hat');
var resourceRouter = require('./routes/resource');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
// passport config
// Use the existing connection
// The Account model  
var Account =require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hat', hatRouter);
app.use('/gridbuild', gridbuildRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

// We can seed the collection if needed on server start 
async function recreateDB(){ 
  // Delete everything 
  await hat.deleteMany(); 
  let instance1 = new 
hat({
  hat_color:"blue",
  hat_type:"bucket",
  hat_size: 7
});
let instance2 = new 
hat({
hat_color:"red",
hat_type:"bowler",
hat_size:9
});
let instance3 = new 
hat({
  hat_color:"brown",
  hat_type:"beret",
  hat_size:8
}); 
  instance1.save( function(err,doc) { 
      if(err) return console.error(err); 
      console.log("First hat object saved") 
  }); 
  instance2.save( function(err,doc) { 
    if(err) return console.error(err); 
    console.log("Second hat object saved") 
}); 
instance3.save( function(err,doc) { 
  if(err) return console.error(err); 
  console.log("Third hat object saved") 
}); 
}

let reseed = true;
if (reseed) { recreateDB(); }
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

// for a specific hat. 
exports.hat_detail = async function(req, res) { 
  console.log("detail"  + req.params.id) 
  try { 
      result = await hat.findById( req.params.id) 
      res.send(result) 
  } catch (error) { 
      res.status(500) 
      res.send(`{"error": document for id ${req.params.id} not found`); 
  } 
}; 

module.exports = app;
