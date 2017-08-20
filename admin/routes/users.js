const express = require('express');
const router = express.Router();

//models
let Users = require('../models/users');

//add new User
router.get('/add', function(req, res) {
  res.render('add_users', {
    title: "Cadastro de Usuários",
    user_name: "Nome do usuário",
    nick_name: "Nick Name",
    password: "Senha"
  });
});

// add submit POST routes
router.post('/add', function(req, res){
  //Validation
  req.checkBody('user_name','Nome do usuário é obrigatório').notEmpty();
  req.checkBody('nick_name','Nick Name é obrigatório').notEmpty();
  req.checkBody('password','Senha é obrigatório').notEmpty();

  //Get errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_users', {
      title: "Cadastro de Usuários",
      user_name: "Nome do usuário",
      nick_name: "Nick Name",
      password: "Senha",
      errors: errors
    });
  } else {
    let users = new Users();
    users.user_name = req.body.user_name;
    users.nick_name = req.body.nick_name;
    users.password = req.body.password;

    users.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success', 'Usuário Inserido');
        res.redirect('/list');
      }
    });
  }
});

// Update Submit Edit User
router.post('/edit/:id', function(req, res){
  let users = {};
  users.user_name = req.body.user_name;
  users.nick_name = req.body.nick_name;
  users.password = req.body.password;

  let query = {_id:req.params.id}

  Users.update(query, users, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      res.flash('success', 'Usuário atualizado');
      res.redirect('/list');
    }
  });
});

//Edit User
router.get('/edit/:id', function(req, res){
  Users.findById(req.params.id, function(err, user){
    if(err){
      console.log(err);
    } else {
      res.render('edit_user', {
        title: "Editar Usuário",
        label_user_name: "Nome do usuário",
        label_nick_name: "Nick Name",
        label_password: "Senha",
        name: user
      });
    }
  });
});

//List all users
router.get('/list', function(req, res){
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

//Deletar
router.delete('/:id', function(req, res){
  let query = {_id:req.params.id}

  Users.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('success');
  });
});

//Single user
router.get('/:id', function(req, res){
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


module.exports = router;
