var mongoose_1 = require('mongoose');
var bcrypt_1 = require('bcrypt');
var usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La password es obligatoria']
    }
});
usuarioSchema.method('passwordCompare', function (password) {
    if (password === void 0) { password = ''; }
    if (bcrypt_1["default"].compareSync(password, this.password)) {
        return true;
    }
    else
        return false;
});
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
