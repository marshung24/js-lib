/**
 * Popover Button - Bootstarp popover helper
 * 
 * Build buttons through the bootstrap popover, and provide callback function when button on click<br>
 * 
 * note: <br>
 * 1. Please set the extra parameters for the callback on $el.data('parameter')<br>
 * 2. callback argument: callback($buttonValue, $extraData);<br>
 * 3. Callback use case is defined in the parameter: options.callbackOn <br>
 * 4. Namespace support: $.marshung, namespace, app<br>
 * ex: <br>
 * a. $.marshung.popoverButton(els, options), <br>
 * b. namespace.popoverButton(els, options), <br>
 * c. app.popoverButton(els, options) <br>
 * 
 * @author Mars Hung <tfaredxj@gmail.com>
 * 
 * @see <a href="https://github.com/marshung24/js-lib">marshung24/js-lib</a>
 * 
 * @depandance jQuery, bootstrap::popover
 * 
 * @version 0.1.1
 * 
 * @example 1. <br>
 *          app.popoverButton($('div.factor-block div.btn.rule')); <br>
 *          app.popoverButton('div.factor-block div.btn.rule'); <br>
 *          namespace.popoverButton('div.factor-block div.btn.rule'); <br>
 *          $.marshung.popoverButton('div.factor-block div.btn.rule'); <br>
 * 
 * @example 2. <br>
 *          var els = $('div.factor-block div.btn.rule'); <br>
 *          var options = { schema: [ { value : 'yes1', text : '是2', style : 'btn-primary' }, {
 *          value : 'no2', text : '否2', style : 'btn-danger' } ] }; <br>
 *          app.popoverButton(els, options);
 * 
 * @param string|object
 *          els Selector or jQueryObject
 * @param object
 *          options options
 * @returns
 */
(function(window, $, undefined) {
  "use strict";

  var document = window.document;

  // Class Name
  var name = 'popoverButton';

  // Version
  var version = '0.1.1';

  // Default options
  var defaults = {
          title : '',
          placement : 'top',
          // If schema not exists, use the content data.
          content : '',
          // If there is a schema, construct the content from the schema
          schema : [],
          // Callback called at: all, $specificButtonValue
          callbackOn : 'all',
          // Callback function
          callback : function(value, data, parameter) {
            console.log(this);
            console.log(value);
            console.log(data);
            console.log(parameter);
          },
          // Show popover after initialized
          showAfterInit : false,
          // Unique tag, the same tag popover will not show on the same time
          uniqTag : 'uniqTag4pop',
          maxWidth : '90%'
  };

  // Fixed Options - Cannot modify
  var fixedOptions = {
          toggle : 'popover',
          container : 'body',
          trigger : 'click',
          html : true,
  };

  /**
   * ========== Object Build ==========
   */

  // Define a local copy of Object
  var obj = function(els, options) {
    return new obj.fn.init(els, options);
  };

  obj.fn = obj.prototype = {
          // The current version
          version : version,

          // Object Name
          name : name,

          // Default options
          defaults : defaults,

          // Fixed options
          fixedOptions : fixedOptions,

          // List of shown object - for close
          popShownList : {},
  };

  // Object
  obj.fn.init = function(els, options) {
    /**
     * =============== Object Argument Setting ===============
     */
    "use strict";
    var self = this;
    var argu = {
            'randCode' : '',
            'fixedCode' : '',
            '$els' : '',
            'options' : '',
    };

    /**
     * =============== Object Function ===============
     */

    /**
     * Constructor
     */
    var _construct = function(els, options) {
      // Initialize
      var res = _initialize(els, options);

      if (res) {
        // Event Binding
        _evenBind();
      }
    };

    /**
     * Destructor
     */
    var _destruct = function() {

    };

    /**
     * Initialize
     */
    var _initialize = function(els, options) {
      var randCode, fixedCode = 'popInit_Y29kZWJ5bWFycy5odW5n', $els = $(els);

      // Check - if inited, return
      if ($els.data('argu_' + fixedCode) && $els.data('options_' + fixedCode)) {
        console.log('Already Initialized !');
        return false;
      }

      // Argument
      argu.randCode = randCode = String.prototype.concat(Date.now(), Math.random()).replace('.', '');
      argu.fixedCode = fixedCode;
      argu.$els = $els;
      // Merge Options
      options = options || {};
      argu.options = options = $.extend({}, self.defaults, options, self.fixedOptions);

      options.callback = typeof (options.callback) == 'function' ? options.callback : function(value, data, parameter) {
        console.log(this);
        console.log(value);
        console.log(data);
        console.log(parameter);
      };

      // Button Builder - schema exists and have data
      if ($.isArray(options.schema) && options.schema.length > 0) {
        options.content = function() {
          return self.buttonBuilder(options.schema, randCode);
        };
      }

      // Record All Argument
      $els.data('argu_' + fixedCode, argu);
      // Record all parameters
      $els.data('options_' + fixedCode, options);
      // Record unique Tag
      $els.data('uniqTag_' + fixedCode, options.uniqTag);
      // Record fixedCode
      $els.data('fixedCode', fixedCode);
      // Add unique tag class
      $els.addClass(options.uniqTag);

      // Initialize
      $els.popover(options);

      // Change Max Width
      $els.data("bs.popover").tip().css("maxWidth", options.maxWidth);

      // Show after inited
      if (options.showAfterInit) {
        $els.last().popover('show');
      }

      return true;
    };

    /**
     * Event Binding
     */
    var _evenBind = function() {
      var $els = argu.$els;

      if (typeof ($els) == 'object') {
        // Event - Popover shown
        $els.on('shown.bs.popover', function() {
          var $el = $(this);
          self.popoverShown.call($el, argu);
        });

        // Event - Popover shown doing on schedule
        $('body').on('click', function() {
          self.popoverDoClose(null);
        });
      }
    };

    /**
     * =============== Run Constructor ===============
     */
    _construct(els, options);
  }

  /**
   * Event - Popover shown
   * 
   * Button Event Binding after each display(Because hide is cut off)
   */
  obj.fn.popoverShown = function(argu) {
    var $el = $(this);
    var randCode = argu.randCode;
    var fixedCode = argu.fixedCode;

    setTimeout(function() {
      obj.popoverDoClose($el);
    }, 10);

    // bind callback
    $('div.popover-content').find('.btn-anchor-' + randCode).each(function(i, e) {
      var $btn = $(this);
      if ($btn.data('isSetClick_' + fixedCode)) {
        return true;
      }

      $btn.data('isSetClick_' + fixedCode, true);

      $btn.on('click', function() {
        var btnValue = $btn.data('value');
        var data = $btn.data('data');
        var parameter = argu;
        var options = $el.data('options_' + fixedCode);

        // run callback - by callbackOn
        if (options.callbackOn == 'all') {
          setTimeout(function() {
            options.callback.call($btn, btnValue, data, parameter);
          }, 10);
        } else if (options.callbackOn == btnValue) {
          setTimeout(function() {
            options.callback.call($btn, btnValue, data, parameter);
          }, 10);
        }

        // Close popover
        $el.popover('hide');
      });
    });
  }

  /**
   * Event - Popover shown doing on schedule
   * 
   * @param $shownObj
   *          Popover event owner
   */
  obj.fn.popoverDoClose = function($shownObj) {
    if ($shownObj == null) {
      // Close All popover
      $.each(obj.popShownList, function(i, e) {
        e.popover('hide');
      });
      obj.popShownList = {};
    } else {
      // Close the same uniqTag popover
      var fixedCode = $shownObj.data('fixedCode');
      var uniqTag = $shownObj.data('uniqTag_' + fixedCode);

      if (obj.popShownList[uniqTag] != null && !obj.popShownList[uniqTag].is($shownObj)) {
        obj.popShownList[uniqTag].popover('hide');
      }

      obj.popShownList[uniqTag] = $shownObj;
    }
  }

  /**
   * Button Builder
   * 
   * Build button from schema
   * 
   * Data structure: <br>
   * schema = [ {value:'',text:'',style:''}, {value:'',text:'',style:''} ];
   * 
   * @param object
   *          schema
   * @param string
   *          randCode
   * @return
   */
  obj.fn.buttonBuilder = function(schema, randCode) {
    var len = schema.length, $opt = $('<div></div>'), $btn;

    try {
      $.each(schema, function(i, data) {
        var marginLeft = (i + 1) == len ? '' : 'margin-right-5';
        $btn = $(
                '<input type="button" class="' + marginLeft + ' ' + data.style + ' btn btn-anchor-' + randCode
                        + '" style="width: auto;" data-value="' + data.value + '" value="' + data.text + '">').appendTo($opt);
        $btn.data('data', data);
      });
    } catch (e) {

    }

    return $opt;
  }

  // Give the init function the Object prototype for later instantiation
  obj.fn.init.prototype = obj.prototype;

  // Alias prototype function
  $.extend(obj, obj.fn);

  // Namespace
  $.marshung = typeof ($.marshung) == 'object' ? $.marshung : {};
  window['namespace'] = typeof (window['namespace']) == 'object' ? window['namespace'] : {};
  window['app'] = typeof (window['app']) == 'object' ? window['app'] : {};

  /**
   * Object for Namespace Alias
   */
  $.marshung.popoverButton = window['namespace'].popoverButton = window['app'].popoverButton = obj;
}(window, $));
