/**
 *新增图书页
 **/

module.exports = function (app) {

    app.get('/add', function (req, res) {
        res.render('add', {
            user: req.session.user
        });
    });
};