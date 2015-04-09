/* jshint node:true */
(function () {
    'use strict';

    $('.js-accordion-trigger').bind('click', function (e) {
        // apply the toggle to the ul
        jQuery(this).parent().toggleClass('is-expanded');
        e.preventDefault();
    });
})();

/*
 *    Mobile Fix for Skills Fixed BG
 *
 */

$(function () {
    'use strict';
    var iheight = $(window).height();
    $('.intro').css('height', iheight + 'px');
    var MOBILE = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        MOBILE = true;
    }
    if (!MOBILE) {
        $('.mobile-sep').css('display', 'none');
    } else {
        var skillsStyles = {
            backgroundAttachment: 'scroll',
            background: '#f7d100'
        };
        $('#skills .content').css(skillsStyles);
    }
});

/*
 *    Top Navigation- Refills
 *
 */

$(function () {
    'use strict';
    var menuToggle = $('#js-centered-navigation-mobile-menu').unbind();
    menuToggle.on('click', function (e) {
        e.preventDefault();
        $('#js-centered-navigation-menu').slideToggle(function () {
            if ($('#js-centered-navigation-menu').is(':hidden')) {
                $('#js-centered-navigation-menu').removeAttr('style');
            }
        });
    });
});

$(function () {
    'use strict';
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();
    var $window = $(window);
    $(window).scroll(function () {
        // 'use strict';
        didScroll = true;
    });

    function hasScrolled() {
        // 'use strict';
        var st = $window.scrollTop();
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta) {
            return;
        }
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $('header').removeClass('nav-down').addClass('nav-up');
            if ($('#js-centered-navigation-menu').not(':hidden')) {
                $('#js-centered-navigation-menu').removeAttr('style');
            }
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }
        }
        lastScrollTop = st;
    }
    setInterval(function () {
        // 'use strict';
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 400);
    (function () {
        // 'use strict';
        if ($('body').scrollTop() === 0) {
            $('header').not('.nav-down').css('top', '-60px');
        } else {
            $('header').css('top', '0');
        }
    })();
});




/*=================================
=            scrollspy            =
=================================*/

// Cache selectors
var lastId,
    topMenu = $("#js-navigation-menu"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({
      scrollTop: offsetTop
  }, 500);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";

   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }
});
/*-----  End of scrollspy  ------*/
/*========================================
=            Simple Accordion            =
========================================*/

var accordionHeader = $('.accordion-header'),
    accordionContent = $('.accordion-content'),
    accordionIcon = $('.accordion-header span');

$(accordionHeader).click(function () {
  if ($(this).hasClass('is-active')){
      $(this).next(accordionContent).slideUp('slow');
      $(this).removeClass('is-active');
  }
  else {
    // close other content
    $(accordionHeader).not(this).next(accordionContent).slideUp('slow');
    $(accordionHeader).not(this).removeClass('is-active');
    $(this).next(accordionContent).slideDown('slow');
    $(this).addClass('is-active');
  }
});


/*-----  End of Simple Accordion  ------*/



$(function() {
  $('#accordion').accordion({
    oneOpenedItem : true
  });
});


