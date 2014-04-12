/**
 *新增图书页
 **/
var Book = require('../models/book.js');
module.exports = function (app) {

    app.get('/add', function (req, res) {
        res.render('add', {
            user: req.session.user
        });
    });

    app.post('/add', function (req, res) {
        var book = new Book(req.body.name, req.body.author, req.body.publisher, req.body.time, req.body.isbn, req.body.type, req.body.subType, req.body.haveNum, req.body.cover, req.body.summary, req.body.list, req.body.intro);
        book.add(function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/add');
            }
            req.flash('success', '添加图书成功!');
            res.redirect('/table');//发表成功跳转到主页
        });
    });
};