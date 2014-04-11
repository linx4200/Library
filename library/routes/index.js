/**
 *首页
 **/

module.exports = function (app) {

    app.get('/', function (req, res) {

        //判断是否登录了
        if (req.session.user) {
            //如果登陆了
            res.render('index', {
                user: req.session.user
            });
        } else {
            //如果没有登录,跳转到登录页面
            res.redirect('/login');
        }
        
    });
    
};