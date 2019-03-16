/**
 * JavaScript gets the current line number, file name
 * 
 * @see http://www.voidcn.com/article/p-qmuvvyel-ym.html
 * 
 * @author Unknow (from network)
 * @author Mars Hung <tfaredxj@gmail.com>
 * 
 * line number: __LINE__
 * file name: __FILE__
 * Usage: console.log(__LINE__, __FILE__);
 */
(function () {
  if (Error.captureStackTrace && Object.defineProperty) {
    var global = window;
  
    // 定義__STACK__
    Object.defineProperty(global, '__STACK__', {
      get: function () {
        try {
          var old = Error.prepareStackTrace;
          Error.prepareStackTrace = function (error, stack) {
            return stack;
          };
          
          var err = new Error();
          Error.captureStackTrace(err, arguments.callee);
          Error.prepareStackTrace = old;
          return err.stack;
        } catch(e) {
          console.log(e);
        }
      }
    });
    
    // 定義__LINE__
    Object.defineProperty(global, '__LINE__', {
      get: function () {
        try {
          return __STACK__.split(/\n+/)[2].replace(/(.*)\:(\d+)\:\d+\)$/,"$2");
        } catch(e) {
          console.log(e);
        }
      }
    });
    
    // 定義__FILE__
    Object.defineProperty(global, '__FILE__', {
      get: function () {
        try {
          return __STACK__.split(/\n+/)[2].replace(/(.+)\/([^\/]+)\.js(.*)/, "$2.js");
        } catch(e) {
          console.log(e);
        }
      }
    });
  }
})();