'use strict';
var $ = require('jquery');

module.exports = function(element) {
  if(typeof(global.Ext) === 'undefined' || global.Ext.versions.core.version.indexOf('4.0') !== 0) {
    return [];
  }

  let result = [];
  let events = global.Ext.cache.filter(cache => {
    return typeof(cache.events) === 'object' && cache.el.dom === element && !$.isEmptyObject(cache.events);
  })[0];

  if(typeof(events) !== 'undefined') {
    for(let eventType in events) {
      events[eventType].forEach(event => {
        result.push({
          type: eventType,
          listener: event.fn,
          source: 'ExtJS',
        });
      });
    }
  }

  return result;
};
