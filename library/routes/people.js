/**
 *人员管理页
 **/
var User = require('../models/user'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function (app, checkAdmin) {

    app.get('/people', checkAdmin);
    app.get('/people', function (req, res) {

        var query = {};

        User.query(query, {}, function(err, users) {
            if(err) {
                req.flash('error', err);
                return res.redirect('/people');
            }

            for(var i = 0, l = users.length; i < l; i++) {
                if(users[i].identity === 'student') {
                    users[i].identity = '学生';
                } else if (users[i].identity === 'admin') {
                    users[i].identity = '管理员';
                }
            };
            
            res.render('people', {
                user: req.session.user,
                users: users,
                error : req.flash('error').toString()
            });
        });
        
    });
};