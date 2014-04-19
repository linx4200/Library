/**
 *个人中心
 **/

var User = require('../models/user'),
    Book = require('../models/book');

module.exports = function (app) {

    app.get('/me', function (req, res) {

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

            res.render('me', {
                user: user,
                books: borrowBooks
            });

            
        });

    //     
    });
};