var mongodb = require('./db');

function Book(name, author, publisher, time, isbn, type, subType, haveNum, cover, summary, list, intro) {
    this.name = name;
    this.author = author;
    this.publisher = publisher;
    this.time = time;
    this.isbn = isbn;
    this.type = type;
    this.subType = subType;
    this.haveNum = haveNum;
    this.cover = cover;
    this.summary = summary;
    this.list = list;
    this.intro = intro;
}

module.exports = Book;

//添加一本图书
Book.prototype.add = function (callback) {

    var book = {
        name : this.name,
        author : this.author,
        publisher : this.publisher,
        time : this.time,
        isbn : this.isbn,
        type : this.type,
        subType : this.subType,
        haveNum : this.haveNum,
        cover : this.cover,
        summary : this.summary,
        list : this.list,
        intro : this.intro
    };

    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        //读取 books 集合
        db.collection('books', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            //将文档插入 books 集合
            collection.insert(book, {
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

//读取文章及其相关信息
Book.get = function (name, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        //读取 books 集合
        db.collection('books', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if (name) {
                query.name = name;
            }
            //根据 query 对象查询图书
            collection.find(query).sort({
                time: -1
            }).toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null, docs);//成功！以数组形式返回查询的结果
            });
        });
    });
};