'use strict';

module.exports = function(element) {
  if(typeof(global.jsBase) === 'undefined') {
    return [];
  }

  let events = global.jsBase.aEventCache.filter(event => event.nElement === element)[0];

  if(events) {
    return events.map(event => {
      return {
        type: event.type,
        listener: event.fn,
        source: 'jsBase',
      };
    });
  }

  return [];
};
