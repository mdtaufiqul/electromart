

/*
* ----------------------------------------------------------------------------------------
    Template Name: mr stater
    Template URI: https://spellbit.com/
    Description: 
    Author: mahedi amin
    Author URI: https://mahediamin.com
    Version: 1.0.0



    -------------INDEX----------------
   01.Mobile Menu
   02.Sticky Menu
   03.All Owl Slider
   04.Offcanvas
   05. Counter
   06. scroll up
   07. Magnify active
   08. Preloder Active
   09. WOW Active
   10. PROGRESSBAR ACTIVATION
   11. Tooltip activation
   12. ui activation
   13. Filter Acitve
   14. Select Two Activation
   15. Paralx Init

* ----------------------------------------------------------------------------------------
*/


! function ($) {
    'use strict';
    jQuery(document).on("ready", function () {


        /*---------------====================
     01.Mobile Menu 
     ================-------------------*/
        if ($(window).width() < 991.98) {
            $(".menu-item-has-children > a").on("click", function () {


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


        // menu menu active link

        $(".main-menu ul li").on("click", function () {

            $(".main-menu ul li").removeClass("active");
            $(this).addClass("active");

        });


        // mobile menu click
        $(".menu-click").on("click", function () {

            $(".main-menu").toggleClass('active-mobile-menu');
            $(".rt-mobile-menu-overlay").addClass("active")
            return false;
        });

        $(".rt-mobile-menu-close, .rt-mobile-menu-overlay").on("click", function () {

            $(".main-menu").removeClass('active-mobile-menu');
            $(".rt-mobile-menu-overlay").removeClass("active")
            return false;
        });


        $('a.smooth-scroll').on("click", function (e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 70
            }, 1200, 'easeInOutExpo');
            e.preventDefault();
        });
        $('body').scrollspy({
            target: '.navbar-collapse',
            offset: 195
        });

        $(".navbar-toggler").on('click', function () {

            $(".navbar-toggler").toggleClass("cg");
        });

        $('.open-creatac').on("click", function () {
            $(".rt-modal-input.two , .rt-modal-headr.two").addClass("show-cac");
            $(".rt-modal-input.one, .rt-modal-headr.one").addClass("hide-cac");
        });


        $(".rt-one-page-menu ul > li.nav-item > a.nav-link").on('click',
            function () {

                $(".navbar-collapse").removeClass("show");
                $(".navbar-toggler").removeClass("cg");
            });


        /*---------------====================
       02.Sticky Menu
       ================-------------------*/


        function stickyHeader() {
            let mainheader = $('.rt-sticky'),
                height = mainheader.outerHeight(),
                scroll = $(document).scrollTop();
            $(window).on('load', function () {
                if ($(document).scrollTop() > height) {
                    if (mainheader.hasClass('rt-sticky-active')) {
                        mainheader.removeClass('rt-sticky-active');
                    } else {
                        mainheader.addClass('rt-sticky-active');
                    }
                }
            });
            $(window).on('scroll', function () {
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


        $(".rt-search-open").on("click", function () {
            $(".rt-hidden-search").addClass("rt-search-active");
        });
        $(".rt-search-close").on("click", function () {
            $(".rt-hidden-search").removeClass("rt-search-active");
        });

        $('.rt-btn').on('mouseenter', function (e) {

            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;

            if ($(this).find('.btn-revel-effects ')) {
                $('.rt-btn .btn-revel-effects ').css({
                    top: relY,
                    left: relX,
                });
            }
        });

        /*---------------====================
    03.All  Slider
    ================-------------------*/
        var $status = $('.numbercount');
        var $slickElement = $('.rt-slider-active');

        $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.text('0'+i + '/' + 0+slick.slideCount);
        });
        if ($(".rt-slider-active").length > 0) {
            $('.rt-slider-active').slick({

                slidesToShow: 1,
                autoplay: false,
                fade: true,
                infinite: true,
                arrows: false,
                dots: true,

            }).slickAnimation();
        }

        /*---------------====================
    04.Offcanvas
    ================-------------------*/

        $(".open-offcanvasmenu").on("click", function () {
            $(".rt-sidnav, .rt-overlay").addClass("active");
            $("body").addClass("sidenavOpen");
        });

        $(".sidenav-close, .rt-overlay").on("click", function () {

            $(".rt-sidnav, .rt-overlay").removeClass("active");
            $("body").removeClass("sidenavOpen");
        });
        $(".open-cart-opt").on("click", function () {
            $(".rt-cart-box, .cart-overlay").addClass("active");
            $("body").addClass("cartboxopen");
        });

        $(".cartbox-close, .cart-overlay").on("click", function () {

            $(".rt-cart-box, .cart-overlay").removeClass("active");
            $("body").removeClass("cartboxopen");
        });

        $(".rt-sidnav, .rt-cart-box, .cart-products").overlayScrollbars({
            //className: "os-theme-light",
        });

        /*---------------====================
          05.Counter
          ================-------------------*/

        $('.counter').counterUp({
            delay: 10,
            time: 5000
        });

        /*---------------====================
          06.scroll up
          ================-------------------*/
        $.scrollUp({
            scrollText: '<i class="fa fa-angle-up"></i>',
            scrollSpeed: 1500,
            animation: 'slide',
            easingType: 'easeInQuint'

        });

        /*---------------====================
      07.Magnify active
      ================-------------------*/

        $('.playVideo').magnificPopup({
            type: 'iframe',
            removalDelay: 300,
            mainClass: 'mfp-fade'
        });


        $('.img-popup').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });


        /*---------------====================
          08.Preloder Active
          ================-------------------*/
        if ($(".rt-preloder").length > 0) {
            jQuery(window).load(function () {
                jQuery(".rt-preloder").fadeOut(300);
            });
        }


        /*---------------====================
       09.WOW Active
 ================-------------------*/
        if ($('.wow').length) {
            var wow = new WOW({
                boxClass: 'wow', // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 0, // distance to the element when triggering the animation (default is 0)
                mobile: false, // trigger animations on mobile devices (default is true)
                live: true // act on asynchronously loaded content (default is true)
            });
            wow.init();
        }


        /*
          ==========================================
         10. PROGRESSBAR ACTIVATION
          ==========================================
          */

        $(".progress").each(function () {
            var e = $(this).attr("data-percent"),
                t = $(this).prev(".progress-title"),
                a = $(this).children(".progress-title");
            t.length > 0 ? t.css("width", e) : a.length > 0 && a.css("width", e), $(this).appear(function () {
                $(this).find(".progress-bar").animate({
                    width: e
                }, 500)
            })
        });


        /*
                ==========================================
             11. Tooltip activation
              ==========================================
              */
        $('[data-toggle="tooltip"]').tooltip();

        tippy.setDefaults({
            arrow: true,
            delay: 40,
            placement: 'top',
            animation: 'perspective',

        });

        /*
            ==========================================
         12. ui activation
          ==========================================
          */

        $(".rt-date-picker").datepicker();

        $(".slider-range").slider({
            range: true,
            min: 40,
            max: 600,
            values: [160, 500],
            slide: function (event, ui) {
                $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });

        $(".amount").val("$" + $(".slider-range").slider("values", 0) +
            " - $" + $(".slider-range").slider("values", 1));

        /*---------------====================
                13. Filter Acitve
                ================-------------------*/
        $('.grid').imagesLoaded(function () {
            var $grid = $('.grid').isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1,
                }
            });
        });
        $('.filter-list').on('click', 'li',
            function () {
                $('.filter-list li').removeClass(
                    'active');
                $(this).addClass('active');
                var filterValue = $(this).attr(
                    'data-filter');
                $('.grid').isotope({
                    filter: filterValue
                });
                $(window).trigger('resize');
            });

        /*
          ======== 14.Select Two Activation =========
        */


        $('.rt-selectactive').select2({
            minimumResultsForSearch: Infinity,
        });

        /*
          ======== 15.Paralx Init =========
        */
        function initparallax() {
            var a = {
                Android: function Android() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function BlackBerry() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function iOS() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function Opera() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function Windows() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function any() {
                    return a.Android() || a.BlackBerry() || a.iOS() || a.Opera() || a.Windows();
                }
            };
            var trueMobile = a.any();

            if (null == trueMobile) {
                var b = new Scrollax();
                b.reload();
                b.init();
            }
        }

        initparallax();


        $(".single-rt-banner").mousemove(function (e) {
            // parallaxIt(e, ".leave_move_1", 30);
            // parallaxIt(e, ".leave_move_2", 40);
            // parallaxIt(e, ".leave_move_3", -50);
            // parallaxIt(e, ".text_move_1", -20);
        });

        function parallaxIt(e, target, movement) {
            var $this = $(".single-rt-banner");
            var relX = e.pageX - $this.offset().left;
            var relY = e.pageY - $this.offset().top;

            TweenMax.to(target, 1, {
                x: (relX - $this.width() / 2) / $this.width() * movement,
                y: (relY - $this.height() / 2) / $this.height() * movement
            });
        }
        if ($(".simply-countdown-one").length > 0) {
            simplyCountdown('.simply-countdown-one', {
                year: "2020",
                month: "12",
                day: "07",
                words: { //words displayed into the countdown
                    days: 'days',
                    hours: 'hours',
                    minutes: 'minutes',
                    seconds: 'seconds',
                },
                plural: false, //use plurals
                zeroPad: true,
            });
        }


    });
}(jQuery);

