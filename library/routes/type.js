/**
 *分类管理页
 **/

module.exports = function (app) {

    app.get('/type', function (req, res) {
        res.send('分类管理页');
    });
};