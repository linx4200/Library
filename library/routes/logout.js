/**
 *这是登录页
 **/

module.exports = function (app) {

    app.get('/logout', function (req, res) {
        req.session.user = null;
        req.flash('success', '登出成功!');
        res.redirect('/login');//登出成功后跳转到主页
    });
};