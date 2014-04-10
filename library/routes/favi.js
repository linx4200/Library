/**
 *收藏页
 **/

module.exports = function (app) {

    app.get('/favi', function (req, res) {
        res.send('收藏页');
    });
};