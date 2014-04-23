 /* 登陆框JS
  * ============================== */

define(function (require, exports, module) {

    var page = {};
    
    page.init = function () {
        $('.login-screen').height(window.innerHeight);

        //切换提示语
        $('input[name="identity"]').change(function() {
            var identity = $('input[name="identity"]:checked').val();
            if(identity === 'student') {
                $('input[name="no"]').attr('placeholder', '请输入学号');
            } else if(identity === 'admin') {
                $('input[name="no"]').attr('placeholder', '请输入工号');
            }
        });
        

        $('#signUpForm, #login-form').validate({
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
