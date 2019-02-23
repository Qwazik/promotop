$(document).ready(function(){
  (function(){
    var sliders = {
        'portfolio':{
          navigation: {
            disabledClass: 'slider-nav__btn'
          }
        },
        'reviews' : {
          slidesPerView: 1,
          centeredSlides: true,
          loop: true,
          autoplay: true,
          autoplayTimeout: 1000,
          loopAdditionalSlides: 2,
          pagination:{
            el: '.slider-pagination',
            clickable: true
          }
        },

      },
      $sliders = $('.swiper-container');

    $.each(sliders, function(name){
      var currentSlider = $sliders.filter('[data-swiper="'+name+'"]');
      var swiper = new Swiper(currentSlider, sliders[name]);

      if(name === 'portfolio'){
        $('.portfolio-item .slider-nav__btn').click(function(){
          if($(this).is('[data-prev]')){
            swiper.slidePrev();
          }else{
            swiper.slideNext();
          }
        });
      }

      if(name === 'reviews'){
        var reviewsContainer = currentSlider.closest('.reviews-slider-container'),
            prev = reviewsContainer.find('[data-prev]'),
            next = reviewsContainer.find('[data-next]'),
            content = reviewsContainer.siblings('.reviews-slider__content');
            imageNav();
            swiper.on('transitionStart', function(){
              imageNav();
            });

            function imageNav(){
              var prevImage = reviewsContainer.find('.swiper-slide-prev img').attr('src');
              var nextImage = reviewsContainer.find('.swiper-slide-next img').attr('src');
              prev.css('background-image', 'url(' + prevImage + ')');
              next.css('background-image', 'url(' + nextImage + ')');
              content.text(reviewsContainer.find('.swiper-slide-active .review-item__text').text());
            }

            prev.click(function(){
              swiper.slidePrev();
            });

            next.click(function(){
              swiper.slideNext();
            });
      }
    });

   
  }());


  (function(){
    
    if($('.main-header').is('.main-header_fixed')){
      bodyOffset();
      $(window).on({
        'load':bodyOffset,
        'resize':bodyOffset
      })
    }
  }());
})

function bodyOffset(){
  var mainHeaderHeight = $('.header-main').outerHeight(),
      headerTopHeight = $('.main-header__top').outerHeight(),
      needHomeFirstHeight = $(window).innerHeight() - (mainHeaderHeight + headerTopHeight);
  
  body();
  if($('.home-first').length) homeFirst();

  function body(){
    $('body').css('padding-top', headerTopHeight);
  }
  function homeFirst(){
    $('.home-first').css('padding-top', mainHeaderHeight);
    $('.home-first__container').height(needHomeFirstHeight);
  }
}

$(document).ready(function(){
  var chart = $('.seo-chart')[0];
  Highcharts.chart(chart, {
    credits: false,
    legend: false,
    chart: {
      type: 'area',
      margin: 8,
      spacing: 0
    },
    title: false,

    xAxis: {
      categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      },
      labels: false,
      tickWidth: 0,
      minorTickWidth: 0,
      lineWidth: 0,
      gridLineWidth: 0,
      minorGridLineWidth: 0
    },
    yAxis: {
      title: {
        text: false,
      },
      labels: false,
      tickWidth: 0,
      minorTickWidth: 0,
      lineWidth: 0,
      gridLineWidth: 0,
      minorGridLineWidth: 0
    },

    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    series: [{
      name: 'Посещаемость',
      data: [5, 20, 25, 40, 50, 71, 92]
    }, {
      name: 'Топ',
      data: [1, 15, 20, 30, 40, 65, 71]
    }]
  });
});

$(function(){
  /*-- START: mobile nav --*/
  var MOBILE_NAV = (function () {
    var mobileNavClass = 'mobile-nav';
    var menus = [
      '.header-main__nav .main-nav'
    ];
    var additionalBlocks = [
      '.header-top__address',
      '.header-top__email',
      '.header-top__phone',
      '.header-top__social'
    ];
    var cnt = $('<div/>');

    

    for (var i = 0; i < menus.length; i++) {
      if ($(menus[i]).length) {
        var section = $('<div/>').addClass(mobileNavClass + '__section ' + mobileNavClass + '__section_' + i);
        section.append(getItems(menus[i]));
        cnt.append(section);
      }
    }

    for (var j = 0; j < additionalBlocks.length; j++) {
      if ($(additionalBlocks[j]).length) {
        var section = $('<div/>').addClass(mobileNavClass + '__section ' + mobileNavClass + '__section_add' + j);
        section.append($(additionalBlocks[j]).clone());
        cnt.append(section);
      }
    }


    cnt.addClass(mobileNavClass);

    $('body').append(cnt);

    $('.header-mobile-wrap').click(function () {
      $('.' + mobileNavClass).toggleClass('active');
      $(this).toggleClass('active');
    });

    $('.mobile-nav-btn').click(function(){
      $(this).toggleClass('active');
      $('.mobile-nav').toggleClass('active');
    });
    function getItems(selector) {
      var clone = $(selector).clone();
      return clearClasses(clone);
    }

    function clearClasses(element) {
      var depth = 0;
      $(element).removeClass().addClass(mobileNavClass + '__list');
      clear($(element).children());

      function clear(childrens) {
        depth++;
        $(childrens).removeClass();
        $(childrens).each(function () {
          var $this = $(this);
          if ($this.is(':empty')) $(this).remove();
          if ($this.is('li')) $(this).addClass(mobileNavClass + '__item');
          if ($this.is('a')) $(this).addClass(mobileNavClass + '__link');
          if ($this.is('ul') && depth > 0) {
            var dropdownBtn = $('<button/>').addClass(mobileNavClass + '__dropdown-toggler');
            var parentLi = $(this).closest('li');
            dropdownBtn.click(function () {
              $this.toggleClass('active');
            });
            parentLi.append(dropdownBtn);

            $(this).addClass(mobileNavClass + '__dropdown');
            $(parentLi).addClass(mobileNavClass + '__parent');
          };
        });
        if ($(childrens).children().length) clear($(childrens).children());
      }
      return element;
    }
  }());

/*-- END: mobile nav --*/
});