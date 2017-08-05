var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
    Task = require('./api/models/dekretoModel'),
    bodyParser = require('body-parser');

  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/dekretodb', { useMongoClient: true });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  var routes = require('./api/routes/dekretoRoutes');
  routes(app);

app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('Server DekretoApi iniciado na porta: ' + port);
