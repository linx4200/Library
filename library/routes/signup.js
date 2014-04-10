/**
 *这是注册页
 **/

module.exports = function (app) {

    app.get('/signup', function (req, res) {
        res.send('这是注册页');
    });
};