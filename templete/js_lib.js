/**
 * Template
 * 
 * 
 * @author Mars Hung <tfaredxj@gmail.com>
 * 
 * @see <a href="https://github.com/marshung24/js-lib">marshung24/js-lib</a>
 * 
 * @depandance jQuery
 * 
 * @version
 * 
 * @example
 * 
 * @param
 * @returns
 */
(function(window, $, undefined) {
  "use strict";

  var document = window.document;

  // Class Name
  var name = '{name}';

  // Version
  var version = '{version}';

  // jqXHR pool
  window.jqXHRs = typeof (window.jqXHRs) != 'undefined' ? window.jqXHRs : {};
  window.jqXHRs[name] = typeof (window.jqXHRs[name]) != 'undefined' ? window.jqXHRs[name] : {};
  var jqXHRs = window.jqXHRs[name];

  // Default options
  var defaults = {};

  // Fixed Options - Cannot modify
  var fixedOptions = {};

  /**
   * ========== Object Build ==========
   */

  // Define a local copy of Object
  var obj = function(el, options) {
    return new obj.fn.init(el, options);
  };

  // Object Global Parameter
  obj.fn = obj.prototype = {
          // Object Name
          name : name,

          // The current version
          version : version,

          // The current version
          jqXHRs : jqXHRs,

          // Default options
          defaults : defaults,

          // Fixed options
          fixedOptions : fixedOptions,
  };

  // Object Init
  obj.fn.init = function(el, options) {
    /**
     * =============== Object Argument Setting ===============
     */
    "use strict";
    var self = this;
    var argu = {
            'randCode' : '',
            'fixedCode' : '',
            '$el' : '',
            'options' : '',
    };

    /**
     * =============== Object Function ===============
     */

    /**
     * Constructor
     */
    var _construct = function(el, options) {
      try {
        // Parameter Initialize
        _paramIinit(el, options);

        // Initialize
        _initialize();

        // Event Binding
        _evenBind();
      } catch (err) {
        // error
        console.log(err);
      }
    };

    /**
     * Destructor
     */
    var _destruct = function() {

    };

    /**
     * Parameter Initialize
     */
    var _paramIinit = function(el, options) {
      var randCode, fixedCode = 'popInit_Y29kZWJ5bWFycy5odW5n', $el = $(el);

      // Check - if inited, return
      if ($el.data('argu_' + fixedCode) && $el.data('options_' + fixedCode)) {
        throw 'Already Initialized !';
      }

      // Argument
      argu.randCode = randCode = String.prototype.concat(Date.now(), Math.random()).replace('.', '');
      argu.fixedCode = fixedCode;
      argu.$el = $el;
      // Merge Options
      options = options || {};
      argu.options = options = $.extend({}, self.defaults, options, self.fixedOptions);
    };

    /**
     * Initialize
     */
    var _initialize = function() {
      var $el = argu.$el;
      var options = argu.options;

    }

    /**
     * Event Binding
     */
    var _evenBind = function() {
      var $el = argu.$el;

      if (typeof ($el) == 'object') {

      }
    };

    /**
     * Get Argu
     */
    self.getArgu = function(arguName) {
      arguName = arguName || null;
      var opt = null;

      if (arguName != null) {
        opt = argu[arguName] || null;
      } else {
        opt = argu;
      }

      return opt;
    }

    /**
     * =============== Run Constructor ===============
     */
    _construct(el, options);
  }

  /**
   * 初始化jqXHR
   * 
   * @param dataName
   * @returns
   */
  obj.fn.jqXhrInit = function(dataName) {
    dataName = dataName || null;

    if (dataName) {
      // 取消指定的AJAX執行
      if (obj.fn.jqXHRs[dataName] != null) {
        obj.fn.jqXHRs[dataName].abort();
        obj.fn.jqXHRs[dataName] = null;
      }
    } else {
      // 取消所有的AJAX執行
      $.each(obj.fn.jqXHRs, function(i, e) {
        e.abort();
      });
      obj.fn.jqXHRs = {};
    }
  }

  /**
   * 儲存jqXHR
   * 
   * @param dataName
   * @returns
   */
  obj.fn.jqXhrSet = function(dataName, jqXHR) {
    dataName = dataName || null;
    if (dataName) {
      // 取消指定的AJAX執行
      obj.fn.jqXhrInit(dataName);
      // 儲存jqXHR
      obj.fn.jqXHRs[dataName] = jqXHR;
    }
  }

  /**
   * 取得jqXHR
   * 
   * @param dataName
   * @returns
   */
  obj.fn.jqXhrGet = function(dataName) {
    if (obj.fn.jqXHRs[dataName] != null) {
      // 回傳jqXHR
      return obj.fn.jqXHRs[dataName];
    } else {
      // 回傳jquery deferred reject
    }
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
  $.marshung[name] = window['namespace'][name] = window['app'][name] = obj;
}(window, $));
