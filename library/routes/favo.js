/**
 *收藏页
 **/
var Book = require('../models/book'),
    User = require('../models/user'),
    favo = require('../models/favo'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {

    app.get('/favo/:id', function (req, res) {

        var bookId = new ObjectID(req.params.id),
            user = req.session.user,
            userId = new ObjectID(user._id);

        //插入收藏记录
        favo.add(userId, bookId, function (err) {
            if(err) {
                req.flash('error', err);
                return res.redirect('back');
            }

            res.redirect('back');
        });
    });

    app.get('/unfavo/:id', function (req, res) {

        var bookId = new ObjectID(req.params.id),
            user = req.session.user,
            userId = new ObjectID(user._id);

        //取消收藏记录
        favo.remove(userId, bookId, function (err) {
            if(err) {
                req.flash('error', err);
                return res.redirect('back');
            }

            res.redirect('back');
        });
    });


    app.get('/favo', function (req, res) {

        var user = req.session.user;

        //查找书ID
        favo.query({
            user_id: new ObjectID(user._id)
            }, {}, function (err, records) {
            if (err) {
                req.flash('error', err);
                res.redirect('back');
            }
            if(records.length > 0) {

                var bookIds = [];

                
                for(var i = 0,l = records.length; i < l; i++ ) {
                    bookIds.push(records[i].book_id);

                    // borrowDate.push((new Date(Number(records[i].borrowDate))).toJSON().substring(0, 10));

                    // returnDate.push((new Date(Number(records[i].borrowDate) + config.returnDays)).toJSON().substring(0, 10));

                }

                Book.query({_id: {$in: bookIds}}, {}, function(err, books) {
                    res.render('favo', {
                        user: req.session.user,
                        books: books
                    });
                });
                
            } else {
                //没有找到记录
                res.render('favo', {
                    user: req.session.user,
                    books: []
                });
            }
            
        });

    });
};