/**
 *新增图书页
 **/
var Book = require('../models/book.js'),
    User = require('../models/user.js'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {

    app.get('/borrow/:id', function (req, res) {

        var bookId = new ObjectID(req.params.id),
            user = req.session.user;

        //用户增加图书
        User.borrow(user.no, bookId, function (err) {
            if (err) {
                req.flash('error', err);
            }
            req.flash('success', '借书成功!');
            res.send('status', 1);
            
            //图书相应-1
            Book.update({
                _id : bookId
            }, {
                $inc : {available: -1}
            });
        });
    });
};