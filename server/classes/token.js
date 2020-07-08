var jsonwebtoken_1 = require('jsonwebtoken');
var Token = (function () {
    function Token() {
    }
    Token.getJwtToken = function (payload) {
        return jsonwebtoken_1["default"].sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });
    };
    Token.tokenCompare = function (userToken) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            jsonwebtoken_1["default"].verify(userToken, _this.seed, function (error, decode) {
                if (error) {
                    //no confiar
                    reject();
                }
                else {
                    resolve(decode);
                }
            });
        });
    };
    Token.seed = 'este_es_mi_seed_para_la_app_fotosgram';
    Token.caducidad = '1h';
    return Token;
})();
exports["default"] = Token;
