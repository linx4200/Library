/**
 *图书详细页
 **/

var Book = require('../models/book'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {

    app.get('/detail/:id', function (req, res) {

        var id = req.params.id,
            query = {
                _id: new ObjectID(id)
            };

        Book.query(query, {}, function (err, books) {
            if (err) {
                // return res.render('booklist', {
                //     user: req.session.user,
                //     books: []
                // });
            }

            var thebook = books[0];

            //转换出版时间格式
            thebook.time = (new Date(Number(thebook.time))).toJSON().substring(0, 10);

            res.render('detail', {
                user: req.session.user,
                book: thebook
            });
        });
    });
};