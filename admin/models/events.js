'use strict';
const mongoose = require('mongoose');
const EventsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    default: ''
  },
  eventDate: {
    type: String,
    require: true,
    default: ''
  },
  eventHour: {
    type: String,
    require: true,
    default: ''
  },
  presence: {
    type: Boolean,
    require: true,
    default: ''
  },
  cover: {
    type: String,
    require: true,
    default: ''
  },
  style: {
    type: String,
    require: true,
    default: ''
  },
  popularity: {
    type: String,
    require: true,
    default: ''
  },
  id_houses: {
    type: String,
    require: true,
    default: ''
  },
  datetime: { type : Date, default: Date.now }
});

let Events = module.exports = mongoose.model('Events', EventsSchema);
