/**
 *收藏页
 **/
var Book = require('../models/book.js'),
    User = require('../models/user.js'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {

    app.get('/favo/:id', function (req, res) {

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


    app.get('/favo', function (req, res) {

        var user = req.session.user;

        User.get(user.no, function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }

            var favoBooks = user.favoBooks || [];

            //转换时间格式
            for (var i = 0, l = favoBooks.length; i < l; i++) {
                favoBooks[i].date = (new Date(Number(favoBooks[i].date))).toJSON().substring(0, 10);
            }

            res.render('favo', {
                user: user,
                books: favoBooks
            });

            
        });  
    });
};