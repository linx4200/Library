/* 添加书本表格JS
  * ============================== */
define("pages/add", [ "../components/typeConfig" ], function(require, exports, module) {
    var typeConfig = require("../components/typeConfig"), $type = $(".addBook #type"), typeList = typeConfig.typeList, typeListHtml, page = {};
    //生成主类别列表
    page.createType = function() {
        for (var i = 0, l = typeList.length; i < l; i++) {
            typeListHtml += '<option value="' + typeList[i] + '">' + typeList[i] + "</option>";
        }
        $type.html(typeListHtml);
    };
    //生成副类别列表
    page.createSubType = function() {
        $type.change(function() {});
    };
    page.init = function() {
        page.createType();
        page.createSubType();
    };
    module.exports = page;
});