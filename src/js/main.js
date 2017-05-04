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
         
         _sidebarHandler = function(){
              $("#dashboard-sidebar dl").niceScroll();
         };
         // Expose Global Functions
     return {
         init: init
     };
 })();
 $().ready(function () {
     app.init();
     
 });

