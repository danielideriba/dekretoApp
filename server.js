const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const port = 3000;
const adminPath = '/admin';
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require(__dirname+'/admin/config/database');
const common = require(__dirname+'/admin/utils/common');

//init
const app = express();

//connect with mongodb
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });
let db = mongoose.connection;

//Check connection
db.once('openUri', function(){
  console.log('Connected on mongodb');
});

//DB errors
db.on('error', function(err){
  console.log(err);
});


//Load view engine
app.set('views', path.join(__dirname, '/admin/views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, "public")));

// Express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//passport config
require(__dirname+'/admin/config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//models
let Users = require(__dirname+'/admin/models/users');

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

//Home admin
app.get(adminPath, common.ensureAuthenticated, function(req, res){
  res.render('index', {
    title: "SISTEMA ADMINSTRATIVO DEKRETO",
    description: "Sistema que alimenta a RESTApi",
    charset: 'utf-8',
    userId: "adminstrador"
  });
});

//Routes
let users = require(__dirname+adminPath+'/routes/users');
app.use(adminPath+'/users/', users);

let registerParties = require(__dirname+adminPath+'/routes/parties');
app.use(adminPath+'/parties/', registerParties);


app.listen(port, function(){
    console.log('Server DekretoApi iniciado na porta: ' + port);
});
