var token_1 = require('../classes/token');
exports.verificarToken = function (req, res, next) {
    var userToken = req.get('x-token') || '';
    token_1["default"].tokenCompare(userToken).then(function (decode) {
        console.log('Decode: ', decode);
        req.usuario = decode.usuario;
        next();
    }).catch(function (error) {
        res.json({
            ok: false,
            mensaje: 'Token invalido'
        });
    });
};
