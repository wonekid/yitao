var nav = {
  init: function () {
    if ($("html").hasClass("touch")) {
      $("nav .menu_btn").click(function(){
        if($("body").hasClass("nav-open")) nav.close();
        else nav.open();
      })
    } else {
      $("nav").hover(nav.open, nav.close);
    }
    $("#bg_mask").bind("click", nav.close);

    if ($("header .right-nav").length > 0) {
      $("header").css("width", "100%");
      resize();
      $(window).resize(function () {
        resize();
      });
    }

    function resize() {
      var leftw = 240;
      if ($(window).width() < 768) leftw = 200;
      var endw = $("header").width() - $("header .right-nav").width() - leftw;
      $("header .title").width(endw);
    }

    $("header .scroll-nav li a").each(function () {
      $(this).click(function (e) {
        e.preventDefault();
        //$(window).scrollTo($(this).attr("href"), 500);
        mouseScroll.scrollto($($(this).attr("href")));
      })
    });

    $(".tags_nav li a").addClass("trans");
    $(".tags li a").addClass("trans");
  },

  open: function () {
    if (!$("body").is(".pop-show")) {
      $("#bg_mask").fadeTo(400, 0.6);
      $("body").addClass("nav-open");
    }
  },

  close: function () {
    $("body").removeClass("nav-open");
    $("#bg_mask").fadeTo(400, 0, function () {
      $("#bg_mask").hide();
    });
  }
}

var tagsnav = {
  init: function () {
    if ($("html").hasClass("touch")) {
      $(".tags_btn").click(function(){
        if($("body").hasClass("tagsnav-open")) tagsnav.close();
        else tagsnav.open();
      })
    } else {
      $(".tags_nav").hover(tagsnav.open, tagsnav.close);
    }
    $("#bg_mask").bind("click", tagsnav.close);
  },

  open: function () {
    if (!$("body").is(".pop-show")) {
      $("#bg_mask").fadeTo(400, 0.6);
      $(".tags_nav ul").show().fadeTo(400, 1);
//      $("body").addClass("tagsnav-open");
      $(".tags_btn").addClass("active");
    }
  },

  close: function () {
//    $("body").removeClass("tagsnav-open");
    $(".tags_btn").removeClass("active");
    $("#bg_mask").hide();
    $(".tags_nav ul").hide();
  }
}

var sharenav = {
  init: function () {
    if ($("html").hasClass("touch")) {
      $(".btn_share").click(function(){
        if($("body").hasClass("sharenav-open")) sharenav.close();
        else sharenav.open();
      })
    } else {
      $(".share_btns").hover(sharenav.open, sharenav.close);
    }
  },

  open: function () {
    $("body").addClass("sharenav-open");
    $(".btn_share").addClass("active");
  },

  close: function () {
    $("body").removeClass("sharenav-open");
    $(".btn_share").removeClass("active");
  }
}


var proloader = {
  init: function () {
    var $obj = $(".proloader");

    var image = new Image();
    image.src = $obj.find('.proloader_img').data('loadimg');

    function imgLoaded() {
      $('.loading_icon').remove();
      $obj.animate({
        opacity: 1,
      }, 1000, 'easeInOutExpo', function () {
        if ($(window).scrollTop() < 300) {
          //          $banner.flexslider("play");
        }
      });
      $obj.css('visibility', 'visible');
    }

    if (image.complete) imgLoaded();
    else image.onload = imgLoaded;
  }
}

var footer = {
  init: function () {
    var $btn = $('footer .icons .jsbtn');
    var $saveid;
    var $savebtn;

    $btn.each(function () {
      var $qrcode = $($(this).data('target'));

      $(this).click(function () {
        if ($qrcode.hasClass('show')) {
          $qrcode.removeClass('show');
          $(this).removeClass('active');
        } else {
          if ($saveid != undefined) $saveid.removeClass('show');
          if ($savebtn != undefined) $savebtn.removeClass('active');
          $qrcode.addClass('show');
          $(this).addClass('active');
          $saveid = $qrcode;
          $savebtn = $(this);
        }
      })
    });
  }
}

var mouseScroll = {
  canScroll: false,

  init: function() {
    if (!$("html").hasClass("lt-ie9"))
      $(document).bind('mousewheel', mouseScroll.m_wheel);
  },

  m_wheel: function (event, delta) {
    mouseScroll.canScroll = false;
    prevent.disableScroll();
    var window_h = document.body.clientHeight;
    var aboveTheTop = $(".mscroll:above-the-top").last();
    var viewport = $(".mscroll:in-viewport");
    var belowTheFold = $(".mscroll:below-the-fold").first();
    var $target;
    //console.log(viewport);
    if (viewport.length > 1) {
      $target = event.deltaY > 0 ? viewport.first() : viewport.last();
    } else {
      $target = event.deltaY > 0 ? aboveTheTop : belowTheFold;
    }

    if ($target.length > 0 && $target.height() <= window_h) {
      if(event.deltaY < 0)
        var aaa = $target.offset().top - $(window).scrollTop();
      else
        var aaa = $(window).scrollTop() - $target.offset().top;

      if (aaa > 0 && aaa <= window_h) {
        mouseScroll.canScroll = true;
        mouseScroll.scrollto($target);
      }
    }

    if (!mouseScroll.canScroll) prevent.enableScroll();
//    var window_h = document.body.clientHeight;
//
//    if (event.deltaY < 0) {
//      var endy = $(document).height() - $(window).scrollTop() - window_h;
//
//      $("body .mscroll").each(function () {
//        var aaa = $(this).offset().top - $(window).scrollTop();
//        if (aaa > 0 && aaa <= window_h && endy > 0 && $(this).height() <= window_h) {
//          event.preventDefault();
//          mouseScroll.scrollto($(this));
//          return false;
//        }
//      })
//    }
//
//    if (event.deltaY > 0) {
//      $("body .mscroll").each(function () {
//        var aaa = $(window).scrollTop() - $(this).offset().top;
//        if (aaa > 0 && aaa <= window_h && $(this).height() <= window_h) {
//          event.preventDefault();
//          mouseScroll.scrollto($(this));
//          return false;
//        }
//      })
//    }
  },

  scrollto: function ($target) {
    var window_h = document.body.clientHeight;
    $(document).unbind('mousewheel', mouseScroll.m_wheel);
    window.onmousewheel = function () {
      return false
    };

    $(window).scrollTo($target, 1500, {
      easing: 'easeInOutExpo',
      onAfter: function () {
        if (!$("html").hasClass("lt-ie9"))
          $(document).bind('mousewheel', mouseScroll.m_wheel);

        window.onmousewheel = function () {
          return true
        };
        $target.find('.anima_3d_top').removeClass('animation_3d_top');
        $target.find('.anima_3d_bottom').removeClass('animation_3d_bottom');
      }
    });

    if ($("html").hasClass("csstransforms3d") && $("html").hasClass("cssanimations")) {
      var aaa = $target.offset().top - $(window).scrollTop();
      if (aaa <= -window_h || aaa >= window_h) {
        $target.find('.anima_3d_top').addClass('animation_3d_top');
        $target.find('.anima_3d_bottom').addClass('animation_3d_bottom');
        $target.find('.anim_emt').removeClass('anim_emt');
      }
    }
  }
}

var down_arrow = {
  init: function () {
    var $btn = $('.down_arrow');
    var hide_btn = function () {
      $(window).on("scroll", function () {
        $('.down_arrow').fadeOut(500);
        $(document).unbind('scroll', hide_btn);
      });
    };
    $(document).bind('scroll', hide_btn);
  }
}

var jobs = {
  wd_scroll: 0,

  init: function () {
    $('#job_btns li a').each(function (i) {
      $(this).click(function () {
        jobs.showInfo($('#job_infos'), i);
      })
    });

    $('#process_btn').click(function () {
      jobs.showInfo($('#job_process'));
    });

    $('.pop_bg').bind("click", jobs.closeInfo);

    $('.pop_window .box .cont').bind('mousewheel', function (event) {
      event.preventDefault();
      var scrollTop = this.scrollTop;
      this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
    });

    jobs.resize();
    $(window).resize(function () {
      jobs.resize();
    });
  },

  showInfo: function (target, i) {
    wd_scroll = $(window).scrollTop();
    target.find('.item').each(function (n) {
      $(this).hide();
      if (n == i) $(this).show();
    });
    target.find('.box .cont').scrollTo(0);
    target.addClass("pop-show");
    $(document).unbind('mousewheel', mouseScroll.m_wheel);
    prevent.disableScroll();
  },

  closeInfo: function () {
    $(window).scrollTo(wd_scroll, 500);
    $('.pop-show').removeClass("pop-show");
    $(document).bind('mousewheel', mouseScroll.m_wheel);
    prevent.enableScroll();
  },

  resize: function () {
    var oPer = 1600 / 900,
      sPer = $(window).width() / $(window).height();
    if (oPer > sPer) {
      $("#job-photos").css('height', 'auto');
    } else {
      $("#job-photos").css('height', '100%');
    }
  }
}

var prevent = {
  init: function () {
    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
        e.preventDefault();
      e.returnValue = false;
    }

    function keydown(e) {
      for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
          preventDefault(e);
          return;
        }
      }
    }

    function wheel(e) {
      preventDefault(e);
    }

    function disable_scroll() {
      if (window.addEventListener) {
        //        document.addEventListener('touchmove', preventDefault, false);
        window.addEventListener('DOMMouseScroll', wheel, false);
      }
      window.onmousewheel = document.onmousewheel = wheel;
      document.onkeydown = keydown;
    }

    function enable_scroll() {
      if (window.removeEventListener) {
        //        document.removeEventListener('touchmove', preventDefault, false);
        window.removeEventListener('DOMMouseScroll', wheel, false);
      }
      window.onmousewheel = document.onmousewheel = document.onkeydown = null;
    }

    this.disableScroll = disable_scroll;
    this.enableScroll = enable_scroll;
  }
}

$(document).ready(function () {
  var nua = navigator.userAgent;
  // 判断是否 iOS设备
  if ((nua.match(/iPhone/i) || nua.match(/iPad/i))) {
    // 判断系统版本号是否大于 8
    if (nua.match(/OS [8-9]_\d[_\d]* like Mac OS X/i))
      $("body").addClass("ios8");
  }
  //if (nua.indexOf("Firefox")!=-1) $("html").addClass("firefox");
  nav.init();
  sharenav.init();
  footer.init();
  prevent.init();
  $("img").attr("oncontextmenu","return false");
  $("img").attr("ondragstart","return false");
});
