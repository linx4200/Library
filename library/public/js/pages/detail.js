 /* 详情页JS
  * ============================== */

define(function (require, exports, module) {

    var page = {};

    
    page.init = function () {

        //图书介绍和评价的切换
        $('.toggleTitle .title').click(function() {
            var $this = $(this),
                $target = $('.' + $this.attr('data-target')),
                $hide = $('.' + $this.attr('data-hide'));

            $target.show();
            $hide.hide();

            $this.addClass('active').siblings('.active').removeClass('active');
        });
        
    };

    module.exports = page;

});
