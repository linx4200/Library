/**
 *图书表格页
 **/
var Book = require('../models/book.js');

module.exports = function (app) {

    app.get('/table', function (req, res) {

        var type = req.query.type,
            subType = req.query.subtype,
            query = {};

        if (type) {
            query.type = type;
        }
        if (subType) {
            query.subType = subType;
        }

        //获取图书
        Book.query(query, {$natural: -1}, function (err, books) {
            if (err) {
                return res.render('table', {
                    user: req.session.user,
                    books: []
                });
            }
            res.render('table', {
                user: req.session.user,
                books : books,
                type : type,
                subType : subType
            });
        });
    });
};