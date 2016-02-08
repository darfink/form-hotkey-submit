'use strict';

module.exports = function(element) {
  if(typeof(global.glow) === 'undefined' || typeof(global.glow.events.listenersByObjId) === 'undefined') {
		return [];
	}

  const glowIdentifier = `__eventId${global.glow.UID}`;

  let result = [];
	let listeners = global.glow.events.listenersByObjId;
  let eventIndex = element[glowIdentifier];

  if(eventIndex) {
    for(let eventType in listeners[eventIndex]) {
      listeners[eventIndex][eventType].forEach(event => {
        result.push({
          type: eventType,
          listener: event[2],
          source: 'Glow',
        });
      });
    }
  }

  return result;
};
