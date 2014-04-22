var mongodb = require('./db');

function User(user) {
    this.no = user.no;
    this.email = user.email;
    this.password = user.password;
    this.identity = user.identity;
    this.nickname = user.nickname;
    this.wechat = user.wechat;
    this.borrowBooksNum = user.borrowBooksNum;
}

module.exports = User;

//注册时存储用户信息
User.prototype.signUpSave = function (callback) {
    //要存入数据库的用户文档
    var user = {
        no: this.no,
        identity: this.identity,
        password: this.password,
        borrowBooksNum: this.borrowBooksNum
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

//借书还书功能等更新数据数据库操作接口
User.update = function (query, update, callback) {
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
            collection.update(query, update, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err 信息
                }
                callback(null, user);//成功！返回用户信息
            });
        });
    });
};

//综合查询功能
//根据传入的条件(query)来查找用户信息
User.query = function (query, sort, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        //读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //根据 query 对象查询图书, 根据sort对象进行排序
            collection.find(query).sort(sort).toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null, docs);//成功！以数组形式返回查询的结果
            });
        });
    });
};