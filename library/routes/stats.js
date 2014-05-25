/**
 *统计信息页
 **/
var Book = require('../models/book'),
    borrow = require('../models/borrow'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function (app, checkAdmin) {

    app.get('/stats', checkAdmin);
    app.get('/stats', function (req, res) {

        var query = {
            'status': 0
        },

        borrowNum, //保存现在借书的数目

        typeList = [
            '文学',
            '少儿',
            '教育',
            '管理',
            '励志与成功',
            '人文社科',
            '生活',
            '艺术',
            '科技',
            '计算机与互联网'
        ],

        stats = {  //统计表
            '文学': 0, 
            '少儿': 0,
            '教育': 0,
            '管理': 0,
            '励志与成功': 0,
            '人文社科': 0,
            '生活': 0,
            '艺术': 0,
            '科技': 0,
            '计算机与互联网': 0
        };

        borrow.query(query, {$natural: -1}, function (err, records) {
            if (err) {
                return res.render('stats', {
                    user: req.session.user,
                    error : req.flash('error').toString()
                });
            }

            borrowNum = records.length;

            // res.render('stats', {
            //     user: req.session.user,
            //     borrowNum : borrowNum,
            //     stats: stats,
            //     error : req.flash('error').toString()
            // });

            //查询分类的借出情况
            borrow.query({}, {}, function (err, records) {
                if (err) {
                    return res.render('stats', {
                        user: req.session.user,
                        error : req.flash('error').toString()
                    });
                }

                var bookIds = [];

                for(var i = 0, l = records.length; i < l; i++) {
                    bookIds.push(records[i].book_id);
                }

                Book.query({_id: {$in: bookIds}}, {}, function(err, books) {

                    for(var i = 0, l = books.length; i < l; i++) {
                        var type = books[i].type;
                        stats[type]++ ;
                    }

                    res.render('stats', {
                        user: req.session.user,
                        borrowNum : borrowNum,
                        stats: stats,
                        typeList: typeList,
                        error : req.flash('error').toString()
                    });
                });
                
            });

        });
    });
};