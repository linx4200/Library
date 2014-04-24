/**
 *编辑图书页
 **/
var Book = require('../models/book.js'),
    fs = require('fs'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function (app, checkAdmin) {

    app.get('/edit/:id', checkAdmin);
    app.get('/edit/:id', function (req, res) {
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

            res.render('edit', {
                user: req.session.user,
                book: thebook,
                error : req.flash('error').toString()
            });
        });
    });

    app.post('/edit', checkAdmin);
    app.post('/edit', function (req, res) {

        var change = {
            name : req.body.name,
            author : req.body.author,
            publisher : req.body.publisher,
            time : new Date(req.body.time).valueOf(),
            isbn : req.body.isbn,
            type : req.body.type,
            subType : req.body.subType,
            haveNum : req.body.haveNum,
            available : req.body.haveNum,
            cover : req.files.cover.size !== 0 ? req.files.cover.originalFilename : req.body.originalCover,
            summary : req.body.summary,
            list : req.body.list,
            intro : req.body.intro
        },
        id = req.body.id;

        Book.update({_id: new ObjectID(id)}, {$set: change},function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/eidt');
            }

            var cover = req.files.cover,
                tmp_path = cover.path;

            if (cover.size !== 0) { 
                //改变了封面图
                //处理封面图片
                // 指定文件上传后的目录
                var target_path = './public/images/cover/' + change.cover;
                // 移动文件
                fs.rename(tmp_path, target_path, function (err) {
                    if (err) throw err;
                    // 删除临时文件夹文件, 
                    fs.unlink(tmp_path, function () {
                        if (err) throw err;
                    });
                });
            } else {
                // 删除临时文件夹文件, 
                fs.unlink(tmp_path, function () {
                    if (err) throw err;
                });

            }
            req.flash('success', '更新图书信息成功!');
            res.redirect('/table');//发表成功跳转到主页
        });
    });
};