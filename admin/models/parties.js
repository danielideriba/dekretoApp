'use strict';
const mongoose = require('mongoose');
const PartiesSchema = mongoose.Schema({
  user_name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

let Parties = module.exports = mongoose.model('Parties', PartiesSchema);
