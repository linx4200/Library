/**
 *编辑图书页
 **/
var Book = require('../models/book.js'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function (app, checkAdmin) {

    app.get('/remove/:id', checkAdmin);
    app.get('/remove/:id', function (req, res) {
        var id = req.params.id,
            query = {
                _id: new ObjectID(id)
            };

        Book.remove(query, function (err) {
            if (err) {
                // return res.render('booklist', {
                //     user: req.session.user,
                //     books: []
                // });
            }
            res.redirect('/table');
        });
    });

};