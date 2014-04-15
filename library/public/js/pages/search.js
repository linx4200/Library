 /* 搜索结果页 JS
  * ============================== */

define(function (require, exports, module) {

    var utils = require('../components/utils'),
        page = {},
        w = utils.getUrlParam('keyword'),
        by = utils.getUrlParam('by'),
        prefix = '/search?keyword=' + w;
    
    //选择框的样式
    page.selectStyle = function () {
        $('#bOrA').find('[value="' + by + '"]').attr('selected', 'selected');
        $('#bOrA').selectpicker({style: 'btn-hg btn-primary', menuStyle: 'dropdown-inverse'});
    };

    //显示关键字
    page.keyword = function () {
        $('#skw').html(w);
    };

    //更改作者或是图书
    page.changeBorA = function () {
        $('#bOrA').change(function () {
            var val = $(this).val();
            window.location.href = prefix + '&by=' + val;
        });
    };

    page.init = function () {
        page.selectStyle();
        page.keyword();
        page.changeBorA();
    };
    
    module.exports = page;

});
