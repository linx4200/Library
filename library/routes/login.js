/**
 *这是登录页
 **/

var crypto = require('crypto'),
    User = require('../models/user.js');

module.exports = function (app, checkNotLogin) {

    app.get('/login', checkNotLogin);
    app.get('/login', function (req, res) {
        res.render('login', {
            error : req.flash('error').toString()
        });
    });

    app.post('/login', checkNotLogin);
    app.post('/login', function (req, res) {
        //生成密码的 md5 值
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');

        //检查用户是否存在
        User.get(req.body.no, function (err, user) {
            if (!user) {
                req.flash('error', '用户不存在!');
                return res.redirect('/login');//用户不存在则跳转到登录页
            }

            //检查密码是否一致
            if (user.password !== password) {
                req.flash('error', '密码错误!');
                return res.redirect('/login');//密码错误则跳转到登录页
            }

            //用户名密码都匹配后，将用户信息存入 session
            req.session.user = user;
            req.flash('success', '登陆成功!');
            res.redirect('/');//登陆成功后跳转到主页
        });
    });
};