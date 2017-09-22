const express = require('express');
const flash = require('connect-flash');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const adminPathHouses = '/admin/genre';
const common = require('../utils/common');

let Genre = require('../models/genre');

// List
router.get('/list',/* common.ensureAuthenticated,*/ function(req, res){
  Genre.find({}, function(err, genre){
    if(err){
      console.log(err);
    } else {
      res.render('list_add_genre', {
        title: "lista de gêneros",
        empty_list: "Não existem eventos cadastrados",
        label_user_name: "Novo Gênero"
      });
    }
  });
});

module.exports = router;
