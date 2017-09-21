const express = require('express');
const flash = require('connect-flash');
const router = express.Router();
const passport = require('passport');
const adminPath = '/admin';
const adminPathEvents = adminPath+'/events';
const common = require('../utils/common');

//models
let Events = require('../models/events');
let Houses = require('../models/houses');

//List all users
router.get('/list', /*common.ensureAuthenticated,*/ function(req, res){
  Events.find({}, function(err, events){
    if(err){
      console.log(err);
    } else {
      res.render('list_events', {
        title: "lista de Eventos",
        empty_list: "Não existem eventos cadastrados",
        events: events
      });
    }
  });
});

//add new
router.get('/add', /*common.ensureAuthenticated,*/ function(req, res) {
  var query = {"name": 1};
  Houses.find({}, query, function (err, houses) {
    if(err){
      console.log(err);
    } else {
      console.log(houses);
      res.render('add_events', {
        title: "Cadastro de Eventos",
        label_events_name: "Nome do Evento",
        label_events_date: "Data", //Campo date
        label_events_hour: "Hora", // Mascara de hora
        label_events_presence: "Com lista ou sem", //Checkbox
        label_events_cover: "Imagem",
        label_events_style: "Estilo Musical", //Selectbox
        label_events_popularity: "Popularidade", // Rating
        label_events_belong_to: "Casas",
        list_houses : "",
        houses: houses
      });
    }
  });
});

//Build up select box of houses
function listHouses(req, res){
  var query = {"name": 1};
  Houses.find({}, query, function (err, houses) {
    if(err){
      console.log(err);
      return null;
    } else {
      console.log(houses);
      return houses;
    }
  });
}

module.exports = router;