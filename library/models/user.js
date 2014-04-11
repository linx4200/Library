var mongodb = require('./db');

function User(user) {
    this.no = user.no;
    this.email = user.email;
    this.password = user.password;
    this.identity = user.identity;
    this.nickname = user.nickname;
    this.wechat = user.wechat;
}

module.exports = User;

//注册时存储用户信息
User.prototype.signUpSave = function (callback) {
    //要存入数据库的用户文档
    var user = {
        no: this.no,
        identity: this.identity,
        password: this.password
    };

    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            //将用户数据插入 users 集合
            collection.insert(user, {
                safe: true
            }, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);//错误，返回 err 信息
                }
                callback(null, user[0]);//成功！err 为 null，并返回存储后的用户文档
            });
        });
    });
};


//读取用户信息
User.get = function (no, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            //查找用户学号（no键）值为 no 一个文档
            collection.findOne({
                no: no
            }, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err 信息
                }
                callback(null, user);//成功！返回查询的用户信息
            });
        });
    });
};