/* jshint node:true */

$(function() {
    FastClick.attach(document.body);
});
/*
 *    Mobile Fix for Skills Fixed BG
 *
 */

function isMobile() {
    'use strict';
    var check = false;
    (function(a) {
        if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
            check = true;
        }
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

/*
 *    Top Navigation- Scrollbar Hide
 *
 */

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.header').outerHeight();
var $window = $(window);

$(window).scroll(function() {
      'use strict';
    didScroll = true;
});

function hasScrolled() {
      'use strict';
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
        if ($('#js-left-navigation-menu').not(':hidden')) {
            $('#js-left-navigation-menu').removeAttr('style');
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
      'use strict';
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 400);

if ($('body').scrollTop() === 0) {
    $('.header').not('.nav-down').css('top', '-60px');
} else {
    $('.header').css('top', '0');
}






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
        if (item.length) {
            return item;
        }
    }),
    accordionHeader = $('.accordion-header'),
    accordionContent = $('.accordion-content');

function closeExpanded(toExpand) {
    'use strict';
    $(accordionHeader).not(toExpand).next(accordionContent).slideUp('slow');
    $(accordionHeader).not(toExpand).removeClass('is-active');
}

function openExpanded(toExpand) {
    'use strict';
    $(toExpand).next(accordionContent).slideDown('slow');
    $(toExpand).addClass('is-active');
}

function adjustMove(elem) {
    'use strict';
    $('html, body').stop().animate({
        scrollTop: $(elem).offset().top
    }, 500);
}

function toggleExpandSection(toExpand) {
    'use strict';
    if ($(toExpand).hasClass('is-active')) {
        $(toExpand).next(accordionContent).slideUp('slow');
        $(toExpand).removeClass('is-active');
    } else {
        closeExpanded(toExpand);
        openExpanded(toExpand);
    }
}



// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(event) {
    'use strict';
    event.preventDefault();
    var href = $(this).attr('href'),
        exp = $(href).find(accordionHeader),
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
    toggleExpandSection(this);
    setTimeout(function() {
        var active = $('.is-active');
        if (active && active.length) {
            adjustMove(active);
        }
    }, 500);
});

// Bind to scroll
$(window).scroll(function() {
    // Get container scroll position
    'use strict';
    var fromTop = $(this).scrollTop() + topMenuHeight;
    // Get id of current scroll item
    var cur = accordionSections.map(function() {
        if ($(this).offset().top < fromTop) {
            return this;
        }
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : '';

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



$('.scroll-on-page-link').each(function() {  
      'use strict';
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname && this.hash.replace(/#/, '')) {   
        var $targetId = $(this.hash),
            $targetAnchor = $('[name=' + this.hash.slice(1) + ']');   
        var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;  
        if ($target) {        
            $(this).click(function() {      
                $('html, body').animate({
                    scrollTop: $target.offset().top
                }, 400);      
                return false;     
            });   
        }  
    } 
});




var iheight = $(window).height();
$('.intro').css('height', iheight + 'px');
if (!isMobile()) {
    $('.mobile-sep').css('display', 'none');
} else {
    var skillsStyles = {
        backgroundAttachment: 'scroll',
        background: '#f7d100'
    };
    $('#skills .content').css(skillsStyles);
}



/*========================================
=            Typing Animation            =
========================================*/


var animationDelay = 2500,
    typeLettersDelay = 150,
    selectionDuration = 500,
    typeAnimationDelay = selectionDuration + 800;



function singleLetters($words) {
      'use strict';
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

function showLetter($letter, $word, $bool, $duration) {
        'use strict';
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

function showWord($word, $duration) {
        'use strict';
    if ($word.parents('.headline').hasClass('type')) {
        showLetter($word.find('i').eq(0), $word, false, $duration);
        $word.addClass('is-visible').removeClass('is-hidden');
    }
}

function hideWord($word) {
        'use strict';
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





function hideLetter($letter, $word, $bool, $duration) {
        'use strict';
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


    /// UTILITIES
function takeNext($word) {
        'use strict';
    return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
}

function switchWord($oldWord, $newWord) {
        'use strict';
    $oldWord.removeClass('is-visible').addClass('is-hidden');
    $newWord.removeClass('is-hidden').addClass('is-visible');
}

function animateHeadline($headline) {
        'use strict';
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


function initHeadline() {
      'use strict';
    singleLetters($('.headline.letters').find('b')); //insert <i> element for each letter of a changing word
    animateHeadline($('.headline'));
}
initHeadline();

/*-----  End of Typing Animation  ------*/
