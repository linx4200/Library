/**
 *搜索结果页
 **/

var Book = require('../models/book');

module.exports = function (app) {

    app.get('/search', function (req, res) {
        Book.search(req.query.keyword, function (err, books) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('search', {
                user: req.session.user,
                books : books
            });
        });
    });
};