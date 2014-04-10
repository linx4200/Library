/**
 *搜索结果页
 **/

module.exports = function (app) {

    app.get('/searchRes', function (req, res) {
        res.send('搜索结果页');
    });
};