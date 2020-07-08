var express_1 = require("express");
var usuario_model_1 = require('../models/usuario.model');
var bcrypt_1 = require('bcrypt');
var token_1 = require('../classes/token');
var autenticacion_1 = require('../middlewares/autenticacion');
var usuariosRoutes = express_1.Router();
//Login 
usuariosRoutes.post('/login', function (req, res) {
    var body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, function (error, userDB) {
        if (error)
            throw error;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña incorrectos'
            });
        }
        if (userDB.passwordCompare(body.password)) {
            var userToken = token_1["default"].getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            return res.json({
                ok: true,
                token: userToken,
                user: userDB
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña incorrectos ****'
            });
        }
    });
});
//Crear un usuario
usuariosRoutes.post('/create', function (req, res) {
    var user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1["default"].hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    usuario_model_1.Usuario.create(user).then(function (userDB) {
        var userToken = token_1["default"].getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        return res.json({
            ok: true,
            token: userToken,
            user: userDB
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
//Update
usuariosRoutes.post('/update', autenticacion_1.verificarToken, function (req, res) {
    var user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    };
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, function (error, userDB) {
        if (error)
            throw error;
        if (!userDB) {
            res.json({
                ok: false,
                mensaje: 'No existe el usuario con ese ID'
            });
        }
        else {
            var userToken = token_1["default"].getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            return res.json({
                ok: true,
                token: userToken,
                user: userDB
            });
        }
    });
});
usuariosRoutes.get('/', [autenticacion_1.verificarToken], function (req, res) {
    var usuario = req.usuario;
    res.json({
        ok: true,
        usuario: usuario
    });
});
exports["default"] = usuariosRoutes;
