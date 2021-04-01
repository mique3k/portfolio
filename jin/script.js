$(document).ready(function(){
    // 実際の処理を記述します
  $(function () {
      var topBtn = $('#totop');
      topBtn.hide();
      //スクロールが500に達したらボタン表示
      $(window).scroll(function () {
          if ($(this).scrollTop() > 500) {
              topBtn.fadeIn();
          } else {
              topBtn.fadeOut();
          }
      });
      //スルスルっとスクロールでトップへもどる
      topBtn.click(function () {
          $('body,html').animate({
              scrollTop: 0
          }, 500);
          return false;
      });
  });

});
