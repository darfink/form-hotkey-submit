'use strict';
var $ = require('jquery');

module.exports = function(element) {
  if(typeof(global.MooTools) === 'undefined') {
    return [];
  }

  let result = [];
  let events = element.retrieve('events', {});

  if(!$.isEmptyObject(events)) {
    for(let eventType in events) {
      result.push({
        type: eventType,
        listener: events[eventType].keys,
        source: 'MooTools',
      });
    }
  }

  return result;
};
