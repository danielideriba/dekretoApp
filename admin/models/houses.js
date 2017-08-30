'use strict';
const mongoose = require('mongoose');
const HousesSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    default: ''
  },
  address: {
    type: String,
    require: true,
    default: ''
  },
  email :{
    type: String,
    require: true,
    default: ''
  },
  phone: {
    type: String,
    require: true,
    default: ''
  },
  site: {
    type: String,
    require: true,
    default: ''
  },
  description: {
    type: String,
    require: true,
    default: ''
  },
  cover: {
    type: String,
    require: true,
    default: ''
  },
  coordinateslat: {
    type: String,
    require: true,
    default: ''
  },
  coordinateslng: {
    type: String,
    require: true,
    default: ''
  },
  datetime: { type : Date, default: Date.now }
});

let Houses = module.exports = mongoose.model('Houses', HousesSchema);
