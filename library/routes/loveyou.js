/**
 *彩蛋
 **/

module.exports = function (app, checkLogin) {
    
    app.get('/loveyou', checkLogin);
    app.get('/loveyou', function (req, res) {

        res.render('loveyou');
        
    });
    
};