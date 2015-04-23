function adjustMove(e){"use strict";$("html, body").stop().animate({scrollTop:$(e).offset().top},500)}function topNavExpandSection(e){"use strict";$(e).hasClass("is-active")||(closeExpanded(e),opexnExpanded(e))}function toggleExpandSection(e){"use strict";$(e).hasClass("is-active")?($(e).next(accordionContent).slideUp(),$(e).removeClass("is-active")):(closeExpanded(e),openExpanded(e))}function closeExpanded(e){"use strict";$(accordionHeader).not(e).next(accordionContent).slideUp(),$(accordionHeader).not(e).removeClass("is-active")}function openExpanded(e){"use strict";$(e).next(accordionContent).slideDown("slow"),$(e).addClass("is-active")}!function(){"use strict";$(".js-accordion-trigger").bind("click",function(e){jQuery(this).parent().toggleClass("is-expanded"),e.preventDefault()})}(),$(function(){"use strict";var e=$(window).height();$(".intro").css("height",e+"px");var t=!1;if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(t=!0),t){var n={backgroundAttachment:"scroll",background:"#f7d100"};$("#skills .content").css(n)}else $(".mobile-sep").css("display","none")}),$(function(){"use strict";function e(){var e=a.scrollTop();Math.abs(n-e)<=s||(e>n&&e>i?($(".header").removeClass("nav-down").addClass("nav-up"),$("#js-centered-navigation-menu").not(":hidden")&&$("#js-centered-navigation-menu").removeAttr("style")):e+$(window).height()<$(document).height()&&$(".header").removeClass("nav-up").addClass("nav-down"),n=e)}var t,n=0,s=5,i=$(".header").outerHeight(),a=$(window);$(window).scroll(function(){t=!0}),setInterval(function(){t&&(e(),t=!1)},400),function(){0===$("body").scrollTop()?$(".header").not(".nav-down").css("top","-60px"):$(".header").css("top","0")}()});var lastId,topMenu=$("#js-navigation-menu"),topMenuHeight=topMenu.outerHeight()+15,menuItems=topMenu.find("a"),accordionSections=menuItems.map(function(){"use strict";var e=$($(this).attr("href"));return e.length?e:void 0}),accordionHeader=$(".accordion-header"),accordionContent=$(".accordion-content");menuItems.click(function(e){"use strict";e.preventDefault();{var t,n=$(this).attr("href"),s=$(n).find(accordionHeader);$(n).offset().top}s.hasClass("is-active")||(closeExpanded(s),openExpanded(s)),setTimeout(function(){t=$(".is-active"),adjustMove(t)},500)}),$(accordionHeader).click(function(e){"use strict";e.preventDefault();{var t;$(this).offset().top}toggleExpandSection(this),setTimeout(function(){t=$(".is-active"),t&&t.length&&adjustMove(t)},500)}),$(window).scroll(function(){"use strict";var e=$(this).scrollTop()+topMenuHeight,t=accordionSections.map(function(){return $(this).offset().top<e?this:void 0});t=t[t.length-1];var n=t&&t.length?t[0].id:"";lastId!==n&&(lastId=n,menuItems.parent().removeClass("active").end().filter("[href=#"+n+"]").parent().addClass("active"))}),$(document).ready(function(){"use strict";$(".scroll-on-page-link").each(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname&&this.hash.replace(/#/,"")){var e=$(this.hash),t=$("[name="+this.hash.slice(1)+"]"),n=e.length?e:t.length?t:!1;if(n){var s=n.offset().top;$(this).click(function(){return $("html, body").animate({scrollTop:s},400),!1})}}})}),$(function(){"use strict";function e(){t($(".headline.letters").find("b")),n($(".headline"))}function t(e){e.each(function(){var e=$(this),t=e.text().split(""),n=e.hasClass("is-visible");for(var s in t)t[s]=n?'<i class="in">'+t[s]+"</i>":"<i>"+t[s]+"</i>";var i=t.join("");e.html(i).css("opacity",1)})}function n(e){var t=d,n=e;if(!n.hasClass("type")){var i=n.find(".words-wrapper b"),a=0;i.each(function(){var e=$(this).width();e>a&&(a=e)}),n.find(".words-wrapper").css("width",a)}setTimeout(function(){s(n.find(".is-visible").eq(0))},t)}function s(e){var t=c(e);if(e.parents(".headline").hasClass("type")){var n=e.parent(".words-wrapper");n.addClass("selected").removeClass("waiting"),setTimeout(function(){n.removeClass("selected"),e.removeClass("is-visible").addClass("is-hidden").children("i").removeClass("in").addClass("out")},u),setTimeout(function(){i(t,l)},h)}else if(e.parents(".headline").hasClass("letters")){var f=e.children("i").length>=t.children("i").length?!0:!1;a(e.find("i").eq(0),e,f,l),o(t.find("i").eq(0),t,f,l)}else r(e,t),setTimeout(function(){s(t)},d)}function i(e,t){e.parents(".headline").hasClass("type")&&(o(e.find("i").eq(0),e,!1,t),e.addClass("is-visible").removeClass("is-hidden"))}function a(e,t,n,i){if(e.removeClass("in").addClass("out"),e.is(":last-child")?n&&setTimeout(function(){s(c(t))},d):setTimeout(function(){a(e.next(),t,n,i)},i),e.is(":last-child")&&$("html").hasClass("no-csstransitions")){var o=c(t);r(t,o)}}function o(e,t,n,i){e.addClass("in").removeClass("out"),e.is(":last-child")?(t.parents(".headline").hasClass("type")&&setTimeout(function(){t.parents(".words-wrapper").addClass("waiting")},200),n||setTimeout(function(){s(t)},d)):setTimeout(function(){o(e.next(),t,n,i)},i)}function c(e){return e.is(":last-child")?e.parent().children().eq(0):e.next()}function r(e,t){e.removeClass("is-visible").addClass("is-hidden"),t.removeClass("is-hidden").addClass("is-visible")}var d=2500,l=150,u=500,h=u+800;e()});