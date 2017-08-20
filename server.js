const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var port = 3000;
var bodyParser = require('body-parser');
var adminPath = '/admin';

//init
const app = express();

//models
let Users = require('./admin/models/users');

//connect with mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dekretodb', { useMongoClient: true });
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

//add routes
app.get(adminPath, function(req, res){
  res.render('index', {
    title: "SISTEMA ADMINSTRATIVO DEKRETOAPP",
    description: "Sistema que alimenta a RESTApi"
  });
});

app.get(adminPath+'/users/add', function(req, res) {
  res.render('add_users', {
    title: "Cadastro de Usuários",
    user_name: "Nome do usuário",
    nick_name: "Nick Name",
    password: "Senha"
  })
});

// add submit POST routes
app.post(adminPath+'/users/add', function(req, res){
  let users = new Users();
  users.user_name = req.body.user_name;
  users.nick_name = req.body.nick_name;
  users.password = req.body.password;

  users.save(function(err){
    if(err){
      console.log(err);
      return;
    } else {
      console.log("Salvou e vai redirecionar");
      res.redirect(adminPath+'/users/add');
    }
  });
});

//List all users
app.get(adminPath+'/users/list', function(req, res){
  Users.find({}, function(err, users){
    if(err){
      console.log(err);
    } else {
      res.render('list_users', {
        title: "lista de usuários",
        users: users
      });
    }
  });
});

//Single users
app.get(adminPath+'/users/:id', function(req, res){
  Users.findById(req.params.id, function(err, user){
    if(err){
      console.log(err);
    } else {
      res.render('single_user', {
        name: user
      });
    }
  });
});

app.listen(port, function(){
    console.log('Server DekretoApi iniciado na porta: ' + port);
});
