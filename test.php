<style>
<!--
.rule-block .btn, factor-block .btn {
    margin-left: 2px !important;
    margin-right: 2px !important;
}
-->
</style>

<div>
  <div class="row">
    <button class="btn btn-success pull-right addBtn submitRule">送出</button>
    <button class="btn btn-danger pull-right addBtn clearRule">清除</button>
  </div>
  <div class="rule-block row"></div>
  <div class="row">
    <hr>
  </div>
  <div class="factor-block">
    <div class="time row">
      <label class="col-sm-2">時間區間</label>
      <div class="col-sm-10">
        <div class="btn btn-primary btn-sm rule time" data-type="time" data-name="salaryTime">計薪區間</div>
        <div class="btn btn-primary btn-sm rule time" data-type="time" data-name="salaryHalf1">計薪起日~N日</div>
        <div class="btn btn-primary btn-sm rule time" data-type="time" data-name="salaryHalf2">N+1日~計薪訖日</div>
        <div class="btn btn-primary btn-sm rule time" data-type="time" data-name="quarter">本季</div>
      </div>
    </div>
    <div class="subject row">
      <label class="col-sm-2">標的</label>
      <div class="col-sm-10">
        <div class="btn btn-primary btn-sm rule subject" data-type="subject" data-name="late">遲到</div>
        <div class="btn btn-primary btn-sm rule subject" data-type="subject" data-name="leaveEarly">早退</div>
        <div class="btn btn-primary btn-sm rule subject" data-type="subject" data-name="missPunch">缺卡</div>
        <div class="btn btn-primary btn-sm rule subject" data-type="subject" data-name="punchCorrection">補卡</div>
        <div class="btn btn-primary btn-sm rule subject" data-type="subject" data-name="absent">曠職</div>
        <div class="btn btn-primary btn-sm rule subject" data-type="subject" data-name="leave">請假</div>
      </div>
    </div>
    <div class="compare row">
      <label class="col-sm-2">條件</label>
      <div class="col-sm-10">
        <div class="btn btn-primary btn-sm rule compare" data-type="compare" data-name="over">超過</div>
      </div>
    </div>
<!--     <div class="unit row"> -->
<!--       <label class="col-sm-2">處理單位</label> -->
<!--       <div class="col-sm-10"> -->
<!--         <div class="btn btn-primary btn-sm rule unit" data-type="unit" data-name="minute">分鐘</div> -->
<!--         <div class="btn btn-primary btn-sm rule unit" data-type="unit" data-name="hour">小時</div> -->
<!--         <div class="btn btn-primary btn-sm rule unit" data-type="unit" data-name="round">次</div> -->
<!--       </div> -->
<!--     </div> -->
    <div class="unit-group row">
      <label class="col-sm-2">處理劃分</label>
      <div class="col-sm-10">
        <div class="btn btn-primary btn-sm rule unit-group" data-type="unit-group" data-name="per">每</div>
      </div>
    </div>
<!--     <div class="multi-condition row"> -->
<!--       <label class="col-sm-2">多條件處理</label> -->
<!--       <div class="col-sm-10"> -->
<!--         <div class="btn btn-primary btn-sm rule multi-condition" data-type="multi-condition" data-name="and">且</div> -->
<!--         <div class="btn btn-primary btn-sm rule multi-condition" data-type="multi-condition" data-name="or">或</div> -->
<!--       </div> -->
<!--     </div> -->
    <div class="process-type row">
      <label class="col-sm-2">處理方式</label>
      <div class="col-sm-10">
        <div class="btn btn-primary btn-sm rule process-type" data-type="process-type" data-name="deductMoney">扣錢</div>
        <div class="btn btn-primary btn-sm rule process-type" data-type="process-type" data-name="count">記點</div>
        <div class="btn btn-primary btn-sm rule process-type" data-type="process-type" data-name="notPay">不發放</div>
        <div class="btn btn-primary btn-sm rule process-type" data-type="process-type" data-name="notProcess">不處理</div>
      </div>
    </div>
    <div class="then row">
      <label class="col-sm-2">後續動作</label>
      <div class="col-sm-10">
        <div class="btn btn-primary btn-sm rule then" data-type="then" data-name="break">跳出</div>
        <div class="btn btn-primary btn-sm rule then" data-type="then" data-name="continue">繼續</div>
      </div>
    </div>
  </div>
</div>
<script src="<?= JS_INNER ?>popoverButton.js?v=<?= $this->config->item('asset_version'); ?>"></script>
