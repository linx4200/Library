define("app", [ "./pages/add", "./components/typeConfig", "./pages/login" ], function(require, exports, module) {
    var add = require("./pages/add"), login = require("./pages/login"), app = {};
    app.init = function() {
        $(document).ready(function() {
            add.init();
            login.init();
        });
    };
    module.exports = app;
});