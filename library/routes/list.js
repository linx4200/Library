/**
 *图书列表页
 **/

module.exports = function (app) {

    app.get('/list', function (req, res) {
        res.send('图书列表页');
    });
};