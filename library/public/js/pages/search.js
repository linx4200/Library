 /* 搜索结果页 JS
  * ============================== */

define(function (require, exports, module) {

    var page = {};
    
    //选择框的样式
    page.selectStyle = function () {
        $('#bOrA').selectpicker({style: 'btn-hg btn-primary', menuStyle: 'dropdown-inverse'});
    };

    page.init = function () {
        page.selectStyle();
    };
    
    module.exports = page;

});
