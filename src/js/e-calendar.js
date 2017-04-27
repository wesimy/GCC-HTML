////
//Application Module
////////////////////

var eventCalendar = (function () {
    "use strict";

    //-----------------------------------------------------------------
    // Page Initalization handler : exposed to app.init();
    //-----------------------------------------------------------------
    var init = function () {
        if($('#calendar').length>0){

            var eCal = $('#calendar').eCalendar();
            _getEvents($('#calendar').data('url'));

        }
        
    },
        _getEvents = function (url) {

            var jqxhr = $.getJSON(url, function (d) {
                $('#calendar').eCalendar({
                    events: _mapEvents(d)
                });
            })
                .fail(function () {
                    console.log("error");
                });
        },

        _mapEvents = function (list) {
            var events = [];
            $(list).each(function (i, e) {
               
                var event = { 
                    title: e.title, 
                    description: e.description, 
                    datetime: new Date(parseInt(e.date)) 
                };
                events.push(event);
            });
            return events;
        };
    // Expose Global Functions
    return {
        init: init
    };
})();
$().ready(function () {
    eventCalendar.init();
});





/**
 * @license e-Calendar v0.9.3
 * (c) 2014-2016 - Jhonis de Souza
 * License: GNU
 */

(function ($) {

    var eCalendar = function (options, object) {
        // Initializing global variables
        var adDay = new Date().getDate();
        var adMonth = new Date().getMonth();
        var adYear = new Date().getFullYear();
        var dDay = adDay;
        var dMonth = adMonth;
        var dYear = adYear;
        var instance = object;

        var settings = $.extend({}, $.fn.eCalendar.defaults, options);

        function lpad(value, length, pad) {
            if (typeof pad == 'undefined') {
                pad = '0';
            }
            var p;
            for (var i = 0; i < length; i++) {
                p += pad;
            }
            return (p + value).slice(-length);
        }

        var mouseOver = function () {
            $(this).addClass('c-nav-btn-over');
        };
        var mouseLeave = function () {
            $(this).removeClass('c-nav-btn-over');
        };
        var mouseOverEvent = function () {
            $(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event-item[data-event-day="' + d + '"]').addClass('c-event-over');
        };
        var mouseLeaveEvent = function () {
            $(this).removeClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event-item[data-event-day="' + d + '"]').removeClass('c-event-over');
        };
        var mouseOverItem = function () {
            $(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').addClass('c-event-over');
        };
        var mouseLeaveItem = function () {
            $(this).removeClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').removeClass('c-event-over');
        };
        var nextMonth = function () {
            if (dMonth < 11) {
                dMonth++;
            } else {
                dMonth = 0;
                dYear++;
            }
            print();
        };
        var previousMonth = function () {
            if (dMonth > 0) {
                dMonth--;
            } else {
                dMonth = 11;
                dYear--;
            }
            print();
        };

        function loadEvents() {
            if (typeof settings.url != 'undefined' && settings.url !== '') {
                $.ajax({
                    url: settings.url,
                    async: false,
                    success: function (result) {
                        settings.events = result;
                    }
                }); 
            }
        }

        function print() {
            loadEvents();
            var dWeekDayOfMonthStart = new Date(dYear, dMonth, 1).getDay() - settings.firstDayOfWeek;
            if (dWeekDayOfMonthStart < 0) {
                dWeekDayOfMonthStart = 6 - ((dWeekDayOfMonthStart + 1) * -1);
            }
            var dLastDayOfMonth = new Date(dYear, dMonth + 1, 0).getDate();
            var dLastDayOfPreviousMonth = new Date(dYear, dMonth + 1, 0).getDate() - dWeekDayOfMonthStart + 1;

            var cHeader = $('<div/>').addClass('c-header clearfix');
            var cBody = $('<div/>').addClass('c-grid');
            var cEvents = $('<div/>').addClass('c-event-grid');
            var cEventsBody = $('<div/>').addClass('c-event-body');
            //cEvents.append($('<div/>').addClass('c-event-title c-pad-top').html(settings.eventTitle));
            cEvents.append(cEventsBody);
            var cNext = $('<div/>').addClass('c-next c-grid-title c-pad-top');
            var cMonth = $('<div/>').addClass('c-month c-grid-title c-pad-top');
            var cPrevious = $('<div/>').addClass('c-previous c-grid-title c-pad-top');
            cPrevious.html(settings.textArrows.previous);
            cMonth.html(settings.months[dMonth] + ' ' + dYear);
            cNext.html(settings.textArrows.next);

            cPrevious.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', previousMonth);
            cNext.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', nextMonth);

            cHeader.append(cPrevious);
            cHeader.append(cMonth);
            cHeader.append(cNext);
            var dayOfWeek = settings.firstDayOfWeek;
            for (var i = 0; i < 7; i++) {
                if (dayOfWeek > 6) {
                    dayOfWeek = 0;
                }
                var cWeekDay = $('<div/>').addClass('c-week-day c-pad-top');

                cBody.append(cWeekDay);
                dayOfWeek++;
            }
            var day = 1;
            var dayOfNextMonth = 1;
            for (var i = 0; i < 42; i++) {
                var cDay = $('<div/>');
                var cDayWrp = $('<div/>');
                cDayWrp.addClass('c-day-wrp');

                if (i < dWeekDayOfMonthStart) {
                    cDay.addClass('c-day-previous-month c-pad-top');
                    cDayWrp.html(dLastDayOfPreviousMonth++);
                } else if (day <= dLastDayOfMonth) {
                    cDay.addClass('c-day c-pad-top');
                    if (day == dDay && adMonth == dMonth && adYear == dYear) {
                        cDay.addClass('c-today');
                    }
                    for (var j = 0; j < settings.events.length; j++) {
                        var d = settings.events[j].datetime;
                        if (d.getDate() == day && d.getMonth() == dMonth && d.getFullYear() == dYear) {
                            cDay.addClass('c-event').attr('data-event-day', d.getDate());
                            cDay.on('mouseover', mouseOverEvent).on('mouseleave', mouseLeaveEvent);
                        }
                    }
                    cDayWrp.html(day++);
                } else {
                    cDay.addClass('c-day-next-month c-pad-top');
                    cDayWrp.html(dayOfNextMonth++);
                }
                cDay.append(cDayWrp);
                cBody.append(cDay);
            }
            var eventList = $('<div/>').addClass('c-event-list');
            for (var i = 0; i < settings.events.length; i++) {
                var d = settings.events[i].datetime;

                if (d.getMonth() == dMonth && d.getFullYear() == dYear) {
                    var date = lpad(d.getDate(), 2) + '/' + lpad(d.getMonth() + 1, 2) + ' ' + lpad(d.getHours(), 2) + ':' + lpad(d.getMinutes(), 2);
                    var item = $('<div/>').addClass('c-event-item clearfix');
                    var datebox = $('<div/>').addClass('date-box').html('<time><span>' + d.getDate() + '</span>' + settings.monthsAppr[d.getMonth()] + '</time>');
                    var title = $('<div/>').addClass('title').html(settings.events[i].title);
                    var description = $('<div/>').addClass('description').html(settings.events[i].description + '<br/>');
                    var eventbox = $('<div/>').addClass('event-box');
                    item.attr('data-event-day', d.getDate());
                    item.on('mouseover', mouseOverItem).on('mouseleave', mouseLeaveItem);
                    eventbox.append(title).append(description);
                    item.append(datebox).append(eventbox);

                    // Add the url to the description if is set
                    if (settings.events[i].url !== undefined) {
                        /**
                         * If the setting url_blank is set and is true, the target of the url
                         * will be "_blank"
                         */
                        type_url = settings.events[i].url_blank !== undefined &&
                            settings.events[i].url_blank === true ?
                            '_blank' : '';
                        description.wrap('<a href="' + settings.events[i].url + '" target="' + type_url + '" ></a>');
                    }

                    eventList.append(item);
                }
            }
            $(instance).addClass('calendar');
            cEventsBody.append(eventList);
            $(instance).html(cBody).prepend(cHeader).append(cEvents);
        }

        return print();
    };

    $.fn.eCalendar = function (oInit) {
        return this.each(function () {
            return eCalendar(oInit, $(this));
        });
    };

    // plugin defaults
    $.fn.eCalendar.defaults = {
        weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsAppr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        textArrows: { previous: ' ', next: ' ' },
        eventTitle: 'Eventos',
        url: '',
        events: [
            { title: 'Evento de Abertura', description: 'Abertura das Olimpíadas Rio 2016', datetime: new Date(2016, new Date().getMonth(), 12, 17) },
            { title: 'Tênis de Mesa', description: 'BRA x ARG - Semifinal', datetime: new Date(2016, new Date().getMonth(), 23, 16) },
            { title: 'Ginástica Olímpica', description: 'Classificatórias de equipes', datetime: new Date(2016, new Date().getMonth(), 31, 16) }
        ],
        firstDayOfWeek: 0
    };

}(jQuery));