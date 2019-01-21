/* eslint-disable */
$(function() {
  $('#bg-slider').lightSlider({
    item: 5,
    slideMargin: 0,
    adaptiveHeight: true,
    auto: true,
    loop: true,
    pager: false,
    gallery: false,
    pause: 5000,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          item: 3,
        },
      }
    ]
  });

  var $gallery = $('#gallery');
  for (i = 1; i <= 11; ++i) {
    $("#gallery").append('<img alt="" src="assets/img/gallery/' + i + '_tn.jpg" data-image="assets/img/gallery/' + i + '.jpg" data-description="">');
  }

  $("#gallery").unitegallery({
    gallery_theme: "tiles"
  });

  $('nav a').on('click', function(e) {
    $('input.mobile').prop('checked', false);
  })

  setupTabAutoAdjust();
  setupSmoothScrolling();
  countdown('2019-10-12T19:00:00-06:00');

  $('body').addClass('active');
  setTimeout(function() {
    $('section.hero .badge-wrapper').addClass('animate');
  }, 150);

  $('section.details input').on('change', function(e) {
    if ($('label.mobile').is(':visible')) {
      $('nav a[href="#details"]').click();
    }
  });
});

function setupTabAutoAdjust() {
  var _recalcHeights = function() {
    $('.tab-content.auto-size').each(function(i, tabContent) {
      var $tabContent = $(tabContent);
      if ($tabContent.parent('.tab-container').length > 0) {
        $tabContent = $tabContent.parent('.tab-container');
      }

      var $selectedTab = $tabContent.siblings('input:checked');
      var $visibleTab = $tabContent.find('.' + $selectedTab.attr('id'));
      $tabContent.css('height', $visibleTab.length > 0 ? $visibleTab.outerHeight() + 'px' : '');
    });
  };

  _recalcHeights();
  $(window).on('resize', _recalcHeights);

  $('.has-auto-size-tabs input').on('change', function(e) {    
    var $tabToShow = $(this).siblings('.tab-content, .tab-container').find('.' + $(this).attr('id'));
    $(this).siblings('.tab-content, .tab-container').css('height', $tabToShow.length > 0 ? $tabToShow.outerHeight() + 'px' : '');
  });
}

function setupSmoothScrolling() {
  $('a').on('click', function(e) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      e.preventDefault();

      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $('a[name="' + hash.replace(/#/, '') + '"]').offset().top - 100 // padding
      }, 800, function() {
        // Add hash (#) to URL when done scrolling (default click behavior)
        if (history.pushState) {
          history.pushState(null, null, hash);
        } else {
          location.hash = hash;
        }
      });
    } // End if
  });
}

function countdown(endDate) {
  var days, hours, minutes, seconds;

  endDate = new Date(endDate).getTime();

  if (isNaN(endDate)) {
    return;
  }

  setInterval(calculate, 1000);

  function calculate() {
    var startDate = new Date();
    startDate = startDate.getTime();

    var timeRemaining = parseInt((endDate - startDate) / 1000);

    if (timeRemaining >= 0) {
      days = parseInt(timeRemaining / 86400);
      timeRemaining = (timeRemaining % 86400);

      hours = parseInt(timeRemaining / 3600);
      timeRemaining = (timeRemaining % 3600);

      minutes = parseInt(timeRemaining / 60);
      timeRemaining = (timeRemaining % 60);

      seconds = parseInt(timeRemaining);

      document.getElementById('days').innerHTML = parseInt(days, 10);
      document.getElementById('hours').innerHTML = ('0' + hours).slice(-2);
      document.getElementById('minutes').innerHTML = ('0' + minutes).slice(-2);
      document.getElementById('seconds').innerHTML = ('0' + seconds).slice(-2);
    } else {
      return;
    }
  }
}