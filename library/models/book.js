var mongodb = require('./db');

function Book(name, author, publisher, time, isbn, type, subType, haveNum, available, cover, summary, list, intro) {
    this.name = name;
    this.author = author;
    this.publisher = publisher;
    this.time = time;
    this.isbn = isbn;
    this.type = type;
    this.subType = subType;
    this.haveNum = haveNum;
    this.available = available;
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
        available : this.haveNum,
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

//取出图书
Book.get = function (callback) {
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

            collection.find().toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null, docs);//成功！以数组形式返回查询的结果
            });
        });
    });
};

//根据传入的条件(query)来查找图书
Book.query = function (query, sort, callback) {
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


//搜索功能
Book.search = function (keyword, by, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('books', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var pattern = new RegExp('^.*' + keyword + '.*$', 'i'),
                query;

            //搜索条件
            if (by === 'book') {
                query = {
                    name: pattern
                };
            } else if (by === 'author') {
                query = {
                    author: pattern
                };
            }

            collection.find(query).sort({
                time: -1
            }).toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, docs);
            });
        });
    });
};

//更新图书及其相关信息
Book.update = function(query, operate, callback) {
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
            //更新图书信息
            collection.update(query, operate, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

//根据条件删除一本图书
Book.remove = function(query, callback) {
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
            collection.remove(query, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};