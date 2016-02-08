'use strict';

var _ = require('lodash');
var events = [
  require('./events/dom0.js'),
  require('./events/eventi.js'),
  require('./events/extjs.js'),
  require('./events/glow.js'),
  require('./events/jquery.js'),
  require('./events/jsbase.js'),
  require('./events/mootools.js'),
  require('./events/prototype.js'),
  require('./events/yui2.js'),
];

module.exports = function(element) {
  return _(events)
    .map(parser => parser(element))
    .filter('length')
    .flatten()
    .groupBy('type')
    .value();
};
