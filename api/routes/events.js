'use strict';
const express = require('express');
const router = express.Router();
const common = require('../../admin/utils/common');

//models
let Events = require('../../admin/models/events');

//List
router.get('/list', function(req, res){
  var query = {__v: 0};

  Events.find({}, query, function(err, events){
    if(err){
      console.log(err);
    } else {
      res.json({events: events});
    }
  });
});

module.exports = router;
