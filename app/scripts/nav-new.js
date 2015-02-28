// // Hide Header on on scroll down
// var didScroll;
// var lastScrollTop = 0;
// var delta = 5;
// var navbarHeight = $('header').outerHeight();

// var $window = $(window)

// $(window).scroll(function() {
//     'use strict';
//     didScroll = true;
//     console.log("i'm navbar height: " + navbarHeight);
// });


// function hasScrolled() {
//     'use strict';
//     var st = $window.scrollTop();

//     // Make sure they scroll more than delta
//     if (Math.abs(lastScrollTop - st) <= delta) {
//         return;
//     }

//     // If they scrolled down and are past the navbar, add class .nav-up.
//     // This is necessary so you never see what is "behind" the navbar.
//     if (st > lastScrollTop && st > navbarHeight) {
//         // Scroll Down
//         $('header').removeClass('nav-down').addClass('nav-up');
//     } else {
//         // Scroll Up
//         if (st + $(window).height() < $(document).height()) {
//             $('header').removeClass('nav-up').addClass('nav-down');
//         }
//     }

//     lastScrollTop = st;
// }

// setInterval(function() {
//     'use strict';
//     if (didScroll) {
//         hasScrolled();
//         didScroll = false;
//     }
// }, 250);

// (function() {
//       'use strict';
//     if ($('body').scrollTop() === 0) {
//         $('header').not('.nav-down').css('top', '-60px');
//     } else {
//         $('header').css('top', '0');
//     }

//     // $('.nav-up').css('top', '-60px');
//     $('.nav-down').css('top', '0');
// })();
