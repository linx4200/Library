/**
 *评论图书页
 **/
var Book = require('../models/book'),
    borrow = require('../models/borrow'),
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

    app.post('/comment', checkStudent);
    app.post('/comment', function (req, res) {

        var userId = new ObjectID(req.body.user_id),
            bookId = new ObjectID(req.body.book_id),
            comment = {
                user_id: userId,
                score: req.body.score,
                content: req.body.content
            };

        Book.query({_id: bookId}, {}, function(err, books) {
            if(err) {
                req.flash('error', err);
                return res.redirect('back');
            }

            var comments,
                score,
                num;

            if(books[0].comments) {
                comments = books[0].comments;
                score = comments.score;
                num = comments.num;

                //计算新评分
                score = (score * num + score) / (num + 1);
            } else {
                score = req.body.score;
            }

            //更新Book评价
            Book.update({_id: bookId}, {
                $push: {
                    'comments.comments': comment
                },
                $set: {
                    'comments.score': score
                },
                $inc: {
                    'comments.num': 1
                }
            }, function(err) {
                if(err) {
                    req.flash('error', err);
                    return res.redirect('back');
                }

                //更新借书的评论状态为已评价
                borrow.update({
                    user_id: userId,
                    book_id: bookId
                }, {
                    $set: {
                        comment: 1
                    }
                }, function(err) {
                    if (err) {
                        req.flash('error', err);
                        return res.redirect('back');
                    }

                    res.redirect('/returning');
                });
            });

        });
    });
};