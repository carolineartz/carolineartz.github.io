/* jshint node:true */
(function() {
    'use strict';

    $('.js-accordion-trigger').bind('click', function(e) {
        // apply the toggle to the ul
        jQuery(this).parent().toggleClass('is-expanded');
        e.preventDefault();
    });
})();

/*
 *    Mobile Fix for Skills Fixed BG
 *
 */

$(function() {
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
 *    Top Navigation- Scrollbar Hide
 *
 */


$(function() {
    'use strict';
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.header').outerHeight();
    var $window = $(window);
    $(window).scroll(function() {
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
            $('.header').removeClass('nav-down').addClass('nav-up');
            if ($('#js-centered-navigation-menu').not(':hidden')) {
                $('#js-centered-navigation-menu').removeAttr('style');
            }
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('.header').removeClass('nav-up').addClass('nav-down');
            }
        }
        lastScrollTop = st;
    }
    setInterval(function() {
        // 'use strict';
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 400);
    (function() {
        // 'use strict';
        if ($('body').scrollTop() === 0) {
            $('.header').not('.nav-down').css('top', '-60px');
        } else {
            $('.header').css('top', '0');
        }
    })();
});




/*
 *    Top Navigation- Smooth Scroll
 *
 */

// Cache selectors
var lastId,
    topMenu = $('#js-navigation-menu'),
    topMenuHeight = topMenu.outerHeight() + 15,
    // All list items
    menuItems = topMenu.find('a'),
    // Anchors corresponding to menu items
    accordionSections = menuItems.map(function() {
        'use strict';
        var item = $($(this).attr('href'));
        if (item.length) return item;
    }),
    accordionHeader = $('.accordion-header'),
    accordionContent = $('.accordion-content');
// activeSection = $('.is-active');



// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(event) {
    'use strict';
    event.preventDefault();
    var href = $(this).attr('href'),
        exp = $(href).find(accordionHeader),
        offsetTop = $(href).offset().top,
        active;
    if (!exp.hasClass('is-active')) {
        closeExpanded(exp);
        openExpanded(exp);
    }
    setTimeout(function() {
        active = $('.is-active');
        adjustMove(active);
    }, 500);
});


$(accordionHeader).click(function(event) {
    'use strict';
    event.preventDefault();
    var offsetTop = $(this).offset().top,
    active;
    toggleExpandSection(this);
    setTimeout(function() {
        active = $('.is-active');
        if (active && active.length) {adjustMove(active);}
    }, 500);
});

// Bind to scroll
$(window).scroll(function() {
    // Get container scroll position
    'use strict';
    var fromTop = $(this).scrollTop() + topMenuHeight;
    // Get id of current scroll item
    var cur = accordionSections.map(function() {
        if ($(this).offset().top < fromTop) return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .parent().removeClass('active')
            .end().filter('[href=#' + id + ']').parent().addClass('active');
    }
});

/*
 *    Smooth Scroll
 *
 */


$(document).ready(function() {
  $('.scroll-on-page-link').each(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    && location.hostname == this.hostname
    && this.hash.replace(/#/,'') ) {
      var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) +']');
      var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
       if ($target) {
         var targetOffset = $target.offset().top;
         $(this).click(function() {
           $('html, body').animate({scrollTop: targetOffset}, 400);
           return false;
         });
      }
    }
  });
});


/*========================================
=            Simple Accordion            =
========================================*/

function adjustMove(elem) {
    $('html, body').stop().animate({
        scrollTop: $(elem).offset().top
    }, 500);
}


function topNavExpandSection(toExpand) {
    if ($(toExpand).hasClass('is-active')) return;
    else {
        closeExpanded(toExpand);
        opexnExpanded(toExpand);
    }
}

function toggleExpandSection(toExpand) {
    if ($(toExpand).hasClass('is-active')) {
        $(toExpand).next(accordionContent).slideUp();
        $(toExpand).removeClass('is-active');
    } else {
        closeExpanded(toExpand);
        openExpanded(toExpand);
    }
}


function closeExpanded(toExpand) {
    $(accordionHeader).not(toExpand).next(accordionContent).slideUp();
    $(accordionHeader).not(toExpand).removeClass('is-active');
}

function openExpanded(toExpand) {
    $(toExpand).next(accordionContent).slideDown('slow');
    $(toExpand).addClass('is-active');
}

/*-----  End of Simple Accordion  ------*/

/*========================================
=            Typing Animation            =
========================================*/

$(function() {
    'use strict';
    var animationDelay = 2500,
        typeLettersDelay = 150,
        selectionDuration = 500,
        typeAnimationDelay = selectionDuration + 800;

    function initHeadline() {
        singleLetters($('.headline.letters').find('b')); //insert <i> element for each letter of a changing word
        animateHeadline($('.headline'));
    }
    initHeadline();

    function singleLetters($words) {
        $words.each(function() {
            var word = $(this),
                letters = word.text().split(''),
                selected = word.hasClass('is-visible');
            for (var letter in letters) {
                letters[letter] = (selected) ? '<i class="in">' + letters[letter] + '</i>' : '<i>' + letters[letter] + '</i>';
            }
            var newLetters = letters.join('');
            word.html(newLetters).css('opacity', 1);
        });
    }

    function animateHeadline($headline) {
        var duration = animationDelay;
        var headline = $headline;
        if (!headline.hasClass('type')) { //assign to .words-wrapper the width of its longest word
            var words = headline.find('.words-wrapper b'),
                width = 0;
            words.each(function() {
                var wordWidth = $(this).width();
                if (wordWidth > width) {
                    width = wordWidth;
                }
            });
            headline.find('.words-wrapper').css('width', width);
        }
        setTimeout(function() {
            hideWord(headline.find('.is-visible').eq(0));
        }, duration);
    }

    function hideWord($word) {
        var nextWord = takeNext($word);
        if ($word.parents('.headline').hasClass('type')) {
            var parentSpan = $word.parent('.words-wrapper');
            parentSpan.addClass('selected').removeClass('waiting');
            setTimeout(function() {
                parentSpan.removeClass('selected');
                $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
            }, selectionDuration);
            setTimeout(function() {
                showWord(nextWord, typeLettersDelay);
            }, typeAnimationDelay);
        } else if ($word.parents('.headline').hasClass('letters')) {
            var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
            hideLetter($word.find('i').eq(0), $word, bool, typeLettersDelay);
            showLetter(nextWord.find('i').eq(0), nextWord, bool, typeLettersDelay);
        } else {
            switchWord($word, nextWord);
            setTimeout(function() {
                hideWord(nextWord);
            }, animationDelay);
        }
    }

    function showWord($word, $duration) {
        if ($word.parents('.headline').hasClass('type')) {
            showLetter($word.find('i').eq(0), $word, false, $duration);
            $word.addClass('is-visible').removeClass('is-hidden');
        }
    }

    function hideLetter($letter, $word, $bool, $duration) {
        $letter.removeClass('in').addClass('out');
        if (!$letter.is(':last-child')) {
            setTimeout(function() {
                hideLetter($letter.next(), $word, $bool, $duration);
            }, $duration);
        } else if ($bool) {
            setTimeout(function() {
                hideWord(takeNext($word));
            }, animationDelay);
        }
        if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
            var nextWord = takeNext($word);
            switchWord($word, nextWord);
        }
    }

    function showLetter($letter, $word, $bool, $duration) {
            $letter.addClass('in').removeClass('out');
            if (!$letter.is(':last-child')) {
                setTimeout(function() {
                    showLetter($letter.next(), $word, $bool, $duration);
                }, $duration);
            } else {
                if ($word.parents('.headline').hasClass('type')) {
                    setTimeout(function() {
                        $word.parents('.words-wrapper').addClass('waiting');
                    }, 200);
                }
                if (!$bool) {
                    setTimeout(function() {
                        hideWord($word);
                    }, animationDelay);
                }
            }
        }
        /// UTILITIES
    function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
    }
});


/*-----  End of Typing Animation  ------*/

/*
 *    Geopattern
 *
 */


// var pattern = GeoPattern.generate('caroline', {
//                   generator: 'plusSigns'
// });
// $('#about .accordion-content').css('background-image', pattern.toDataUrl());
