'use strict';
var $ = require('jquery');
var getEventListeners = require('./geteventlisteners');

class SubmitManager {
  addFrame(frame) {
    $(frame.document).on('keydown', 'body', event => {
      if(this.isValidHotkey(event) && this.triggerSubmit(frame)) {
        // Do not allow other functions to trigger
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }

  isValidHotkey(event) {
    if(navigator.platform === 'MacIntel') {
      if(!event.metaKey) {
        return false;
      }
    } else if(!event.ctrlKey) {
      return false;
    }

    return event.keyCode === 13;
  }

  triggerSubmit(frame) {
    var $form = $(frame.document.activeElement).closest('form');

    if(!$form.length) {
      // In case a form cannot be found, the active element may be in an iframe
      $form = $(frame.parent.document).find('iframe').filter(function() {
        try { return $(this).contents().find(frame.document.activeElement).length > 0; }
        catch(x) { return false; }
      }).eq(0).closest('form');

      if(!$form.length) {
        console.log('Could not find a form element');
        return;
      }
    }

    var $submit = $form.find(':submit:visible');

    if(!$submit.length) {
      $submit = $form
        .find('[id*=submit]')
        .filter((index, input) => 'click' in getEventListeners(input));

      if(!$submit.length) {
        console.log('Could not find a submit element');
        return;
      }
    }

    // Submit the form
    $submit.eq(0).click();
  }
}

module.exports = SubmitManager;
