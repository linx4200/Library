/**
 *还书页
 **/
var Book = require('../models/book'),
    User = require('../models/user'),
    borrow = require('../models/borrow'),
    config = require('../config'),
    ObjectID = require('mongodb').ObjectID,
    extend = require('util')._extend;

module.exports = function (app) {

    app.get('/returning/:id', function (req, res) {

        var bookId = new ObjectID(req.params.id),
            user = req.session.user;
        
        User.get(user.no, function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }

            //更新借书记录
            borrow.borrow(user._id, bookId, function () {

                //更新user.borrowBookNum
                User.update({no: user.no}, {$inc : {borrowBookNum: 1}}, function(err) {
                    if (err) {
                        req.flash('error', err);
                        return res.redirect('back');
                    }

                    //更新book.available
                    Book.update({_id: bookId}, {$inc : {available: -1}}, function(err) {
                        if (err) {
                            req.flash('error', err);
                            return res.redirect('/back');
                        }

                        // req.flash('error', err);
                        res.redirect('back');
                    });
                });
            });


        });
        
    });

    // app.get('/returning/:id', function (req, res) {

    //     var bookId = new ObjectID(req.params.id),
    //         user = req.session.user;

    //     //先找出要还的那本书
    //     User.query({no: user.no}, {}, function(err, user) {
    //         if(err) {
    //             req.flash('error', 'err');
    //             res.redirect('back');
    //         }

    //         var borrowBooks = user[0].borrowBooks || [],
    //             theBook,
    //             returnedBook;

    //         for(var i = 0,l = borrowBooks.length; i < l; i++) {
    //             if( (borrowBooks[i].id).toJSON() === req.params.id ) {

    //                 theBook = borrowBooks[i];
    //                 break;
    //             }
    //         }

    //         returnedBook = extend({}, theBook);
    //         returnedBook.returnedDate = (new Date()).valueOf();
    //         delete returnedBook.returnDate;

    //         User.update(
    //             {no: user[0].no},
    //             {
    //                 $pull: {borrowBooks: {id: bookId}},
    //                 $push: {returnBooks: returnedBook}
    //             },
    //             function (err) {
    //                 if (err) {
    //                     req.flash('error', err);
    //                     res.redirect('back');
    //                 }
                    
    //                 //图书相应+1
    //                 Book.update({
    //                     _id : bookId
    //                 }, {
    //                     $inc : {available: 1}
    //                 }, function (err) {
    //                     if (err) {
    //                         req.flash('error', err);
    //                         res.redirect('back');
    //                     }
    //                     res.redirect('/returning');
    //             });
    //         });
    //     });
    // });

    app.get('/returning', function (req, res) {

        var user = req.session.user;

        //查找书ID
        borrow.query({
            user_id: new ObjectID(user._id),
            status: 1
        }, {}, function (err, records) {
            if (err) {
                req.flash('error', err);
                res.redirect('back');
            }
            if(records.length > 0) {

                var bookIds = [],
                    borrowDate = [],
                    returnDate = [];

                
                for(var i = 0,l = records.length; i < l; i++ ) {
                    bookIds.push(records[i].book_id);

                    borrowDate.push((new Date(Number(records[i].borrowDate))).toJSON().substring(0, 10));

                    returnDate.push((new Date(Number(records[i].returnDate))).toJSON().substring(0, 10));

                }

                Book.query({_id: {$in: bookIds}}, {}, function(err, books) {
                    res.render('borrow', {
                        user: req.session.user,
                        books: books,
                        page: 'return',
                        borrowDate: borrowDate,
                        returnDate: returnDate
                    });
                });
                
            } else {
                //没有找到记录
                req.flash('error', '没有找到记录');
                console.log('没有找到记录');
                res.redirect('404');
            }
            
        });
    });

    // app.get('/returning', function (req, res) {

    //     var user = req.session.user;

    //     User.get(user.no, function (err, user) {
    //         if (err) {
    //             req.flash('error', err);
    //             return res.redirect('back');
    //         }

    //         var returnBooks = user.returnBooks || [];

    //         //转换时间格式
    //         for (var i = 0, l = returnBooks.length; i < l; i++) {
    //             returnBooks[i].date = (new Date(Number(returnBooks[i].date))).toJSON().substring(0, 10);
    //             returnBooks[i].returnedDate = (new Date(Number(returnBooks[i].returnedDate))).toJSON().substring(0, 10);
    //         }

    //         res.render('returning', {
    //             user: user,
    //             books: returnBooks,
    //             page: 'return'
    //         });

            
    //     });  
    // });
};