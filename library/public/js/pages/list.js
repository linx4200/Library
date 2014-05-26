 /* 书本列表JS
  * ============================== */

define(function (require, exports, module) {

    var utils = require('../components/utils'),
        sort = utils.getUrlParam('sort'),
        type = utils.getUrlParam('type'),
        subtype = utils.getUrlParam('subtype'),
        lendable = utils.getUrlParam('lendable'),
        page = {};

    function generateHref(type, subtype, sort, lendable) {
        var href = '/list?type=' + type;

        if(subtype) {
            href += '&subtype=' + subtype;
        }
        if(sort) {
            href += '&sort=' + sort;
        }
        if(lendable) {
            href += '&lendable=' + lendable;
        }
        return href;

    }

    
    
    page.init = function () {
        //初始化filter排序选项的样式
        if (!sort) {
            $('#sort-default').addClass('active');
        } else if (sort === 'time') {
            $('#sort-time').addClass('active');
        } else if (sort === 'comment') {
            $('#sort-comment').addClass('active');
        }
        if(lendable) {
            $('.lendableLabel').addClass('checked');
        }

        //只显示可借图书
        $('#lendable').change(function() {
            var href;
            if($('.lendableLabel').hasClass('checked')) {

                href = generateHref(type, subtype, sort, true);
            } else {
                href = generateHref(type, subtype, sort, false);
            }
            window.location.href = href;
        });
    };

    module.exports = page;

});
