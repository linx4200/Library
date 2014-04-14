define(function (require, exports, module) {

    var add = require('./pages/add'),
        login = require('./pages/login'),
        index = require('./pages/index'),
        list = require('./pages/list'),
        app = {};

    app.init = function () {
        $(document).ready(function () {
            add.init();
            login.init();
            index.init();
            list.init();
        });
        
    };

    module.exports = app;
});