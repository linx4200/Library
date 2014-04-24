define(function (require, exports, module) {

    var add = require('./pages/add'),
        login = require('./pages/login'),
        index = require('./pages/index'),
        list = require('./pages/list'),
        search = require('./pages/search'),
        me = require('./pages/me'),
        removeBook = require('./pages/removeBook'),
        app = {};

    app.init = function () {
        $(document).ready(function () {

            //GLOBAL
            $('body').css({
                'min-height': window.innerHeight
            });

            if($('.alert-danger').is(':visible')) {
                $('.alert-danger').fadeOut(3000);
            }

            //pages
            add.init();
            login.init();
            index.init();
            list.init();
            search.init();
            me.init();
            removeBook.init();
        });
        
    };

    module.exports = app;
});