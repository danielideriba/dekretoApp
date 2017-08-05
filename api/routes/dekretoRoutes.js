'use strict';
module.exports = function(app) {
  var dekreto = require('../controllers/dekretoController');

  // Rotas
  app.route('/tasks')
    .get(dekreto.list_all_tasks)
    .post(dekreto.create_a_task);

  app.route('/tasks/:taskId')
    .get(dekreto.read_a_task)
    .put(dekreto.update_a_task)
    .delete(dekreto.delete_a_task);
};
