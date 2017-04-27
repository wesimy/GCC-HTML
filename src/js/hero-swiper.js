////
//Application Module
////////////////////

var heroSwiper = (function () {
    "use strict";

    //-----------------------------------------------------------------
    // Page Initalization handler : exposed to app.init();
    //-----------------------------------------------------------------
    var init = function () {
        $('.hero-swiper').each(function (i, e) {

            var swiper = new Swiper(e, {
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                effect: 'coverflow'

            });

            $(e).data('swiper',swiper);
        });


    };
    // Expose Global Functions
    return {
        init: init
    };
})();
$().ready(function () {
    heroSwiper.init();
});

