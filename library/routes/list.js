/**
 *图书列表页
 **/

var Book = require('../models/book');

module.exports = function (app) {

    app.get('/list', function (req, res) {

        var type = req.query.type,
            subType = req.query.subtype,
            sort = req.query.sort,
            lendable = req.query.lendable,
            query = {};

        if (type) {
            query.type = type;
        }
        if (subType) {
            query.subType = subType;
        }
        if(lendable) {
            query.available = {$gt:0};
        }
        if (!sort) {
            sort = {$natural: -1};
        }
        if (sort === 'time') {
            sort.time = -1;
        }
        if (sort === 'comment') {
            sort.comment = -1;
        }

        Book.query(query, sort, function (err, books) {
            if (err) {
                return res.render('booklist', {
                    user: req.session.user,
                    books: []
                });
            }
            
            //转换出版时间格式
            for (var i = 0, l = books.length; i < l; i++) {
                books[i].time = (new Date(Number(books[i].time))).toJSON().substring(0, 10);
            }

            res.render('booklist', {
                user: req.session.user,
                books : books,
                type : type,
                subType : subType
            });
        });
    });
};