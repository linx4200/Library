 /* 搜索结果页 JS
  * ============================== */

define(function (require, exports, module) {

    var page = {},
        utils = require('../components/utils');

    page.init = function() {
        var $menuA = $('#menu-a');

        //menu项的高亮设置
        var adminPath = window.location.pathname.substring(1);
        if(adminPath === 'stats' || adminPath === 'people') {
            //样式切换
            $menuA.find('.cur').removeClass('cur');
            $menuA.find('[data-value="' + adminPath + '"]').addClass('cur');
        }
    }

    module.exports = page;

});
