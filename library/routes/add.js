/**
 *新增图书页
 **/
var Book = require('../models/book.js'),
    fs = require('fs');

module.exports = function (app, checkAdmin) {

    app.get('/add', checkAdmin);
    app.get('/add', function (req, res) {
        res.render('add', {
            user: req.session.user,
            error : req.flash('error').toString()
        });
    });

    app.post('/add', checkAdmin);
    app.post('/add', function (req, res) {
        var book = new Book(
            req.body.name,
            req.body.author,
            req.body.publisher,
            new Date(req.body.time).valueOf(),
            req.body.isbn,
            req.body.type,
            req.body.subType,
            Number(req.body.haveNum),
            Number(req.body.available),
            req.files.cover.originalFilename,
            req.body.summary,
            req.body.list,
            req.body.intro
        );
        
        book.add(function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/add');
            }
            //处理封面图片
            var tmp_path = req.files.cover.path;
            // 指定文件上传后的目录
            var target_path = './public/images/cover/' + req.files.cover.name;
            // 移动文件
            fs.rename(tmp_path, target_path, function (err) {
                if (err) throw err;
                // 删除临时文件夹文件, 
                fs.unlink(tmp_path, function () {
                    if (err) throw err;
                });
            });
            req.flash('success', '添加图书成功!');
            res.redirect('/table');//发表成功跳转到主页
        });
    });
};