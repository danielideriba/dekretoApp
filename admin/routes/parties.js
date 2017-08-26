const express = require('express');
const flash = require('connect-flash');
const router = express.Router();
const adminPath = '/admin/parties';

//models
let Users = require('../models/parties');

module.exports = router;
