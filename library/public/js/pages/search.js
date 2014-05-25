 /* 搜索结果页 JS
  * ============================== */

define(function (require, exports, module) {

    var utils = require('../components/utils'),
        page = {},
        w = utils.getUrlParam('keyword'),
        by = utils.getUrlParam('by'),
        prefix = '/search?keyword=' + w;
    
    

    page.init = function () {
        //选择框的样式
        $('.searchWrap #bOrA').find('[value="' + by + '"]').attr('selected', 'selected');
        $('.searchWrap #bOrA').selectpicker({style: 'btn-hg btn-primary', menuStyle: 'dropdown-inverse'});

        //显示关键字
        $('#skw').html(w);

        //更改作者或是图书
        $('.searchWrap #bOrA').change(function () {
            var val = $(this).val();
            // window.location.href = '/me/' + val;
            window.location.href = prefix + '&by=' + val;
        });
    };
    
    module.exports = page;

});
