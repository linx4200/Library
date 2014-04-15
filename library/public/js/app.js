define(function (require, exports, module) {

    var add = require('./pages/add'),
        login = require('./pages/login'),
        index = require('./pages/index'),
        list = require('./pages/list'),
        search = require('./pages/search'),
        app = {};

    app.init = function () {
        $(document).ready(function () {

            //GLOBAL
            $('body').css({
                'min-height': window.innerHeight
            });


            //pages
            add.init();
            login.init();
            index.init();
            list.init();
            search.init();
        });
        
    };

    module.exports = app;
});