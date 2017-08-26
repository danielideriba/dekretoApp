const express = require('express');
const flash = require('connect-flash');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const adminPath = '/admin';
const adminPathHouses = adminPath+'/houses';
const common = require('../utils/common');

//models
let Houses = require('../models/houses');

//List all users
router.get('/list', function(req, res){
  Houses.find({}, function(err, houses){
    if(err){
      console.log(err);
    } else {
      res.render('list_houses', {
        title: "lista de casas",
        houses: houses
      });
    }
  });
});


//add new User
router.get('/add', function(req, res) {
  res.render('add_houses', {
    title: "Cadastro de Casas",
    label_house_name: "Nome do casa",
    label_house_address: "Endereço",
    label_house_email: "E-Mail",
    label_house_phone: "Telefone",
    label_house_site: "Site",
    label_house_description: "Descrição",
    label_cover: "Capa",
    label_house_coordinateslat: "Latitude",
    label_house_coordinateslng: "Longitude"
  });
});

// add submit POST routes
router.post('/add', function(req, res){
  //Validation
  req.checkBody('house_name','Nome do usuário é obrigatório').notEmpty();
  req.checkBody('house_address','Endereço é obrigatório').notEmpty();
  req.checkBody('house_email','E-Mail é obrigatório').notEmpty();
  req.checkBody('house_email','E-Mail é não válido ').isEmail();
  req.checkBody('house_phone','Telefone é obrigatório').notEmpty();
  req.checkBody('house_site','Site é obrigatório').notEmpty();
  req.checkBody('house_description','Descrição é obrigatório').notEmpty();
  req.checkBody('house_cover','Endereço é obrigatório').notEmpty();
  req.checkBody('house_coordinateslat','Latitude é obrigatório').notEmpty();
  req.checkBody('house_coordinateslng','Longitude é obrigatório').notEmpty();

  //Get errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_houses', {
      title: "Cadastro de Casas",
      label_house_name: "Nome do casa",
      label_house_address: "Endereço",
      label_house_email: "E-Mail",
      label_house_phone: "Telefone",
      label_house_site: "Site",
      label_house_description: "Descrição",
      label_cover: "Capa",
      label_house_coordinateslat: "Latitude",
      label_house_coordinateslng: "Longitude",
      errors: errors
    });
  } else {
    let houses = new Houses();
    houses.name = req.body.house_name;
    houses.address = req.body.house_address;
    houses.email = req.body.house_email;
    houses.phone = req.body.house_phone;
    houses.site = req.body.house_site;
    houses.description = req.body.house_description;
    houses.cover = req.body.house_cover;
    houses.coordinateslat = req.body.house_coordinateslat;
    houses.coordinateslng = req.body.house_coordinateslng;

    houses.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success', 'Casa Inserida');
        console.log('Casa Inserida');
        res.redirect(adminPathHouses+'/list');
      }
    });
  }
});

module.exports = router;