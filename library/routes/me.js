/**
 *个人中心
 **/

module.exports = function (app) {

    app.get('/me', function (req, res) {
        res.send('个人中心');
    });
};