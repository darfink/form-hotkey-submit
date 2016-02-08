'use strict';
var semver = require('semver');

module.exports = function(element) {
  if(typeof(global.Prototype) === 'undefined') {
    return [];
  }

  let result = [];
  let version = global.Prototype.Version;

  if(version.length === 3) {
    version += '.0';
  }

  if(semver.gte(version, '1.7.0')) {
    let registry = element.getStorage().get('prototype_event_registry');
    if(registry) {
      let events = registry._object;
      for(let eventType in events) {
        result.push({
          type: eventType,
          listener: events[eventType][0],
          source: 'Prototype',
        });
      }
    }
  } else if(element._prototypeEventID) {
    for(let eventType in global.Event.cache[element._prototypeEventID]) {
      result.push({
        type: eventType,
        listener: global.Event.cache[element._prototypeEventID][eventType][0].handler,
        source: 'Prototype',
      });
    }
  }

  return result;
};
