(function () {
  'use strict';
  
  const express = require('express');
  const path = require('path');
  const _ = require('lodash');
  const bodyParser = require('body-parser');
  const app = express();
  
  app.use(express.static(path.join(__dirname, 'build')));
  
  
  require('./config/initEnv')();
  let config = require('./config/config');
  let routes = require('./config/initRoutes');
  

  let App = function () {
    let self = this;
    
    self.initialize = initialize;
    self.initializeServer = initializeServer;
  };
  
  var zapp = new App();
  zapp.initialize();
  
  function initialize() {
    
    // Create the express server and routes.
    zapp.initializeServer();
  }
  
  /**
   *  Initialize the server (express) and create the routes and register
   *  the handlers.
   */
  function initializeServer() {
    zapp.app = express();
    zapp.app.use(bodyParser.json({limit: '50mb'}));
    
    
    var server = require('http').Server(zapp.app);
    
    console.log('Server running on port ' + config.port);
    server.listen(config.port, config.hostname);
    
    routes.init(zapp.app);
    
    zapp.app.locals.title = config.app.title;
    
    zapp.app.set('showStackError', true);
    
  }
  
})();
