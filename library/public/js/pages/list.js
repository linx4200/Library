 /* 书本列表JS
  * ============================== */

define(function (require, exports, module) {

    var utils = require('../components/utils'),
        sort = utils.getUrlParam('sort'),
        page = {};

    //初始化filter排序选项的样式
    page.filterStyle = function () {
        if (!sort) {
            $('#sort-default').addClass('active');
        } else if (sort === 'time') {
            $('#sort-time').addClass('active');
        } else if (sort === 'recommand') {
            $('#sort-recommand').addClass('active');
        }
    };
    
    page.init = function () {
        page.filterStyle();
    };

    module.exports = page;

});
