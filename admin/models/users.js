'use strict';
let mongoose = require('mongoose');
let UsersSchema = mongoose.Schema({
  user_name: {
    type: String,
    require: true
  },
  nick_name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

let User = module.exports = mongoose.model('User', UsersSchema);
