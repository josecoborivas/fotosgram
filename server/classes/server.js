var express_1 = require('express');
var Server = (function () {
    function Server() {
        this.port = 3000;
        this.app = express_1["default"]();
    }
    Server.prototype.start = function (callback) {
        this.app.listen(this.port, callback);
    };
    return Server;
})();
exports["default"] = Server;
