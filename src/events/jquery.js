'use strict';
var semver = require('semver');

module.exports = function(element) {
  if(!global.jQuery) {
    return [];
  }

  let result = [];
  let events = semver.gte(global.jQuery.fn.jquery, '1.8.0') ?
    global.jQuery._data(element, 'events') :
    global.jQuery(element).data('events');

  for(let eventType in events) {
    result.push({
      type: eventType,
      listener: events[eventType][0].handler,
      source: 'jQuery',
    });
  }

  return result;
};
