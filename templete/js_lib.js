/**
 * Template
 * 
 * @author Mars Hung <tfaredxj@gmail.com>
 * @see <a href="https://github.com/marshung24/js-lib">marshung24/js-lib</a>
 * @depandance jQuery
 * @version
 * @example
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

  // Fixed identification code
  var fixedCode = 'init_{fixedCode}';

  // jqXHR pool
  window.jqXHRs = typeof (window.jqXHRs) != 'undefined' ? window.jqXHRs : {};
  window.jqXHRs[name] = typeof (window.jqXHRs[name]) != 'undefined' ? window.jqXHRs[name] : {};
  var jqXHRs = window.jqXHRs[name];

  // Default options
  var defaults = {
    // Callback called at: all, $specificButtonValue
    callbackOn : 'all',
    // Callback function
    callback : function(value, data, parameter) {
    },
    // Unique tag, the same tag popover will not show on the same time
    uniqTag : 'uniqTag4' + name,
    randCode : ''
  };

  // Fixed Options - Cannot modify
  var fixedOptions = {};

  /**
   * ========== Object Build ==========
   */

  // Define a local copy of Object
  var obj = function(el, options) {
    var $el = $(el), argu = $el.data('argu_' + fixedCode);

    // Check - If there is no target, return
    if (!$el.length)
      return false;

    // Check - if inited, return instance ; if not inited, init it
    return (argu && argu.self) ? argu.self : new obj.fn.init(el, options);
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
     * =============== Object Property Setting ===============
     */
    var self = this;
    var argu = {
      'randCode' : '',
      'fixedCode' : fixedCode,
      '$el' : '',
      'options' : '',
      'self' : self,
    };

    // Deferred && promise
    self.defer = $.Deferred();
    self.defer.promise(self);

    // self.publicProperty = 'public';

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
     * Get Property
     */
    self.getProperty = function(property) {
      if (eval('typeof ' + property) != "undefined") {
        return eval(property);
      }
      return undefined;
    }

    /**
     * Parameter Initialize
     */
    var _paramIinit = function(el, options) {
      var randCode, $el = $(el);

      // Merge Options
      options = options || {};
      options = $.extend(true, {}, self.defaults, options, self.fixedOptions);

      // Property
      if (options.randCode) {
        argu.randCode = randCode = options.randCode;
      } else {
        argu.randCode = randCode = options.randCode = String.prototype.concat(Date.now(), Math.random()).replace('.', '');
      }
      argu.$el = $el;
      argu.options = options;
      argu.self = self;

      options.callback = typeof (options.callback) == 'function' ? options.callback : function(value, data, parameter) {
      };

      // Record All Property
      $els.data('argu_' + fixedCode, argu);
      // Record all parameters
      $els.data('options_' + fixedCode, options);
      // Record unique Tag
      $els.data('uniqTag_' + fixedCode, options.uniqTag);
      // Add unique tag class
      $els.addClass(options.uniqTag);

      // preventDefault && stopPropagation
      $els.on('click.' + options.uniqTag, function(e) {
        // e.preventDefault();
        e.stopPropagation();
      });

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
