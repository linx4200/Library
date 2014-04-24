 /* 搜索结果页 JS
  * ============================== */

define(function (require, exports, module) {

    var page = {};
    
    page.init = function () {
        $('.removeBookBtn').click(function(e) {
            e.preventDefault();
            $('.removeWarning').show();
        });

        $('.cancelRemoveBtn').click(function(e) {
            e.preventDefault();
            $('.removeWarning').hide();
        });
    };  
    
    module.exports = page;

});
