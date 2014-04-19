 /* 搜索结果页 JS
  * ============================== */

define(function (require, exports, module) {

    var page = {};
    
    page.init = function () {
        var $menu = $('#menu-s');

        if(window.location.pathname.search('me') >= 0) {
            $menu.show();
        }
    };  
    
    module.exports = page;

});
