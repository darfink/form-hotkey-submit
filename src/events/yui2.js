'use strict';

module.exports = function(element) {
  if(typeof(global.YAHOO) === 'undefined' || typeof(global.YAHOO.util) === 'undefined' || typeof(global.YAHOO.util.Event) === 'undefined') {
    return [];
  }

  let result = [];
  let events = global.YAHOO.util.Event.getListeners(element);

  if(events !== null && events.length !== 0) {
    result = events.map(event => {
      return {
        type: event.type,
        func: event.fn,
        source: 'YUI 2',
      };
    });
  }

  return result;
};
