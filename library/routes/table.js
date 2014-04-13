/**
 *图书表格页
 **/
var Book = require('../models/book.js');

module.exports = function (app) {

    app.get('/table', function (req, res) {

        //获取图书
        Book.get(function (err, books) {
            if (err) {
                return res.render('table', {
                    user: req.session.user,
                    books: []
                });
            }
            res.render('table', {
                user: req.session.user,
                books : books
            });
        });
    });
};