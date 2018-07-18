/**
 * Popover Button - Bootstarp popover helper
 * 
 * Build buttons through the bootstrap popover, and provide callback function when button on click<br>
 * 
 * note: <br>
 * 1. Please set the extra parameters for the callback on $el.data('parameter')<br>
 * 2. callback argument: callback($buttonValue, $extraData);<br>
 * 3. Callback use case is defined in the parameter: options['callbackOn']<br>
 * 4. Namespace support: $.marshung, namespace, app<br>
 * ex: <br>
 * a. $.marshung.popoverButton(), <br>
 * b. namespace.popoverButton(), <br>
 * c. app.popoverButton() <br>
 * 
 * @example <br>
 *          app.popoverButton.init('div.factor-block div.btn.rule');
 * 
 * @author Mars Hung <tfaredxj@gmail.com>
 * @version 1.0.0
 * 
 * @depandance bootstrap::popover
 * 
 * @param string
 *          el target object/class
 * @param function
 *          callback callback function
 * @param object
 *          options options
 * @param string
 *          uniqTag Unique tag, the same tag popover will not show on the same time
 * @returns
 */
(function(window, document, $, undefined) {
  // Namespace
  $.marshung = typeof ($.marshung) == 'object' ? $.marshung : {};
  window['namespace'] = typeof (window['namespace']) == 'object' ? $.marshung : {};
  window['app'] = typeof (window['app']) == 'object' ? $.marshung : {};

  // Object
  var popoverButton = function() {
    /**
     * =============== Object Argument Setting ===============
     */
    "use strict";
    var self = this;
    var argu = {
            'randCode' : '',
            'fixedCode' : '',
            '$el' : '',
            'callback' : '',
            'options' : '',
            'uniqTag' : '',
    };

    // Default options
    var defaults = {
            title : '',
            toggle : 'popover',
            container : 'body',
            placement : 'top',
            trigger : 'click',
            html : true,
            content : '',
            // callback called at: all, $specificButtonValue
            callbackOn : 'all'
    };

    /**
     * =============== Object Function ===============
     */

    /**
     * Initialize
     */
    self.init = function(el, callback, options, uniqTag) {
      var randCode, fixedCode, $el = $(el);

      // Check - if inited, return
      if ($el.data('fixedCode') && $el.data($el.data('fixedCode'))) {
        return true;
      }

      // Argument
      argu.randCode = randCode = String.prototype.concat(Date.now(), Math.random()).replace('.', '');
      argu.fixedCode = fixedCode = 'popInit_Y29kZWJ5bWFycy5odW5n';
      argu.$el = $el;
      argu.callback = callback = typeof (callback) == 'function' ? callback : function() {
        console.log($(this));
      };
      argu.options = options = options || {};
      argu.uniqTag = uniqTag = uniqTag || 'uniqTag4pop';

      // Merge Options
      options = $.extend(defaults, options);

      options['content'] = "<input type='button' class='btn btn-primary margin-right-5 btn-xl answer_" + randCode
              + "' style='width: auto;' data-answer='yes' value='" + lang.v114 + "'>" + "<input type='button' class='btn btn-danger btn-xl answer_"
              + randCode + "' style='width: auto;' data-answer='no' value='" + lang.v115 + "'>"

      // Record Random Code
      $el.data('randCode', randCode);
      // Record Fixed Code
      $el.data('fixedCode', fixedCode);
      // Record init status
      $el.data(fixedCode, true);
      // Record all parameters
      $el.data('options', options);
      // Record unique Tag
      $el.data('uniqTag', uniqTag);
      // Add unique tag class
      $el.addClass(uniqTag);

      // Initialize
      $el.popover(options);
      // Show when inited
      $el.popover('show');

      // Event Binding
      _evenBind();
    };

    /**
     * Event Binding
     */
    var _evenBind = function() {
      var $el = argu.$el;

      // Button Event Binding - callback - Bind after each display(Because hide is cut off)
      $el.on('shown.bs.popover', _popoverShown);
      $('body').on('click', function() {
        _popoverShownSchedule(null);
      });
    };

    /**
     * =============== Behavior Function ===============
     */

    /**
     * =============== Public Function ===============
     */

    /**
     * =============== Event Function ===============
     */

    /**
     * Event - Popover shown
     */
    var _popoverShown = function() {
      var $e = $(this);
      var $el = argu.$el;
      var randCode = argu.randCode;
      var callback = argu.callback;

      setTimeout(function() {
        _popoverShownSchedule($e);
      }, 10);

      // bind callback
      $('div.popover-content').find('.answer_' + randCode).each(function(i, e) {
        var $each = $(this);
        if ($each.data('isSetClick')) {
          return true;
        }

        $each.data('isSetClick', true);

        $each.on('click', function() {
          var isYes = $e.data('answer') == 'yes';
          var data = $el.data('confirm');
          var options = $el.data('options');

          // run callback - by callbackOn
          if (options['callbackOn'] == 'all') {
            callback.call($e, isYes, data);
          } else if (options['callbackOn'] == 'yes' && isYes) {
            callback.call($e, isYes, data);
          } else if (options['callbackOn'] == 'no' && !isYes) {
            callback.call($e, isYes, data);
          }

          // Close popover
          $el.popover('hide');
        });
      });
    }

    /**
     * Event - Popover shown doing on schedule
     */
    var _popoverShownSchedule = function($shown) {
      if ($shown == null) {
        $.each(self.popShownList, function(i, e) {
          e.popover('hide');
        });
        self.popShownList = {};
      } else {
        var uniqTag = $shown.data('uniqTag');

        if (self.popShownList[uniqTag] != null && !self.popShownList[uniqTag].is($shown)) {
          self.popShownList[uniqTag].popover('hide');
        }

        self.popShownList[uniqTag] = $shown;
      }
    }

    /**
     * =============== Private Function ===============
     */

    // // Event - Turn off non-target popover
    // if (window[fixedCode] == null) {
    // // Flag
    // window[fixedCode] = fixedCode;
    //
    // // Target popover check
    // $('body').on('click', function(e) {
    // $('.' + uniqTag).each(function() {
    // var $e = $(this);
    //
    // // hide any open popovers when the anywhere else in the body is clicked
    // if (!$e.is(e.target) && $e.has(e.target).length === 0 && $('.popover').has(e.target).length
    // === 0) {
    // $e.popover('hide');
    // }
    // });
    // });
    // }
  }

  /**
   * Static Argument & Function
   */

  // List of shown object - for close
  popoverButton.prototype.popShownList = {};

  /**
   * Object for namespace alias
   */
  $.marshung.popoverButton = window['namespace'].popoverButton = window['app'].popoverButton = new popoverButton();
}(window, document, $));
