/**
 *图书表格页
 **/

module.exports = function (app) {

    app.get('/table', function (req, res) {
        res.send('图书表格页');
    });
};