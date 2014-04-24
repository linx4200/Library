/**
 *首页
 **/

module.exports = function (app, checkLogin) {
    
    app.get('/', checkLogin);
    app.get('/', function (req, res) {

        res.render('index', {
            user: req.session.user
        });
        
    });
    
};