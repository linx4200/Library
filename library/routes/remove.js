/**
 *编辑图书页
 **/
var Book = require('../models/book'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function (app, checkAdmin) {

    app.get('/remove/:id', checkAdmin);
    app.get('/remove/:id', function (req, res) {
        var id = req.params.id,
            query = {
                _id: new ObjectID(id)
            };


        Book.query(query, {}, function(err, books) {
            if(err) {
                req.flash('error', err);
                return res.redirect('back');
            }

            var book = books[0],
                available = book.available,
                haveNum = book.haveNum;

            if(available !== haveNum) {
                //书已经借出去了,不能删除
                req.flash('error', '有学生在借这本书,不可以删除!');
                res.redirect('back');
            } else {
                Book.remove(query, function (err) {
                    if (err) {
                        // return res.render('booklist', {
                        //     user: req.session.user,
                        //     books: []
                        // });
                    }
                    res.redirect('/table');
                });
            }
        });
        // Book.remove(query, function (err) {
        //     if (err) {
        //         // return res.render('booklist', {
        //         //     user: req.session.user,
        //         //     books: []
        //         // });
        //     }
        //     res.redirect('/table');
        // });
    });

};