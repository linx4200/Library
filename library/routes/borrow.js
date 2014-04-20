/**
 *新增图书页
 **/
var Book = require('../models/book.js'),
    User = require('../models/user.js'),
    config = require('../config'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {

    app.get('/borrow/:id', function (req, res) {

        var bookId = new ObjectID(req.params.id),
            user = req.session.user;
        
        //如果超出上限就不允许借书
        if(user.borrowBooks && user.borrowBooks.length > config.maxBorrowNum) {
            req.flash('error', '超出借书限额');
            res.redirect('back');
        } else {
            //没有超出就走正常流程
            //先查询书本的相关信息
            Book.query({'_id': bookId}, {}, function(err, book) {
                if(err) {
                    req.flash('error', 'err');
                    res.redirect('back');
                }
                var theBook = {
                    id: bookId,
                    name: book[0].name,
                    author: book[0].author,
                    cover: book[0].cover,
                    date: (new Date()).valueOf(),
                    returnDate: (new Date()).valueOf() + config.returnDays
                };

                User.update({no: user.no}, {$push: {borrowBooks: theBook}}, function (err) {
                    if (err) {
                        req.flash('error', err);
                        res.redirect('back');
                    }
                    
                    //图书相应-1
                    Book.update({
                        _id : bookId
                    }, {
                        $inc : {available: -1}
                    }, function (err) {
                        if (err) {
                            req.flash('error', err);
                            res.redirect('back');
                        }
                        res.redirect('/borrow');
                    });
                });
            });
        }
        
    });


    app.get('/borrow', function (req, res) {

        var user = req.session.user;

        User.get(user.no, function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }

            var borrowBooks = user.borrowBooks || [];

            //转换时间格式
            for (var i = 0, l = borrowBooks.length; i < l; i++) {
                borrowBooks[i].date = (new Date(Number(borrowBooks[i].date))).toJSON().substring(0, 10);
                borrowBooks[i].returnDate = (new Date(Number(borrowBooks[i].returnDate))).toJSON().substring(0, 10);
            }

            res.render('borrow', {
                user: user,
                books: borrowBooks,
                page: 'borrow'
            });

            
        });  
    });
};