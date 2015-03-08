(function() {

$(window).resize(function(){
  var ratio = $('.content').width()/1182;
  $('.wrapper').css('height', 764 * ratio);

  $('.container').css('transform', 'scale('+ratio+')');
});
$(document).ready(function(){
  var ratio = $('.content').width()/1182;
  $('.wrapper').css('height', 764 * ratio);

  $('.container').css('transform', 'scale('+ratio+')');

  var bg = "CodingSans_hex.png";
  var bgs = ["nodejs_hex.png",
            "docker_hex.png",
            "bs_hex.png",
            "cordova_hex.png",
            "angular_hex.png",
            "wp_hex.png",
            "aws_hex.png",
            "mongo_hex.png",
            "redis_hex.png",
            "android_hex.png",
            "ios_hex.png",
            "react_hex.png"];

  var urls = ["http://nodejs.org",
            "http://docker.com",
            "http://getbootstrap.com",
            "http://cordova.apache.org",
            "http://angularjs.org",
            "http://dev.windows.com",
            "http://aws.amazon.com",
            "http://mongodb.org",
            "http://redis.io",
            "http://developer.android.com/",
            "http://developer.apple.com/devcenter/ios",
            "http://facebook.github.io/react"];

  var cs = $(".hex.cs");
  var imgs = $(".hex");
  var brand = $(".hex:not(.cs)");

  $(document).on("click", ".cs", shuffle);

  loadImages();

  function shuffle(){
    var tmpImg = [];
    var tmpUrl = [];
    while(brand.length) {
      var rnd1 = Math.random()*brand.length;
      var img1 = brand.splice(rnd1, 1);
      var url1 = urls.splice(rnd1, 1);
      if (!brand.length) break;
      var rnd2 = Math.random()*brand.length;
      var img2 = brand.splice(rnd2, 1);
      var url2 = urls.splice(rnd2, 1);
      swp(img1, img2);
      swp(url1, url2);
      tmpImg.push(img1[0]);
      tmpImg.push(img2[0]);
      tmpUrl.push(url1[0]);
      tmpUrl.push(url2[0]);
    }
    brand = tmpImg;
    urls = tmpUrl;

    var i = 0, j = 0;

    while ( i < brand.length ) {
      var img = $(brand[i]);
      img.css("transform" , 'translate('+((img.attr('col')-1)*220)+'px, '+((img.attr('row')-1)*126)+'px)');
      img.attr("href", urls[i]); 
      i++;
    }

  }

  function swp(a, b) {
    swap($(a), $(b), 'col');
    swap($(a), $(b), 'row');
  }

  function swap(a, b, type){
    var tmp = a.attr(type);
    a.attr(type, b.attr(type));
    b.attr(type, tmp);
  }

  function loadImages(){
    shuffle();
    var i = 0, j = 0;

    while ( i < imgs.length ) {
      var img = $(imgs[i]);

      if (i === 6) {
        img.css("background-image", 'url(assets/'+bg+')');
      } else {
        img.css("background-image", 'url(assets/'+bgs[j%(bgs.length)]+')');
        j++;
      }
      img.css("top" , '0');
      img.css("left" , '0');
      img.css("transform" , 'translate('+((img.attr('col')-1)*220)+'px, '+((img.attr('row')-1)*126)+'px)');
      i++;
    }

  }
});

})();
