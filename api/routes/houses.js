const express = require('express');
const router = express.Router();

//models
let Houses = require('../../admin/models/houses');

//List all users
router.get('/list', function(req, res){
  //res.json({ message: 'LISTAGEM DE USUARIOS!!' });
  Houses.find({}, {__v: 0}, function(err, houses){
    if(err){
      console.log(err);
    } else {
      res.json({houses: houses});
    }
  });
});

module.exports = router;
