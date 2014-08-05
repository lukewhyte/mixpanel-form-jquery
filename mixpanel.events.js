;(function($, window, document, undefined) {
  var pluginName = 'mixpanelEvent',
      defaults = {
        checkVal: false, // used by trackArrival()
        eventName: false, // set a custom event name
        callback: false // add a custom method to the plugin
      };

  function TrackEvent(element, options) {
    this.$el = $(element);
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  TrackEvent.prototype = {
    // Used to set the event name to either a custom name or the closest ID to the element up the DOM tree
    setName: function() {
      return (this.options.eventName === false) ? this.$el.closest('[id]').attr('id') : this.options.eventName;
    },

    getTimeStamp: function() {
      // Widdle the Date object to fit Mixpanel's format
      var d = new Date(),
          d = d.toISOString(),
          d = d.split('.');

      d.pop();
      return d.join();
    },

    basicReport: function() {
      // This is used to track an event where only generic data is needed
      var result = {
            eventName: this.setName(),
            properties: {
              'Time Sent': this.getTimeStamp()
            }
          };
      this.mixpanel(result);
    },

    trackArrival: function(elements) {
      // This is fired on page load if the selector is 'body'
      var result = {
            eventName: 'PageViewSnapshot',
            properties: {
              'Time Sent': this.getTimeStamp()
            }
          };

      if (elements) {
        var array = $.isArray(elements) ? elements : [elements],
            vals = '', i = 0, max = array.length;

        for (; i < max; i++) {
          vals += $(array[i]).val();
          if (i < max - 1) { vals += ', '; }
        }

        result.properties['Pre-selected'] = vals;   
      }

      this.mixpanel(result);
    },

    trackSelect: function() {
      var that = this,
          origVal = this.$el.find(':selected').text(),

          result = {
            eventName: this.setName(),
            properties: {
              'Time Sent': this.getTimeStamp(),
              'Changed To': 'No Change: ' +  origVal.replace(/\s+/g, ' ') // This is default
            }
          },

          action = function() {
            var newVal = that.$el.find(':selected').text();
            if (origVal !== newVal) { 
              result.properties['Changed To'] = newVal.replace(/\s+/g, ' '); // Did they choose a new option?
            }
            that.mixpanel(result);
          };

      // Record the state of their action onblur
      this.$el.bind('blur', action);
    },

    trackCheckbox: function(e) {
      var box = e.target,
          which = box.checked ? 'checked' : 'unchecked',
          result = {
            eventName: this.setName(),
            properties: {
              'Time Sent': this.getTimeStamp(),
              'Action': $(box).val() + ' was ' + which
            }
          };

      this.mixpanel(result);
    },

    trackRadio: function(e) {
      var result = {
            eventName: this.setName(),
            properties: {
              'Time Sent': this.getTimeStamp(),
              'Changed To': $(e.target).val()
            }
          };
      this.mixpanel(result);
    },

    mixpanel: function(result) {
      // The mixpanel track event method
      mixpanel.track(result.eventName, result.properties);
    },

    init: function() {
      var $el = this.$el,
          that = this;

      // Here we check for a callback function, if one exists, we pass it 'this' + the selector and then defer
      if (typeof this.options.callback === 'function') {
        this.options.callback(this, this.$el);
        return;
      }

      if ($el.is('body')) { this.trackArrival(this.options.checkVal); }
      else if ($el.is(':checkbox')) {
        $el.click(function(e) {
          that.trackCheckbox(e);
        });
      }
      else if ($el.is(':radio')) {
        $el.click(function(e) {
          that.trackRadio(e);
        });
      }
      else if ($el.is('select')) { this.trackSelect(); }
      else { 
        $el.click(function() { 
          that.basicReport(); 
        }); 
      }
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName, new TrackEvent(this, options));
      }
    });
  };

}(jQuery, window, document));
