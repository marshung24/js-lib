// IIFE 立即執行函式
(function(window, document, $, Nueip, undefined) {
  $(document).ready(function() {
    // init this page
    var fAtt = new fullAttendance();
  });

  /**
   * 保險異動紀錄查詢 - Javascript物件
   */
  var fullAttendance = function(options) {
    /**
     * =============== 物件屬性設定 ===============
     */
    "use strict";
    var self = this;
    var options = options || {};
    var ajaxUrls = {
            'record' : '/tw_ins_record/ajaxRecord',
            'export' : '/tw_ins_record/recordExport'
    };
    // 記錄最後一次處理的資料 - 給下次取得異動前資料 - 因資料是有序的 start_date > u_sn > s_sn
    var cache4Prev = {};
    // 記錄AJAX查詢資料 - 重建datatables用
    var ajaxResData;

    /**
     * =============== 屬性設定 ===============
     */

    var $rule = $('.rule-block'), $factor = $('.factor-block');

    /**
     * ***************** 物件必要函式 ****************
     */

    /**
     * 建構子
     */
    var _construct = function() {
      console.log('_construct');

      _initialize();
    };

    /**
     * 解構子
     */
    var _destruct = function() {

    };

    /**
     * 初始化
     */
    var _initialize = function() {
      console.log('_initialize');

      /**
       * 事件綁定
       */
      _evenBind();

    };

    /**
     * 事件綁定
     */
    var _evenBind = function() {
      console.log('_evenBind');

      /**
       * 事件 -增加規則
       */
      $('div.factor-block').on('click', 'div.btn.rule', _addRule);

      /**
       * 事件 - 清除規則
       */
      $('button.clearRule').on('click', _clearRule);
    };

    /**
     * ***************** 功能函式 ****************
     */

    /**
     * ***************** 事件函式 ****************
     */

    /**
     * 事件 - 送出規則
     */
    var submitRule = function(e) {

    }

    /**
     * 事件 - 清除規則
     */
    var _clearRule = function(e) {
      $rule.children().remove();
    }

    /**
     * 事件 - 增加規則
     */
    var _addRule = function(e) {
      console.log('_addRule');
      // 參數
      var $this = $(this);
      var data = $this.data();
      var ruleType = data.type;
      var ruleName = data.name;
      var $container = $rule.find('.rule-group').last();

      // container處理
      switch (ruleType) {
        case 'time':
          break;
        case 'process-type':
          break;
        case 'then':
          break;
        case 'subject':
        case 'compare':
        case 'unit':
        case 'unit-group':
          break;
        case 'multi-condition':
          break;
      }

      if (ruleType == 'time') {
        // 時間區間，是規則串開始
        $container = _containerBuilder();
      } else {
        // 其他
        if ($container.length === 0) {
          // 錯誤
          console.log('規則必需從 時間區間 開始 !');
          rustaMsgBox('fail', '', '規則必需從 時間區間 開始 !');
          return false;
        }
      }

      // 複制
      var $tmpObj = $this.clone(false).appendTo($container.find('.blk-' + ruleType));
      // 綁定規則編輯事件
      _editRuleBind($tmpObj, ruleType);
    }

    /**
     * ***************** 私有函式-增加規則 ****************
     */
    
    /**
     * 增加規則 - 時間
     */
    var _addTime = function() {
      
    }
    
    /**
     * 增加規則 - 標的
     */
    var _addSubject = function() {

    }
    
    /**
     * 增加規則 - 條件
     */
    var _addCompare = function() {

    }
    
    /**
     * 增加規則 - 處理劃分
     */
    var _addUnitGroup = function() {

    }
    
    /**
     * 增加規則 - 處理方式
     */
    var _addProcessType = function() {

    }
    
    /**
     * 增加規則 - 後續動作
     */
    var _addThen = function() {

    }
    
    /**
     * ***************** 私有函式-規則編輯事件 ****************
     */

    /**
     * 綁定規則編輯事件
     */
    var _editRuleBind = function($obj, ruleType) {
      console.log('_editRuleBind');
      switch (ruleType) {
        case 'time':
          _changeTime($obj);
          break;
        case 'process-type':
          break;
        case 'then':
          break;
        case 'subject':
          _changeSubject($obj);
          break;
        case 'compare':
          break;
        case 'unit':
          break;
        case 'unit-group':
          break;
        case 'multi-condition':
          break;
      }
    }

    /**
     * 變更時間
     */
    var _changeTime = function($obj) {
      console.log('_changeTime');

      // 變更時間popover
      app.popoverButton($obj, {
              schema : [ {
                      value : 'salaryTime',
                      text : '計薪區間',
                      style : 'btn-primary btn-sm'
              }, {
                      value : 'salaryHalf1',
                      text : '計薪起日~N日',
                      style : 'btn-primary btn-sm'
              }, {
                      value : 'salaryHalf2',
                      text : 'N+1日~計薪訖日',
                      style : 'btn-primary btn-sm'
              }, {
                      value : 'quarter',
                      text : '本季',
                      style : 'btn-primary btn-sm'
              } ],
              callback : function(value, data, parameter) {
                // 變更內容
                parameter.$els.text(data.text).attr('data-name', value).data('name', value);
              }
      });
    }

    /**
     * 變更標的
     */
    var _changeSubject = function($obj) {
      console.log('_changeSubject');

      // 變更標的popover
      app.popoverButton($obj, {
              schema : [ {
                      value : 'late',
                      text : '遲到',
                      style : 'btn-primary btn-sm'
              }, {
                      value : 'leaveEarly',
                      text : '早退',
                      style : 'btn-primary btn-sm'
              }, {
                      value : 'missPunch',
                      text : '缺卡',
                      style : 'btn-primary btn-sm'
              }, {
                      value : 'punchCorrection',
                      text : '補卡',
                      style : 'btn-primary btn-sm'
              }, {
                      value : 'absent',
                      text : '曠職',
                      style : 'btn-primary btn-sm'
              }, {
                      value : 'leave',
                      text : '請假',
                      style : 'btn-primary btn-sm'
              }, {
                      value : 'delete',
                      text : '刪除',
                      style : 'btn-danger btn-sm'
              } ],
              callback : function(value, data, parameter) {
                if (value == 'delete') {
                  // 刪除
                  parameter.$els.remove();
                } else {
                  // 變更內容
                  parameter.$els.text(data.text).attr('data-name', value).data('name', value);
                }
              }
      });
    }

    /**
     * 規則容器建構函式
     */
    var _containerBuilder = function() {
      var $condi, $ctn = $('<div class="col-sm-12 rule-group"></div>');
      // Controll
      _controllBuilder($ctn).appendTo($ctn);
      // Time Range
      $('<span class="blk-time"></span>').appendTo($ctn);
      // subject
      $('<span class="blk-subject"></span>').appendTo($ctn);
      // Condition
      $condi = _conditionBuilder($ctn).appendTo($ctn);
      // Per unit group
      $('<span class="blk-unit-group"></span>').appendTo($condi);
      // Doing
      $('<span class="blk-process-type"></span>').appendTo($ctn);
      // Then
      $('<span class="blk-then"></span>').appendTo($ctn);

      // Append to rule block
      $ctn.appendTo($rule);
      
      return $ctn;
    }

    /**
     * 控制按鈕建構函式
     */
    var _controllBuilder = function($ctn) {
      var $ctl = $('<span class="blk-controll"></span>');
      var $btnDel;

      // Button
      $('<i class="fa fa-play-circle font-size_16 Link padding-left-5 padding-right-5"></i>').appendTo($ctl);
      $btnDel = $('<i class="fa fa-trash font-size_16 color_red Link padding-left-5 padding-right-5 deleteBtn"></i>').appendTo($ctl);
      $('<i class="glyphicon glyphicon-arrow-up color_green font_size_12 Link padding-left-5 padding-right-5 upBtn"></i>').appendTo($ctl);
      $('<i class="glyphicon glyphicon-arrow-down color_green font_size_12 Link padding-left-5 padding-right-5 downBtn"></i>').appendTo($ctl);

      // 事件 - 規則容器刪除
      app.popoverButton($btnDel, {
              title : lang.v111 + '?',
              schema : [ {
                      value : 'yes',
                      text : '是',
                      style : 'btn-primary'
              }, {
                      value : 'no',
                      text : '否',
                      style : 'btn-danger'
              } ],
              callback : function(value, data) {
                if (value == 'yes') {
                  $ctn && $ctn.remove();
                }
              }
      });

      return $ctl;
    }

    /**
     * 條件容器建構函發
     */
    var _conditionBuilder = function() {
      var $condi = $('<span class="blk-condition"></span>');

      // Condition content
      $('<span class="blk-multi-condition"></span>').appendTo($condi);
      $('<span class="blk-compare"></span>').appendTo($condi);
      $('<span class="blk-unit"></span>').appendTo($condi);

      return $condi;
    }

    /**
     * 按鈕狀態判定
     * 
     * 依照按下的規則歷程，設定按鈕可按狀態
     */

    /**
     * ***************** 執行建構子 ****************
     */
    _construct(options);
  }
}(window, document, $, Nueip));