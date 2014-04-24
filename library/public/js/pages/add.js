 /* 添加书本表格JS
  * ============================== */

define(function (require, exports, module) {

    var typeConfig = require('../components/typeConfig'),
        $type = $('.addBook #type'),
        $subType = $('.addBook #subType'),
        typeList = typeConfig.typeList,
        typeListHtml,
        page = {};

    //生成副类别列表
    function createSubType ($subType, subTypeList) {
        var subTypeListHtml;

        for (var i = 0, l = subTypeList.length; i < l; i++) {
            subTypeListHtml += '<option value="' + subTypeList[i] + '">' + subTypeList[i] + '</option>';
        }

        $subType.html(subTypeListHtml);
    }
    
    page.init = function () {

        //更换副类别列表
        $type.change(function () {

            $subType.empty();

            var val = $(this).children('option:selected').val(),
                subTypeList = typeConfig[val];

            createSubType($subType, subTypeList);
        });

        //生成主类别列表
        for (var i = 0, l = typeList.length; i < l; i++) {
            typeListHtml += '<option value="' + typeList[i] + '">' + typeList[i] + '</option>';
        }

        $type.html(typeListHtml);

        if($type.attr('data-selected')) {
            $type.find('option').each(function() {
                if($(this).val() === $type.attr('data-selected')) {
                    $(this).attr('selected', 'selected');
                }
            });
            createSubType($subType, typeConfig[$type.attr('data-selected')]);
        } else {
            createSubType($subType, typeConfig[typeList[0]]);
        }

        //编辑个人资料页验证
        $('#addForm').validate({
            onBlur: true,
            eachValidField : function() {
                $(this).closest('.validateInput').removeClass('has-error').addClass('has-success');
            },
            eachInvalidField : function() {
                $(this).closest('.validateInput').removeClass('has-success').addClass('has-error');
            }
        });
    };

    module.exports = page;

});
