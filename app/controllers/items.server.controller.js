(function () {
  'use strict';
  
  let  _= require('lodash'),
          request = require('request'),
          itemsService = require('../services/items.server.services');
  
  let controller = {
    "getItems": getItems,
    "getItemById": getItemById
  };
  
  module.exports = controller;
  
  function getItems(req, res) {
    let query = req.query.q;
    console.log('GET: items by query: ');
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
    let result;    console.log();
    console.log('GET: items by ID: ');
    console.log(query);
  
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
