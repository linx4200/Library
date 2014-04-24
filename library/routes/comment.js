/**
 *评论图书页
 **/
var Book = require('../models/book'),
    borrow = require('../models/borrow'),
    favo = require('../models/favo'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function (app, checkStudent) {

    app.get('/comment/:id', checkStudent);
    app.get('/comment/:id', function (req, res) {

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

            res.render('comment', {
                user: req.session.user,
                book: thebook,
                error : req.flash('error').toString()
            });
        });
    });
};