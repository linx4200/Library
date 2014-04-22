var mongodb = require('./db'),
    borrow = {};

module.exports = borrow;

//借书功能 传入书本和用户信息
borrow.borrow = function (userId, bookId, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('borrow', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            var record = {
                book_id : bookId,
                user_id : userId,
                borrowDate : (new Date()).valueOf()
            };

            //插入记录
            collection.insert(record, {
                safe: true
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null);//返回 err 为 null
            });
        });
    });
};


//根据传入的条件(query)来查找借书记录
borrow.query = function (query, sort, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        //读取 books 集合
        db.collection('borrow', function (err, collection) {
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