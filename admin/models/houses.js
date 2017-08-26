'use strict';
const mongoose = require('mongoose');
const HousesSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  email :{
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  site: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  cover: {
    type: String,
    require: true
  },
  coordinateslat: {
    type: String,
    require: true
  },
  coordinateslng: {
    type: String,
    require: true
  },
  datetime: { type : Date, default: Date.now }
});

let Houses = module.exports = mongoose.model('Houses', HousesSchema);
