/**
 *还书页
 **/
var Book = require('../models/book'),
    User = require('../models/user'),
    borrow = require('../models/borrow'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function (app, checkStudent) {

    app.get('/returning/:id', checkStudent);
    app.get('/returning/:id', function (req, res) {

        var bookId = new ObjectID(req.params.id),
            user = req.session.user;
        
        User.get(user.no, function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }

            //更新借书记录
            borrow.returning(user._id, bookId, function () {

                //更新user.borrowBooksNum
                User.update({no: user.no}, {$inc : {borrowBooksNum: -1}}, function(err) {
                    if (err) {
                        req.flash('error', err);
                        return res.redirect('back');
                    }

                    //更新book.available
                    Book.update({_id: bookId}, {$inc : {available: 1}}, function(err) {
                        if (err) {
                            req.flash('error', err);
                            return res.redirect('/back');
                        }

                        // req.flash('error', err);
                        res.redirect('/returning');
                    });
                });
            });
        });
    });

    app.get('/returning', checkStudent);
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
                    returnDate = [],
                    commentStatus = [];

                
                for(var i = 0,l = records.length; i < l; i++ ) {
                    bookIds.push(records[i].book_id);

                    commentStatus.push(records[i].comment);

                    borrowDate.push((new Date(Number(records[i].borrowDate))).toJSON().substring(0, 10));

                    returnDate.push((new Date(Number(records[i].returnDate))).toJSON().substring(0, 10));

                }

                Book.query({_id: {$in: bookIds}}, {}, function(err, books) {
                    res.render('borrow', {
                        user: req.session.user,
                        books: books,
                        page: 'return',
                        borrowDate: borrowDate,
                        returnDate: returnDate,
                        commentStatus: commentStatus,
                        error : req.flash('error').toString()
                    });
                });
                
            } else {
                //没有找到记录
                res.render('borrow', {
                    user: req.session.user,
                    books: [],
                    page: 'return',
                    error : req.flash('error').toString()
                });
            }
            
        });
    });
};