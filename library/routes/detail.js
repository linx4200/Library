/**
 *图书详细页
 **/

var Book = require('../models/book'),
    borrow = require('../models/borrow'),
    favo = require('../models/favo'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {

    app.get('/detail/:id', function (req, res) {

        var id = req.params.id,
            query = {
                _id: new ObjectID(id)
            };

        Book.query(query, {}, function (err, books) {
            if (err) {
                // return res.render('booklist', {
                //     user: req.session.user,
                //     books: []
                // });
            }

            var thebook = books[0],
                userId = new ObjectID(req.session.user._id),
                borrowed,
                favoed;

            //转换出版时间格式
            thebook.time = (new Date(Number(thebook.time))).toJSON().substring(0, 10);

            //查找改书有没有被该用户借过
            borrow.query({
                user_id: userId,
                status: 0
            }, {}, function (err, record) {
                if (err) {
                    req.flash('error', err);
                    res.redirect('back');
                }

                for(var i = 0,l = record.length; i < l; i++) {
                    if(record[i].book_id.equals(new ObjectID(id))) {
                        borrowed = true;
                        break;
                    } else {
                        borrowed = false;
                    }
                }

                //查询该书有没有被收藏
                favo.query({
                    user_id: userId
                }, {}, function (err, record) {
                    if (err) {
                        req.flash('error', err);
                        res.redirect('back');
                    }

                    for(var i = 0,l = record.length; i < l; i++) {
                        if(record[i].book_id.equals(new ObjectID(id))) {
                            favoed = true;
                            break;
                        } else {
                            favoed = false;
                        }
                    }

                    res.render('detail', {
                        user: req.session.user,
                        book: thebook,
                        borrowed: borrowed,
                        favoed: favoed
                    });
                });     
            });

            
        });
    });
};