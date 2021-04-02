/*
----sectionの高さをウィンドウの高さに以上にする-----
*/
//let wh = $(window).height();
//$('section').each(function(){
//  if($(this).innerHeight() < wh){
//    $(this).css('height', wh + 'px');
//  } 
//});

/*
----スクロールでボタンを表示--------------
*/
const topBtn = $('#toTopBtn');
topBtn.hide();

$(window).scroll(function(){
  if($(this).scrollTop() > 500){
    topBtn.fadeIn();
  }else{
    topBtn.fadeOut();
  }
});

/*
----トップへスクロール-------------
*/
topBtn.click(function(){
  $('html, body').animate({scrollTop: 0}, 500);
  return false;
});

/*
----sns固定-------------
*/
function setSns(){
  if (window.innerWidth <= 768) {
    $('.sns').css('position', 'absolute');
    }else{
      $('.sns').css('position', '');
      $('nav').css('position', '');
  }
}
setSns();

window.addEventListener("resize", function(){
  setSns();
});

/*
----ナビのカレント表示-------------
*/
let array = {
  about: 0,
  skills: 0,
  works: 0,
  contact: 0,
  instagram: 0
};

let $nav = new Array();

function menuSet(){
    for (let key in array) {
    if ($('#' + key).offset()) {
      array[key] = $('#' + key).offset().top - 10;
      $nav[key] = $('header nav li a[href="#' + key + '"]');
    }
  }
  console.log(array);
}

menuSet();

  $(window).scroll(function () {
    for (let key in array) {
      if ($(window).scrollTop() > array[key] - 70) {
        $('header nav li a').each(function() {
          $(this).removeClass('current');
        });
        $nav[key].addClass('current');
      }
    }
    if($(window).scrollTop() < 40){
      $('header nav li a').removeClass('current');
      $('header nav li a[href="#"]').addClass('current');
    }
    if (window.innerWidth <= 768) {
      if($(this).scrollTop() > 135){
        $('nav').css('position', 'fixed');

        }else{
          $('nav').css('position', '');
      }
    }
    
  });


// リサイズが止まった後、指定時間後処理を行う
const term = 300;
let timer = 0; 

window.addEventListener("resize", function(){
  
    // リサイズしているときは、タイマーをリセットする
    clearTimeout(timer);

    // 指定時間後、一度だけ処理を実行
    timer = setTimeout(function(){
      menuSet();
    });
});


/*
----instagram-------------
*/
$.ajax({
    type: 'GET',
    url: 'https://graph.facebook.com/v5.0/17841445331267697?fields=name%2Cmedia.limit(8)%7Bcaption%2Clike_count%2Cmedia_url%2Cpermalink%2Ctimestamp%2Cthumbnail_url%2Cmedia_type%2Cusername%7D&access_token=EAAD22ccZB0kIBAAnkAPZCZBR77RfFM4ZBMEvlz5QvnPuSmdj2VJRG6BPTSzWxf1it7SfYDC9Pt0HVmZBCaGZBT5FY75t8ZBfJRRgXUEh35QU2wlWITQPDVHsEkZAc13KEeYuXEZBeET7bKqixxGHGZCy1iTwMDSiGVxZAhNu45poRazgOpMqzcNyna8',
    dataType: 'json',
    success: function(json) {             
        var html = '<ul>';
        var insta = json.media.data;
        for (var i = 0; i < insta.length; i++) {
          var media_type = insta[i].media_type;
          if ( insta[i].media_type == "IMAGE" || insta[i].media_type == "CAROUSEL_ALBUM" ) {
              html += '<li><a href="' + insta[i].permalink + '" target="_blank" rel="noopener noreferrer"><img src="' + insta[i].media_url + '"></a></li>';
            
          } else if (media_type == "VIDEO" ) {
            html += '<li><a href="' + insta[i].permalink + '" target="_blank" rel="noopener noreferrer"><span class="square-content"><img src="' + insta[i].thumbnail_url + '"></span></a></li>';           
            var media_type = '';                    
          }       
        }
        html += '</ul>';
        $(".insta_list").append(html);            
      },
    error: function() {      
  }
});

