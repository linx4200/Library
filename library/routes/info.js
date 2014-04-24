/**
 *编辑资料页
 **/

var User = require('../models/user'),
    crypto = require('crypto');

module.exports = function (app, checkStudent) {

    app.get('/myInfo', checkStudent);
    app.get('/myInfo', function (req, res) {
        res.render('myInfo', {
            user: req.session.user
        });
    });

    app.post('/myInfo', checkStudent);
    app.post('/myInfo', function (req, res) {

        var user = req.session.user,
            update = {
                $set: {}
            };

        if(req.body.nickname) {
           update.$set.nickname = req.body.nickname;
        }
        if(req.body.email) {
           update.$set.email = req.body.email;
        }

        var password = req.body.password,
            password_re = req.body['password-repeat'];
        if(password || password_re) {
            //检验用户两次输入的密码是否一致
            if (password_re !== password) {
                req.flash('error', '两次输入的密码不一致!');
                return res.redirect('/myInfo');//返回注册页
            }
            //生成密码的 md5 值
            var md5 = crypto.createHash('md5');

            password = md5.update(req.body.password).digest('hex');

            update.$set.password = password;

        }

        User.update({no:user.no}, update, function(err) {
            if(err) {
                req.flash('error', err);
                res.redirect('/myInfo');
            }

            User.query({no: user.no}, {}, function(err, user) {
                if(err) {
                    req.flash('error', err);
                    res.redirect('/myInfo');
                }
                res.render('myInfo', {
                    user: user[0]
                });
            });
        });
    });
};