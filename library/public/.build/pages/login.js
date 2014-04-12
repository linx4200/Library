/* 添加书本表格JS
  * ============================== */
define("pages/login", [], function(require, exports, module) {
    var page = {};
    page.init = function() {
        $(".login-screen").height(window.innerHeight);
    };
    module.exports = page;
});