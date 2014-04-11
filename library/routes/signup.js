/**
 *这是注册页
 **/

var crypto = require('crypto'),
    User = require('../models/user.js');

module.exports = function (app, checkNotLogin) {

    app.get('/signup', checkNotLogin);
    app.get('/signup', function (req, res) {
        res.render('signup', {
            error: req.flash('error').toString()
        });
    });

    app.get('/signup', checkNotLogin);
    app.post('/signup', function (req, res) {
        var password = req.body.password,
            password_re = req.body['password-repeat'];

        //检验用户两次输入的密码是否一致
        if (password_re !== password) {
            req.flash('error', '两次输入的密码不一致!');
            return res.redirect('/signup');//返回注册页
        }

        //生成密码的 md5 值
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex'),
            newUser = new User({
                no: req.body.no,
                identity: req.body.identity,
                password: password
            });

        //检查用户名是否已经存在 
        User.get(newUser.no, function (err, user) {
            if (user) {
                req.flash('error', '用户已存在!');
                return res.redirect('/signup');//返回注册页
            }

            //如果不存在则新增用户
            newUser.signUpSave(function (err, user) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/signup');//注册失败返回主册页
                }
                req.session.user = user;//用户信息存入 session
                req.flash('success', '注册成功!');
                res.redirect('/');//注册成功后返回主页
            });
        });
    });
};