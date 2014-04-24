/**
 *搜索结果页
 **/

var Book = require('../models/book');

module.exports = function (app, checkLogin) {

    app.get('/search', checkLogin);
    app.get('/search', function (req, res) {
        var keyword = req.query.keyword,
            by = req.query.by || 'book';  //默认按书名搜索

        Book.search(keyword, by, function (err, books) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('search', {
                user: req.session.user,
                books : books,
                error : req.flash('error').toString()
            });
        });
    });
};