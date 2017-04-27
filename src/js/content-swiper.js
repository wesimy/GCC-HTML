////
//Application Module
////////////////////

var contentSwiper = (function () {
    "use strict";

    //-----------------------------------------------------------------
    // Page Initalization handler : exposed to app.init();
    //-----------------------------------------------------------------
    var init = function () {
        $('.content-swiper').each(function (i, e) {

            var swiper = new Swiper(e, {
                slidesPerView: 'auto',
                spaceBetween: 20,
                
            });

            $(e).data('swiper', swiper);
        });


    };
    // Expose Global Functions
    return {
        init: init
    };
})();
$().ready(function () {
    contentSwiper.init();
});

