'use strict';

const types = [
  'click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover',
  'mouseup', 'change', 'focus', 'blur', 'scroll', 'select', 'submit',
  'keydown', 'keypress', 'keyup', 'load', 'unload'
];

module.exports = function(element) {
  return types.filter(type => {
    return element[`on${type}`] === 'function';
  }).map(type => {
    return {
      type,
      listener: element[`on${type}`],
      source: 'DOM 0 event',
    };
  });
};
