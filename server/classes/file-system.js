var path_1 = require('path');
var fs_1 = require('fs');
var uniqid_1 = require('uniqid');
var FileSystem = (function () {
    function FileSystem() {
    }
    FileSystem.prototype.guardarImagenTemporal = function (file, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //Crear carpetas
            var path = _this.crearCarpetaUsuario(userId);
            //Crear nombre de archivo
            var nombreArchivo = _this.generarNombreUnico(file.name);
            console.log(file.name);
            console.log(nombreArchivo);
            //Mover el archivo del Temp a nuestra carpeta
            file.mv(path + "/" + nombreArchivo, function (error) {
                if (error) {
                    //no se pudo mover
                    reject(error);
                }
                else {
                    //archivo movido exitosamente!
                    resolve();
                }
            });
        });
    };
    FileSystem.prototype.generarNombreUnico = function (nombreOriginal) {
        var nombreArray = nombreOriginal.split(',');
        var extension = nombreArray[nombreArray.length - 1];
        var idUnico = uniqid_1["default"]();
        return idUnico + "." + extension;
    };
    FileSystem.prototype.crearCarpetaUsuario = function (userId) {
        var pathUser = path_1["default"].resolve(__dirname, '../uploads/', userId);
        var pathUserTemp = pathUser + '/temp';
        var existe = fs_1["default"].existsSync(pathUser);
        if (!existe) {
            fs_1["default"].mkdirSync(pathUser);
            fs_1["default"].mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    };
    FileSystem.prototype.obtenerImagenesTemp = function (userId) {
        var pathUserTemp = path_1["default"].resolve(__dirname, '../uploads/', userId, 'temp');
        return fs_1["default"].readdirSync(pathUserTemp) || [];
    };
    FileSystem.prototype.imagenesDeTempHaciaPost = function (userId) {
        var pathUserTemp = path_1["default"].resolve(__dirname, '../uploads/', userId, 'temp');
        var pathUserPosts = path_1["default"].resolve(__dirname, '../uploads/', userId, 'posts');
        if (!fs_1["default"].existsSync(pathUserTemp)) {
            return [];
        }
        if (!fs_1["default"].existsSync(pathUserPosts)) {
            fs_1["default"].mkdirSync(pathUserPosts);
        }
        var imagenesTemp = this.obtenerImagenesTemp(userId);
        imagenesTemp.forEach(function (imagen) {
            fs_1["default"].renameSync(pathUserTemp + "/" + imagen, pathUserPosts + "/" + imagen);
        });
        return imagenesTemp;
    };
    FileSystem.prototype.getImagenUrl = function (userId, img) {
        var pathImagen = path_1["default"].resolve(__dirname, '../uploads/', userId, 'posts', img);
        var existe = fs_1["default"].existsSync(pathImagen);
        if (!existe) {
            return path_1["default"].resolve(__dirname, '../assets/400x250.jpg');
        }
        return pathImagen;
    };
    return FileSystem;
})();
exports["default"] = FileSystem;
