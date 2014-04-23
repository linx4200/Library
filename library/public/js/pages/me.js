 /* 搜索结果页 JS
  * ============================== */

define(function (require, exports, module) {

    var page = {};

    //计算两个日期的时间间隔 
    function compareDate(start,end){ 
        if(start === null || start.length === 0 || end === null || end.length === 0) { 
            return 0; 
        } 

        var arrs;

        arrs = start.split('-');  
        var starttime = new Date(arrs[0],parseInt(arrs[1]-1),arrs[2]);  
        var starttimes = starttime.getTime(); 

        arrs = end.split('-');  

        var endtime = new Date(arrs[0],parseInt(arrs[1]-1),arrs[2]);  
        var endtimes = endtime.getTime(); 

        var intervalTime = endtimes - starttimes;//两个日期相差的毫秒数 一天86400000毫秒 
        var Inter_Days = ((intervalTime).toFixed(2)/86400000)+1;//加1，是让同一天的两个日期返回一天 

        return Inter_Days; 
    }
    
    page.init = function () {
        var $menu = $('#menu-s');

        //显示顶部Menu
        var mePath = window.location.pathname.substring(1);
        if(mePath === 'borrow' || mePath === 'returning' || mePath === 'favo' || mePath === 'myInfo') {
            $menu.show();
            //样式
            $menu.find('[data-value="' + mePath + '"]').addClass('cur');
            if(mePath === 'returning') {
                $menu.find('[data-value="borrow"]').addClass('cur');
            }
        } else {
            $menu.hide();
        }

        //计算相距时间
        var today = (new Date()).toJSON().substring(0, 10);
        $('.interval').each(function() {
            var $this = $(this),
                end = $this.attr('data-end');

            var interval = compareDate(today, end);

            $this.html(interval);
        });

        var page = window.location.pathname.substring(1);
        //选择框的样式
        $('#returnOrNot').find('[value="' + page + '"]').attr('selected', 'selected');
        $('#returnOrNot').selectpicker({style: 'btn-hg btn-primary', menuStyle: 'dropdown-inverse'});

        //更改换了的书还是未还书
        $('#returnOrNot').change(function () {
            var val = $(this).val();
            window.location.href = '/' + val;
        });

        //收藏夹选择框
        $('#favo-select').selectpicker({style: 'btn-hg btn-primary', menuStyle: 'dropdown-inverse'});

        //收藏夹设置提醒的tooltip
        $('#remindBtn').mouseover(function () {
           $('.favoList .tooltip').show();
        }).mouseout(function () {
            $('.favoList .tooltip').hide();
        });;

        //编辑个人资料页的tooltip
        $('#myInfoForm #email').focus(function() {
            $('#myInfoForm .tooltip').show();
        }).blur(function() {
            $('#myInfoForm .tooltip').hide();
        });

        //编辑个人资料页修改密码
        $('#myInfoForm .changePwd').click(function() {
            $('#myInfoForm input[name="password"]').removeAttr('disabled');
            $('#myInfoForm .passwordRepeatWrap').show();
        });

        //编辑个人资料页没有需改不允许提交
        $('#myInfoForm input').change(function () {
            $('#myInfoForm .submitBtn').removeAttr('disabled');
        });
    };  
    
    module.exports = page;

});
