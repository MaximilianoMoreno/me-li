(function () {
  'use strict';
  
  let  _= require('lodash'),
          CacheService = require('../services/cache.server.service'),
          request = require('request'),
          itemsService = require('../services/items.server.services');
  
  let controller = {
    "getItems": getLatestConversion,
    "getItemById": getItemById
  };
  
  const ttl = 10 * 60 * 1; // cache for 10 minutes
  const cache = new CacheService(ttl); // Create a new cache service instance
  
  module.exports = controller;
  
  function getLatestConversion(req, res) {
    let query = req.query.q;
    console.log(query);
    if (query) {
      try {
        doRequest('https://api.mercadolibre.com/sites/MLA/search?q=' + query + '&limit=4').then( (body) => {
  
          let results = itemsService.parseListDTO(JSON.parse(body));
          res.send(results);
        })
      } catch (err) {
        console.error('Http error', err);
        res.status(500).send()
      }
      
    } else {
      
      return res.send('No query');
    }
    
  }
  
  async function getItemById(req, res) {
    let query = req.params.id;
    let item;
    let description;
    let result;
  
    try {
      item = await doRequest('https://api.mercadolibre.com/items/' + query);
    } catch (err) {
      console.error('Http error', err);
      return res.status(500).send();
    }
    
    try {
      description = await doRequest('https://api.mercadolibre.com/items/' + query + '/description');
    } catch (err) {
      console.error('Http error', err);
      return res.status(500).send();
    }
    
    result = itemsService.parseItemDTO(JSON.parse(item), JSON.parse(description));
    
    return res.send(result);
    
    
  }
  
  function doRequest(url) {
    return new Promise(function (resolve, reject) {
      request(url, function (error, res, body) {
        if (!error && res.statusCode === 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }
  
})();
