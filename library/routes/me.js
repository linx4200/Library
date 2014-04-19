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

            var books = user.borrowBooks;

            console.log(books);

            res.render('me', {
                user: user,
                showMenu: true
            });
        });

    //     
    });
};