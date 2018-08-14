(function () {
  'use strict';
  
  var service =  {
    "parseListDTO": parseListDTO,
    "parseItemDTO": parseItemDTO
  };
  var _ = require('lodash');
  
  
  module.exports = service;
  
  function parseListDTO(res) {
    let response = {};
    let items = [];
    response.categories = getCategories(res);
    _.each(_.get(res, 'results'), (resItem) => {
      
      let item = {};
      item.id = _.get(resItem, 'id');
      item.title = _.get(resItem, 'title');
      item.price = getPrice(resItem);
      item.picture =  _.get(resItem, 'thumbnail');
      item.condition = _.get(resItem, 'condition');
      item.free_shipping = _.get(resItem, 'shipping.free_shipping');
      item.address = resItem.address;
  
      items.push(item);
    });
    response.items = items;
    return response;
  }
  
  function parseItemDTO(originalItem, description) {
    let result = {};
    
    let item = {};
    item.id = _.get(originalItem, 'id');
    item.title = _.get(originalItem, 'title');
    item.price = getPrice(originalItem);
    
    result.item = item;
    result.picture =  _.get(originalItem, 'thumbnail');
    result.pictures =  _.get(originalItem, 'pictures');
    result.condition = _.get(originalItem, 'condition');
    result.free_shipping = _.get(originalItem, 'shipping.free_shipping');
    result.sold_quantity = _.get(originalItem, 'sold_quantity');
    result.description = _.get(description, 'plain_text');
    return result;
  }
  
  function getCategories(res) {
    console.log('_.get(_.first(_.get(_.find(res.filters, {\'id\': \'category\'}), \'values\')), \'path_from_root\')');
    console.log(_.get(_.first(_.get(_.find(res.filters, {'id': 'category'}), 'values')), 'path_from_root'));
    let categories = _.map( _.get(_.first(_.get(_.find(res.filters, {'id': 'category'}), 'values')), 'path_from_root'), 'name');
    return categories;
  }
  
  function getPrice(item) {
    let price = {};
    
    price.currency = _.get(item, 'currency_id');
    price.amount = _.get(item, 'price');
    price.decimals = price.amount.toString().indexOf(".") ? price.amount.toString().substring(price.amount.toString().indexOf("."), price.amount.toString().length -1).length : 0;
    
    return price;
  }
  
 
  
  
})();
