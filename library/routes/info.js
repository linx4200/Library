/**
 *编辑资料页
 **/

module.exports = function (app) {

    app.get('/myInfo', function (req, res) {
        res.render('myInfo', {
            user: req.session.user
        });
    });
};