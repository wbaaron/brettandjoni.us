/* eslint-disable */
$(function() {
  for (var i = 1; i <= 11; ++i) {
    $("#gallery").append('<img alt="" src="assets/img/gallery/' + i + '_tn.jpg" data-image="assets/img/gallery/' + i + '.jpg" data-description="">');
  }

  $("#gallery").unitegallery({
    gallery_theme: "tiles"        
  });

  setupSmoothScrolling();
});

function setupSmoothScrolling() {
  console.log('setupSmoothScrolling');
  $('a').on('click', function(e) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      e.preventDefault();

      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $('a[name="' + hash.replace(/#/, '') + '"]').offset().top - 25 // padding
      }, 800, function() {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
}