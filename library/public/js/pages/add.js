 /* 添加书本表格JS
  * ============================== */

define(function (require, exports, module) {

    var typeConfig = require('../components/typeConfig'),
        $type = $('.addBook #type'),
        $subType = $('.addBook #subType'),
        typeList = typeConfig.typeList,
        typeListHtml,
        page = {};

    //生成主类别列表
    page.createType = function () {
        for (var i = 0, l = typeList.length; i < l; i++) {
            typeListHtml += '<option value="' + typeList[i] + '">' + typeList[i] + '</option>';
        }

        $type.html(typeListHtml);
    };

    //生成副类别列表
    page.createSubType = function () {
        var subTypeListHtml;
        for (var i = 0, l = typeConfig[typeList[0]].length; i < l; i++) {
            subTypeListHtml += '<option value="' + typeConfig[typeList[0]][i] + '">' + typeConfig[typeList[0]][i] + '</option>';
        }

        $subType.html(subTypeListHtml);
    };

    //更换副类别列表
    page.changeSubType = function () {
        $type.change(function () {

            $subType.empty();

            var val = $(this).children('option:selected').val(),
                subTypeList = typeConfig[val],
                subTypeListHtml;

            for (var i = 0, l = subTypeList.length; i < l; i++) {
                subTypeListHtml += '<option value="' + subTypeList[i] + '">' + subTypeList[i] + '</option>';
            }

            $subType.html(subTypeListHtml);
        });
    };
    
    page.init = function () {
        page.createType();
        page.createSubType();
        page.changeSubType();
    };

    module.exports = page;

});
