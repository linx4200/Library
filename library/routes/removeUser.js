/**
 *删除人员页
 **/
var User = require('../models/user'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function (app, checkAdmin) {

    app.get('/removeUser/:id', checkAdmin);
    app.get('/removeUser/:id', function (req, res) {
        var id = req.params.id,
            query = {
                _id: new ObjectID(id)
            };


        User.query(query, {}, function(err, users) {
            if(err) {
                req.flash('error', err);
                return res.redirect('back');
            }

            var user = users[0],
                borrowNum = user.borrowBooksNum;

            if(borrowNum && borrowNum > 0) {
                //该人员借了书,不能删除
                req.flash('error', '学生用户有借书,不可以删除!');
                res.redirect('/people');
            } else {
                User.remove(query, function (err) {
                    if (err) {
                        // return res.render('booklist', {
                        //     user: req.session.user,
                        //     books: []
                        // });
                    }
                    res.redirect('/people');
                });
            }
        });
    });

};