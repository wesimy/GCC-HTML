////
//Application Module
////////////////////

 var app = (function () {   
     "use strict";  
     //-----------------------------------------------------------------
     // Page Initalization handler : exposed to app.init();
     //-----------------------------------------------------------------
     var init = function () { 
           $('select').selectric();
             //_stickyNavHandler('sticky');
         },
       
         
      _stickyNavHandler = function (c) {
             $(window).scroll(function () {
                 if ($(window).scrollTop() <= 20) {
                     $('#page-hd').removeClass(c);
                 } else {
                     $('#page-hd').addClass(c);
                 }
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

