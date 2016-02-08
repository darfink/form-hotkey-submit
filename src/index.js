'use strict';
var _ = require('lodash');
var $ = require('jquery');
var SubmitManager = require('./submitmanager');

window.onload = function() {
  // Create the submit manager instance
  var submitManager = new SubmitManager();

  // Add the global window object
  submitManager.addFrame(this);

  // Iterate over each accssible iframe
  Array.from(this.frames).filter(frame => {
    try { return !!frame.document; }
    catch(ex) { return false; }
  }).forEach(frame => {
    submitManager.addFrame(frame);
  });

  // Add support for dynamically created iframes
  var observer = new MutationObserver(mutations => {
    // Retrieve all added nodes in a one-dimensional array
    var nodes = _(mutations).map(mutation => Array.from(mutation.addedNodes)).flatten().value();

    nodes.forEach(node => {
      $(node).find('iframe').each((index, frame) => {
        $(frame).load(function() {
          // Add each iframe that is accessible to the submit manager
          try { if(this.contentWindow.document) submitManager.addFrame(this.contentWindow); }
          catch(ex) { }
        });
      });
    });
  });

  // Observe the entire document for added nodes
  observer.observe(document.body, { subtree: true, childList: true });
};

