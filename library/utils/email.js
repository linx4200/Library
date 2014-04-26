module.exports = function () {
    var nodemailer = require('nodemailer'),
        borrow = require('../models/borrow'),
        User = require('../models/user'),
        Book = require('../models/book'),
        config = require('../config'),
        userArr = [],
        userEmailMap = {},
        bookArr = [],
        bookNameMap = {},
        borrowRecords,
        now = (new Date()).valueOf(),
        schedule = require('node-schedule');

　　var j = schedule.scheduleJob('1 1 * * *', function(){
        // sendRemindMails();
    });


    // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport('SMTP',{
        service: 'QQ',
        auth: {
            user: 'lib@xinranliu.me',
            pass: 'ZWFshifeizhu1024'
        }
    });

    function sendRemindMails () {
        //找出没有还的书
        borrow.query({
            'status':0,
            'borrowDate' : {
                $lt: (now + config.remindDays - config.returnDays)
            }
        }, {}, function(err, records) {
            if(err) {
                console.log('error:' + err);
            } else {
                borrowRecords = records;

                for(var i = 0,l = records.length; i < l; i++) {
                    userArr.push(records[i].user_id);
                    bookArr.push(records[i].book_id);
                }

                Book.query({_id: {$in: bookArr}}, {}, function(err, books) {

                    for(var i = 0,l = books.length; i < l; i++) {
                        bookNameMap[books[i]._id] = books[i].name;
                    }

                    User.query({_id: {$in: userArr}}, {}, function(err, users) {
                        for(var i = 0,l = users.length; i < l; i++) {
                            userEmailMap[users[i]._id] = users[i].email;
                        }

                        //发邮件了!
                        for(var j = 0,ll = borrowRecords.length; j < ll; j++) {
                            var email = userEmailMap[borrowRecords[j].user_id],
                                name = bookNameMap[borrowRecords[j].book_id],
                                date = (new Date(Number(borrowRecords[j].borrowDate) + config.returnDays)).toJSON().substring(0, 10);


                            if(email) {

                                var mailOptions = {
                                    from: 'lib@xinranliu.me', // sender address
                                    to: email, // list of receivers
                                    subject: '来自图书馆星球的警告', // Subject line
                                    text: '你的图书 <' + name + '> 已经快没有能量了!要在' + date + '之前还回去图书馆星球哦!不然就要死翘翘了!', // plaintext body
                                    html: '你的图书 <' + name + '> 已经快没有能量了!要在' + date + '之前还回去图书馆星球吧!不然就要死翘翘了!' // html body
                                };

                                // send mail with defined transport object
                                smtpTransport.sendMail(mailOptions, function(error, response){
                                    if(error){
                                        console.log(error);
                                    }else{
                                        console.log('Message sent: ' + response.message);
                                    }
                                    smtpTransport.close();
                                });
                            }
                        }
                    });

                });
            }
        });
    }
};