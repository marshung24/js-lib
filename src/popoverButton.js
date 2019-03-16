/**
 * Popover Button - Bootstarp popover helper
 * 
 * Build buttons through the bootstrap popover, and provide callback function when button on click<br>
 * 
 * note: <br>
 * 1. Please set the extra parameters for the callback on $el.data('parameter')<br>
 * 2. Callback property: callback($buttonValue, $extraData);<br>
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
  var version = '0.2.0';

  // Fixed identification code
  var fixedCode = 'popInit_Y29kZWJ5bWFycy5odW5n';
  
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
    callback : function(value, data, parameter) {},
    // Show popover after initialized
    showAfterInit : false,
    // Unique tag, the same tag popover will not show on the same time
    uniqTag : 'uniqTag4pop',
    maxWidth : '90%',
    randCode : ''
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
    var $els = $(els), argu = $els.data('argu_' + fixedCode);

    // Check - If there is no target, return
    if (!$els.length)
      return false;

    // Check - if inited, return instance ; if not inited, init it
    return (argu && argu.self) ? argu.self : new obj.fn.init(els, options);
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
     * =============== Object Property Setting ===============
     */
    var self = this;
    var argu = {
      'randCode' : '',
      'fixedCode' : fixedCode,
      '$els' : '',
      'options' : '',
      'self' : self,
    };
    
    // Deferred && promise
    self.defer = $.Deferred();
    self.defer.promise(self);

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
     * Get Property
     */
    self.getProperty = function(property) {
      if (eval('typeof ' + property) != "undefined") {
        return eval(property);
      }
      return undefined;
    }
    
    /**
     * Initialize
     */
    var _initialize = function(els, options) {
      var randCode, $els = $(els);

      // Merge Options
      options = options || {};
      options = $.extend(true, {}, self.defaults, options, self.fixedOptions);
      
      // Property
      if (options.randCode) {
        argu.randCode =  randCode = options.randCode;
      } else {
        argu.randCode =  randCode = options.randCode = String.prototype.concat(Date.now(), Math.random()).replace('.', '');
      }
      argu.$els = $els;
      argu.options = options;
      argu.self = self;

      options.callback = typeof (options.callback) == 'function' ? options.callback : function(value, data, parameter) {};

      // Button Builder - schema exists and have data
      if ($.isArray(options.schema) && options.schema.length > 0) {
        options.content = function() {
          return self.buttonBuilder(options.schema, randCode);
        };
      }

      // Record All Property
      $els.data('argu_' + fixedCode, argu);
      // Record all parameters
      $els.data('options_' + fixedCode, options);
      // Record unique Tag
      $els.data('uniqTag_' + fixedCode, options.uniqTag);
      // Add unique tag class
      $els.addClass(options.uniqTag);

      // preventDefault && stopPropagation
      $els.on('click.' + options.uniqTag, function(e){
        //e.preventDefault();
        e.stopPropagation();
      });

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
      var $els = argu.$els, uniqTag = argu.options.uniqTag;

      if (typeof ($els) == 'object') {
        // Event - Popover shown
        $els.off('shown.bs.popover');
        $els.on('shown.bs.popover', function() {
          var $el = $(this);
          self.popoverShown.call($el, argu);
        });

        // Event - Popover shown doing on schedule
        $('body').off('click.popoverButton');
        $('body').on('click.popoverButton', function(e) {
          var $e = $(e.target), $ruleEl = $e.closest('.' + uniqTag);
          var $pBody = $('div.popover-content').parent();
          if (! $els.is($ruleEl) && ! $pBody.has($e).length) {
            self.popoverDoClose(null);
          }
        });
      }
    };

    /**
     * =============== Run Constructor ===============
     */
    _construct(els, options);
  }

  /**
   * Destroy popoverButton
   */
  obj.fn.destroy = function() {
    var argu = this.getProperty('argu');
    var $els = $(argu.$els), uniqTag = argu.options.uniqTag;;
    $els.off('hidden.bs.popover');
    
    setTimeout(function(){
      if ($els.data("bs.popover")) {
        
        $els.removeData(['argu_' + fixedCode, 'options_' + fixedCode, 'uniqTag_' + fixedCode]);
        $els.removeClass(uniqTag);
        $els.off('click.' + uniqTag);
        
        $els.popover('destroy');
      }
    }, 100);
  }
  
  /**
   * Event - Popover shown
   * 
   * Button Event Binding after each display(Because hide is cut off)
   */
  obj.fn.popoverShown = function(argu) {
    var $el = $(this);
    var randCode = argu.randCode;
    var defer = argu.self.defer;

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
            // Resolve the deferred
            defer.resolve($btn, btnValue, data, parameter);
          }, 10);
        } else if (options.callbackOn == btnValue) {
          setTimeout(function() {
            options.callback.call($btn, btnValue, data, parameter);
            // Resolve the deferred
            defer.resolve($btn, btnValue, data, parameter);
          }, 10);
        }

        // Close popover
        $el.popover('hide');
        
        // Bug Solution: Show need twice click when use popover('hide') to close
        obj.bug4TwiceClick($el);
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
      $.each(obj.popShownList, function(i, $el) {
        $el.popover('hide');
        // Bug Solution: Show need twice click when use popover('hide') to close
        obj.bug4TwiceClick($el);
      });
      obj.popShownList = {};
    } else {
      // Close the same uniqTag popover
      var uniqTag = $shownObj.data('uniqTag_' + fixedCode);
      
      // Close target when not self and had the same uniqTag
      if (obj.popShownList[uniqTag] != null && !obj.popShownList[uniqTag].is($shownObj)) {
        obj.popShownList[uniqTag].popover('hide');
        // Bug Solution: Show need twice click when use popover('hide') to close
        obj.bug4TwiceClick(obj.popShownList[uniqTag]);
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
        var margin = (i == 0) ? '' : 'margin-left:5px;';
        $btn = $('<input type="button" class="' + data.style + ' btn btn-anchor-' + randCode
                + '" style="width:auto;' + margin + '" data-value="' + data.value + '" value="' + data.text + '">').appendTo($opt);
        $btn.data('data', data);
      });
    } catch (e) {

    }

    return $opt;
  }
  
  /**
   * Bug Solution: Show need twice click when use popover('hide') to close
   */
  obj.fn.bug4TwiceClick = function ($el) {
    if ($el.data("bs.popover") && $el.data("bs.popover").inState) {
      // Bootstrap 3
      $el.data("bs.popover").inState.click = false;
    } else if ($el.data("bs.popover") && $el.data("bs.popover")._activeTrigger) {
      // Bootstrap 4
      $el.data("bs.popover")._activeTrigger.click = false;
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
