/**
 *新增图书页
 **/
var Book = require('../models/book'),
    User = require('../models/user'),
    borrow = require('../models/borrow'),
    config = require('../config'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {

    app.get('/borrow/:id', function (req, res) {

        var bookId = new ObjectID(req.params.id),
            user = req.session.user;
        
        User.get(user.no, function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }

            if (user.borrowBookNum && user.borrowBookNum > config.maxBorrowNum ) {
                req.flash('error', '你已经借了15本书咯~不能再借了!先去还几本吧!');
                return res.redirect('back');
            }

            //插入借书记录
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


    app.get('/borrow', function (req, res) {

        var user = req.session.user;

        //查找书ID
        borrow.query({
            user_id: new ObjectID(user._id),
            status: 0
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

                    returnDate.push((new Date(Number(records[i].borrowDate) + config.returnDays)).toJSON().substring(0, 10));

                }

                Book.query({_id: {$in: bookIds}}, {}, function(err, books) {
                    res.render('borrow', {
                        user: req.session.user,
                        books: books,
                        page: 'borrow',
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
};