////
//Application Module
////////////////////

var app = (function () {
    "use strict";
    //-----------------------------------------------------------------
    // Page Initalization handler : exposed to app.init();
    //-----------------------------------------------------------------
    var init = function () {
            $('select:not([multiple])').selectric();
            _sidebarHandler();
            //_stickyNavHandler('sticky');
            _timePickerHandler();

        },
        _timePickerHandler = function () {

            $('.timepicker_hours').each(function (i, e) {
                if ($(e).attr('name') == 'FromHour') {
                    $(e).timepicker({
                        showMinutes: false,
                        showPeriod: true,
                        showLeadingZero: true,
                        onSelect: function () {
                            $("input[name='ToHour']").timepicker('option', {
                                minTime: {
                                    hour: $(e).timepicker('getHour')
                                }
                            });
                        }
                    });
                }
                if ($(e).attr('name') == 'ToHour') {
                    $(e).timepicker({
                        showMinutes: false,
                        showPeriod: true,
                        showLeadingZero: true,
                        onSelect: function () {
                            $("input[name='FromHour']").timepicker('option', {
                                maxTime: {
                                    hour: $(e).timepicker('getHour')
                                }
                            });
                        }

                    });
                }
            });


            $('.timepicker_minutes').timepicker({
                showHours: false,
            });



        },

        _stickyNavHandler = function (c) {
            $(window).scroll(function () {
                if ($(window).scrollTop() <= 20) {
                    $('#page-hd').removeClass(c);
                } else {
                    $('#page-hd').addClass(c);
                }
            });
        },

        _sidebarHandler = function () {
            $("#dashboard-sidebar dl").slimScroll({
                height: '100%'
            });
        };
    // Expose Global Functions
    return {
        init: init
    };
})();
$().ready(function () {
    app.init();

});