/**
 *图书列表页
 **/

var Book = require('../models/book');

module.exports = function (app) {

    app.get('/list', function (req, res) {

        var type = req.query.type,
            subType = req.query.subtype,
            sort = req.query.sort,
            query = {};

        if (type) {
            query.type = type;
        }
        if (subType) {
            query.subType = subType;
        }
        if (sort) {
            query.sort = sort;
        }

        Book.query(query, function (err, books) {
            if (err) {
                return res.render('booklist', {
                    user: req.session.user,
                    books: []
                });
            }
            res.render('booklist', {
                user: req.session.user,
                books : books,
                type : type,
                subType : subType,
            });
        });


        
    });
};