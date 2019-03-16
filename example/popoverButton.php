<?php
include_once '../vendor/autoload.php';

?>
<!DOCTYPE HTML>

<html>
<head>
<title>popoverButton測試</title>

<!-- Bootstrap 3.3 CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
  integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
  integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

<style type="text/css">
#popoverlink {
    position: absolute;
    top: 100px;
    left: 100px;
}
</style>

</head>

<body>
  <button class="btn btn-primary delete">刪除確認1</button>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>

  <div class="form-group row form-horizontal col-sm-1">
    <button class="btn btn-primary confirm1">確認1</button>
  </div>
  <div class="form-group row form-horizontal col-sm-1">
    <button class="btn btn-primary confirm2">確認2</button>
  </div>

</body>
<!-- jquery, jquery-cookie -->
<script src="https://code.jquery.com/jquery-1.12.4.min.js"
  integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"></script>

<!-- Bootstrap 3.3 JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
  integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

<script src="../src/captureStackTrace.js"></script>
<script src="../src/popoverButton.js"></script>

<script type="text/javascript">
$(document).ready(function(){
  var options1 = { schema: [ { value : 'yes1', text : '是1', style : 'btn-primary' }, {value : 'no1', text : '否1', style : 'btn-danger' } ], callback: function () {console.log('111')} };
  app.popoverButton($('button.confirm1'), options1);
  var options2 = { schema: [ { value : 'yes2', text : '是2', style : 'btn-primary' }, {value : 'no2', text : '否2', style : 'btn-danger' } ], callback: function () {console.log('222')} };
  app.popoverButton($('button.confirm2'), options2);


  $('button.delete').on('click', function () {
    $('button.confirm1').remove();
  });
});

</script>


</html>



