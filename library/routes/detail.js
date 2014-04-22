/**
 *图书详细页
 **/

var Book = require('../models/book'),
    borrow = require('../models/borrow'),
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

            var thebook = books[0];

            //转换出版时间格式
            thebook.time = (new Date(Number(thebook.time))).toJSON().substring(0, 10);

            //查找改书有没有被该用户借过
            borrow.query({
                user_id: new ObjectID(req.session.user._id),
                status: 0
            }, {}, function (err, record) {
                if (err) {
                    req.flash('error', err);
                    res.redirect('back');
                }
                if(record.length > 0) {
                    for(var i = 0,l = record.length; i < l; i++) {
                        if(record[i].book_id.equals(new ObjectID(id))) {
                            res.render('detail', {
                                user: req.session.user,
                                book: thebook,
                                borrowed: true
                            });
                            break;
                        } else {
                            res.render('detail', {
                                user: req.session.user,
                                book: thebook,
                                borrowed: false
                            });
                        }
                    }
                    
                } else {
                    //没有找到记录
                    req.flash('error', '没有找到记录');
                    console.log('没有找到记录');
                    res.redirect('404');
                }
                
            });

            
        });
    });
};