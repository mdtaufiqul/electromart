/*
    Template Name: 
    Template URI: 
    Description: 
    Author: mahedi amin
    Author URI: 
    Version: 1.0.0

-------------INDEX----------------
    01.Mobile Menu & nav Tools
    02.Sticky 
    03.Offcanvas
    04. scroll up
*/


/* 01.Mobile Menu & nav Tools */

if ($(window).width() < 991.98) {
    $(".menu-item-has-children > a").on("click", function() {
        var element = $(this).parent("li");
        if (element.hasClass("open")) {
            element.removeClass("open");
            element.find("li").removeClass("open");
            element.find("ul").slideUp(500);
            element.find(".rt-mega-menu").slideUp(500);
        } else {
            element.addClass("open");
            element.children("ul").slideDown(500);
            element.children(".rt-mega-menu").slideDown(500);
            element.siblings("li").children("ul").slideUp();
            element.siblings("li").removeClass("open");
            element.siblings("li").find("li").removeClass("open");
            element.siblings("li").find("ul").slideUp();
        }
    });
}

/* 02.sticky */
function stickyHeader() {
    let mainheader = $('.rt-sticky'),
        height = mainheader.outerHeight(),
        scroll = $(document).scrollTop();
    $(window).on('load', function() {
        if ($(document).scrollTop() > height) {
            if (mainheader.hasClass('rt-sticky-active')) {
                mainheader.removeClass('rt-sticky-active');
            } else {
                mainheader.addClass('rt-sticky-active');
            }
        }
    });
    $(window).on('scroll', function() {
        let scrolled = $(document).scrollTop(),
            header = $('.rt-sticky-active');
        if (scrolled > scroll) {
            header.addClass('sticky');
        } else {
            header.removeClass('sticky');
        }
        if (scrolled === 0) {
            mainheader.removeClass('rt-sticky-active');
        } else {
            mainheader.addClass('rt-sticky-active');
        }
        scroll = $(document).scrollTop();
    });
}

if ($(window).width() > 991.98) {
    stickyHeader();
}