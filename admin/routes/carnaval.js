'use strict';
const express = require('express');
const flash = require('connect-flash');
const router = express.Router();
const passport = require('passport');
const adminPath = '/admin';
const adminPathCarnaval = adminPath+'/carnaval';
const common = require('../utils/common');
const dateFormat = require('dateformat');

//models
let Carnaval = require('../models/carnaval');

//List all users
router.get('/list', /*common.ensureAuthenticated,*/ function(req, res){
  Carnaval.find({}, function(err, blocos){
    if(err){
      console.log(err);
    } else {
      res.render('list_blocos', {
        title: "Blocos de carnaval",
        empty_list: "Não existem Blocos cadastrados",
        blocos: blocos
      });
    }
  });
});

//add new
router.get('/add', /*common.ensureAuthenticated,*/ function(req, res) {
  renderData(req, res);
});

router.post('/add', /*common.ensureAuthenticated,*/ function(req, res) {
  //Validation
  req.checkBody('events_name','Nome do evento é obrigatório').notEmpty();
  // req.checkBody('events_description','descrição é obrigatório').notEmpty();
  // req.checkBody('events_date','Data é obrigatório').notEmpty();
  // req.checkBody('events_hour','Hora é obrigatório').notEmpty();
  // req.checkBody('events_price_with_list','Valor com lista é obrigatório').notEmpty();
  // req.checkBody('events_price_without_list','Valor sem lista é obrigatório').notEmpty();
  // req.checkBody('events_price_before','Antecipado é obrigatório').notEmpty();
  // req.checkBody('events_price_birthday','Aniversariante é obrigatório').notEmpty();
  // req.checkBody('events_type_conditions','Condições é obrigatório').notEmpty();
  // req.checkBody('events_price_single','Valor único é obrigatório').notEmpty();
  /*req.checkBody('events_style','Estilo é obrigatório').notEmpty();
  req.checkBody('events_houses','Casa é obrigatório').notEmpty();
  req.checkBody('events_type','Tipo é obrigatório').notEmpty();*/

  //Get errors
  let errors = req.validationErrors();

  if(errors){
    renderData(req, res);
  } else {
      let carnaval = new Carnaval();
      carnaval.nameParty = req.body.bloco_name;
      // events.description = req.body.events_description;
      // events.eventDate = req.body.events_date;
      // events.eventHour = req.body.events_hour;
      // events.priceWithList = req.body.events_price_with_list;
      // events.priceWithoutList = req.body.events_price_without_list
      // events.priceBefore = req.body.price_before;
      // events.priceSingle = req.body.price_single;
      // events.cover = req.body.events_cover;
      // events.birthday = req.body.birthday;
      // events.typeConditions = req.body.events_type_conditions;
      // events.typeEvent = req.body.events_type;
      // events.id_houses = req.body.events_houses;
      // events.id_genre = req.body.events_genre;

      //Save data
      carnaval.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
          req.flash('success', 'Bloco de carnaval Inserido');
          console.log('Bloco de carnaval Inserido');
          res.redirect(adminPathEvents+'/list');
        }
      });
  }
});
//
//
// //Edit Events
// router.get('/edit/:id', function(req, res){
//   Events.findById(req.params.id, function(err, events){
//     if(err){
//       console.log(err);
//     } else {
//       console.log(events);
//       renderData(req, res);
//     }
//   });
// });
//
// router.get('/:id', function(req, res){
//   Events.findById(req.params.id, function(err, events){
//     if(err){
//       console.log(err);
//     } else {
//       var queryGenre = {"_id": {$in: events.id_genre}};
//       Genre.find(queryGenre, function(err, genres) {
//         if(err){
//           console.log(err);
//         } else {
//           var queryType = {"_id": {$in: events.typeEvent}};
//           Types.find(queryType, function(err, types) {
//             if(err){
//               console.log(err);
//             } else {
//               Houses.findById(events.id_houses, function(err, houses) {
//                 if(err){
//                   console.log(err);
//                 } else {
//                   res.render('single_events', {
//                     currentPath: adminPathEvents,
//                     events: events,
//                     genres: genres,
//                     types: types,
//                     houses_name: houses.name,
//                     empty_list: "Não existem eventos cadastrados"
//                   });
//                 }
//               });
//             }
//           });
//         }
//       });
//     }
//   });
// });
//
function renderData(req, res){
  var query = {"name": 1};
  Carnaval.find({}, function(err, types){
            if(err){
              console.log(err);
            } else {
              res.render('add_blocos', {
                title: "Cadastro de Blocos de carnaval",
                label_carnaval_name: "Nome do Bloco",
                list_blocos : ""
              });
            }
          });
}


module.exports = router;
