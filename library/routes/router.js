// var crypto = require('crypto'),
//     fs = require('fs'),
//     User = require('../models/user.js'),
//     Post = require('../models/post.js'),
//     Comment = require('../models/comment.js');

var index = require('./index'),
    login = require('./login'),
    logout = require('./logout'),
    signup = require('./signup'),
    search = require('./search'),
    list = require('./list'),
    detail = require('./detail'),
    me = require('./me'),
    table = require('./table'),
    comment = require('./comment'),
    favi = require('./favi'),
    info = require('./info'),
    add = require('./add');

// function checkLogin(req, res) {
//     console.log('\n ===============  checkLogin  ============== \n');
//     if (!req.session.user) {
//         req.flash('error', '未登录!');
//         res.redirect('/login');
//     }
// }

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登录!');
        res.redirect('back');//返回之前的页面
    }
    next();
}

module.exports = function (app) {

    login(app, checkNotLogin);
    signup(app, checkNotLogin);

    //以下页面需要登录
    // app.use(checkLogin);

    index(app);
    logout(app);
    search(app);
    list(app);
    detail(app);
    me(app);
    table(app);
    comment(app);
    favi(app);
    info(app);
    add(app);

    // app.use(function (req, res) {
    //     res.render('404');
    // });
};