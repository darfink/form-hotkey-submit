'use strict';

module.exports = function(element) {
  if(typeof(global.Eventi) === 'undefined') {
    return [];
  }

  let listener = element[global.Eventi._._key];
  let result = [];

  if(!listener) {
    return result;
  }

  let cache = listener.s;
  for(let type in cache) {
    cache[type].forEach(handler => {
      result.push({
        type: handler.text,
        listener: handler.fn,
        source: 'Eventi'
      });
    });
  }

  return result;
};
