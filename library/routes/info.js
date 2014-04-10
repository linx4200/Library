/**
 *编辑资料页
 **/

module.exports = function (app) {

    app.get('/info', function (req, res) {
        res.send('编辑资料页');
    });
};