var wechat = require('wechat'),
    token = require('../config').wxToken,
    Book = require('../models/book'),
    User = require('../models/user'),
    borrow = require('../models/borrow'),
    config = require('../config');

module.exports = function(app) {
  app.use('/wechat', wechat(token, function (req, res) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin,
        content = message.Content;
    
    if (content.search('ISBN:') >= 0) {
        //查询图书情况
        var query = {
            'isbn': content.substring(5)
        };
        Book.query(query, {}, function(err, books) {
          if (err) {
            console.log('ERROR:' + err);   
          }

          var thebook = books[0],
              name = thebook.name,
              available = thebook.available;

          res.reply('图书《' + name + '》还有 ' + available +' 本可借阅!赶紧来带它回家吧!');
        });

    } else if (content.search('S:') >= 0){
      //查询学生借阅情况

        var no = content.substring(2);

        User.query({'no': no}, {}, function(err, users) {
            
            if (err) {
              console.log('ERROR:' + err);   
            }

            if(users.length === 0) {
              return res.reply('该用户不存在!');
            }

            var user_id = users[0]._id,
                borrowRecords,
                bookArr = [],
                bookNameMap = {},
                msg;

            borrow.query({
              'user_id': user_id,
              'status':0
            }, {}, function(err, records) {
              if (err) {
                console.log('ERROR:' + err);   
              }

              if (records.length === 0) {
                //无记录
                msg = '学生 ' + no + ' 没有还木有还的书';
                res.reply(msg);

              } else {

                msg = '学生 ' + no + ' 还有 ' + records.length + ' 本书未还: \n';

                borrowRecords = records;

                for(var i = 0,l = records.length; i < l; i++) {
                  bookArr.push(records[i].book_id);
                }

                Book.query({_id: {$in: bookArr}}, {}, function(err, books) {

                    for(var i = 0,l = books.length; i < l; i++) {
                        bookNameMap[books[i]._id] = books[i].name;
                    }

                    //构造消息
                    for(var j = 0,ll = borrowRecords.length; j < ll; j++) {
                        var name = bookNameMap[borrowRecords[j].book_id],
                            borrowDate = (new Date(Number(borrowRecords[j].borrowDate))).toJSON().substring(0, 10),
                            returnDate = (new Date(Number(borrowRecords[j].borrowDate + config.returnDays))).toJSON().substring(0, 10);

                        var added =  j + 1 + '. 《' + name + '》\n 借书日期: ' + borrowDate + ' 还书日期: ' + returnDate + '\n';

                        msg += added;
                    }
                    //回复消息
                    res.reply(msg.substring(0, msg.length-1));
                });
              }
            });
        });


    } else {
      res.reply('【1】查询书本可借情况请输入:"ISBN:+图书ISBN号",例如:ISBN:9787540456023. \n【2】查询用户借书情况请请输入:"S:+学生学号",例如:S:2010063010000。\n【3】更多功能请访问 http://lib.xinranliu.me ！');
    }
  }));
};