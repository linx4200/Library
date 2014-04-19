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

        User.get(user.no, function (err, user) {
            if (err) {
                req.flash('error', err);
            }
            
            //如果超出上限就不允许借书
            if(user.borrowBooks.length > config.maxBorrowNum) {
                req.flash('error', '超出借书限额');
                res.redirect('back');
            } else {
                //没有超出就走正常流程
                //用户增加图书
                User.update({
                    no: user.no
                }, {
                    $push: {borrowBooks: bookId}
                },
                function (err) {
                    if (err) {
                        req.flash('error', err);
                        res.redirect('back');
                    }
                    
                    //图书相应-1
                    Book.update({
                        _id : bookId
                    }, {
                        $inc : {available: -1}
                    }, function () {
                        res.redirect('back');
                    });
                });
            }
        });
        
    });
};