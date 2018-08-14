(function () {
  'use strict';
  
  module.exports = init;
  
  function init(app) {
    let controller = require('../controllers/items.server.controller');
    
    app.route('/api/items').get(controller.getItems);
    app.route('/api/items/:id').get(controller.getItemById);
    
    
  }
})();
