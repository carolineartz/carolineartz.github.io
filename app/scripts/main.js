/* jshint devel:true */
/* jshint node:true */
(function() {
    'use strict';
    // var $section;





    // function navToElement(e) {
    //     var $target = $(e.target);

    //     if ($target.hasClass('top-navigation-link')) {
    //         $section = $($target.attr('href')).collapse('show');
    //     }
    //     // else: target has class .panel-collapse
    //     else {
    //         $section = $target.prev('.panel-heading').parent();
    //     }

    //     $('html, body').animate({
    //         scrollTop: $section.offset().top - 30
    //     }, 100);
    // }

    function navToElement(e) {
        var target = $(e.target);
        if ($(target).hasClass('panel-collapse')) {
            var $section = $(target).prev('.panel-heading').parent();
            $('html, body').animate({
                scrollTop: $section.offset().top - 30
            }, 100);
        } else if ($(target).hasClass('top-navigation-link')) {
            var sectionId = $(target).attr('href');
            $('#accordion').find('.collapse.in').removeClass('in');

            var $section = $(sectionId).collapse('show');
            $('html, body').animate({
                scrollTop: $section.offset().top - 30
            }, 100);
        }

    }



    $('.top-navigation-link, .panel-collapse').on('click', navToElement);
    $('#accordion').on('shown.bs.collapse', navToElement);

})();



/*-----  End of On-page scrolling navigation  ------*/



$(function() {


    'use strict';
    // console.log($('body').scrollTop());

    if ($('body').scrollTop() === 0) {
        $('.navbar-fixed-top').css('top', '-50px');
    }


    $('.navbar-fixed-top').autoHidingNavbar({
        'animationDuration': 300,
        'showOnBottom': false
    });


    //calculate size of intro
    var iheight = $(window).height();
    $('.intro').css('height', iheight + 'px');
    // console.log(iheight + 'px');

    //  **************************************************************

    var animationDelay = 2500,
        typeLettersDelay = 150,
        selectionDuration = 500,
        typeAnimationDelay = selectionDuration + 800;



    function initHeadline() {
        singleLetters($('.headline.letters').find('b')); //insert <i> element for each letter of a changing word
        // console.log($('.headline.letters').find('b'));
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

        if (!headline.hasClass('type')) { //assign to .cd-words-wrapper the width of its longest word
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

var MOBILE = false;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    var MOBILE = true;
}

if (!MOBILE) {
    // console.log('is not mobile');
    $('.mobile-sep').css('display', 'none');
} else {
    // console.log('is is mobile');
    var skillsStyles = {
        backgroundAttachment: 'scroll',
        background: '#f7d100'
    };
    $('#skills .content').css(skillsStyles);

}
