define(function (require, exports, module) {

    var add = require('./pages/add'),
        login = require('./pages/login'),
        index = require('./pages/index'),
        app = {};

    app.init = function () {
        $(document).ready(function () {
            add.init();
            login.init();
            index.init();
        });
        
    };

    module.exports = app;
});