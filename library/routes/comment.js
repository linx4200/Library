/**
 *评论图书页
 **/

module.exports = function (app) {

    app.get('/comment', function (req, res) {
        res.send('评论图书页');
    });
};