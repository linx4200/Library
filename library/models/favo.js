var mongodb = require('./db'),
    favo = {};

module.exports = favo;

//收藏功能 传入书本和用户ID
favo.add = function (userId, bookId, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 favo 集合
        db.collection('favo', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            var record = {
                book_id: bookId,
                user_id: userId,
                date:  (new Date()).valueOf(),
                remind: 1
            };
            //插入记录
            collection.insert(record, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null);//返回 err 为 null
            });
        });
    });
};


//取消收藏功能 传入书本和用户ID
favo.remove = function (userId, bookId, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 favo 集合
        db.collection('favo', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.remove({
                book_id: bookId,
                user_id: userId
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};


//根据传入的条件(query)来查找收藏记录
favo.query = function (query, sort, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        //读取 favo 集合
        db.collection('favo', function (err, collection) {
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