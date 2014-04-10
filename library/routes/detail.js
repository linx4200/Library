/**
 *图书详细页
 **/

module.exports = function (app) {

    app.get('/detail', function (req, res) {
        res.send('图书详细页');
    });
};