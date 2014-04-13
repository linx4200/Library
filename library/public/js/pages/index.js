 /* 首页JS
  * ============================== */

define(function (require, exports, module) {

    var page = {};
    
    var typeConfig = require('../components/typeConfig'),
        typeList = typeConfig.typeList,
        $menu = $('#bookMenu');

    //生成图书菜单
    page.createMenu = function () {
        var listHtml;
        for (var i = 0, l = typeList.length; i < l; i++) {
            listHtml = listHtml ? listHtml + '<li data-subMenu="0" data-val="' + typeList[i] + '"><a href="/list?type=' + typeList[i] + '">' + typeList[i] + '</a><div class="bookSubMenuWrap"><ul class="bookSubMenu cf"></ul></div></li>' : '<li data-subMenu="0" data-val="' + typeList[i] + '"><a href="/list?type=' + typeList[i] + '">' + typeList[i] + '</a><div class="bookSubMenuWrap"><ul class="bookSubMenu cf"></ul></div></li>';
        }
        $menu.html(listHtml);
    };

    //生成图书副类别列表
    page.createSubType = function () {
        $menu.children('li').mouseover(function () {
            var $this = $(this),
                subListHtml,
                type = $this.attr('data-val'),
                flag = $this.attr('data-subMenu');

            if (Number(flag) === 0) {
                for (var i = 0, l = typeConfig[type].length; i < l; i++) {
                    subListHtml = subListHtml ? subListHtml + '<li><a href="/list?type=' + type + '&subtype=' + typeConfig[type][i] + '">' + typeConfig[type][i] + '</a></li>' : '<li><a href="/list?type=' + type + '&subtype=' + typeConfig[type][i] + '">' + typeConfig[type][i] + '</a></li>';
                }
                $this.find('.bookSubMenu').html(subListHtml);
                $this.attr('data-subMenu', 1);
            } else {
                $this.find('.bookSubMenuWrap').show();
            }

            
        }).mouseout(function () {
            $(this).find('.bookSubMenuWrap').hide();
        });
    };

    //搜索框focus时候的样式变化
    page.searchStyleInit = function () {
        $('.indexSwrap #search-book').focus(function () {
            $(this).parents('.input-group').addClass('focus');
        }).focusout(function () {
            $(this).parents('.input-group').removeClass('focus');
        });
    };

    page.init = function () {
        page.createMenu();
        page.createSubType();
        page.searchStyleInit();
    };
    
    module.exports = page;

});
