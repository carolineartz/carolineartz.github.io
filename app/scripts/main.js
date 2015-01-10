/* jshint devel:true */
//console.log('\'Allo \'Allo!');
/* jshint node:true */


(function () {
  'use strict';

  var navigateToElement = function (id) {
    $('html, body').animate({
      scrollTop: $('#' + id).offset().top
    }, 1000);
  };

  $('#section-navigation').on('shown.bs.collapse', function (e) {
    var id = $(e.target).prev().find('[id]')[0].id;
    navigateToElement(id);
  });

})();

$(function () {
  'use strict';
  $('.navbar-fixed-top').autoHidingNavbar({
    // see next for specifications
  });
});


//**************************************************************************

