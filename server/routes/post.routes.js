var express_1 = require('express');
var autenticacion_1 = require('../middlewares/autenticacion');
var post_model_1 = require('../models/post.model');
var file_system_1 = require('../classes/file-system');
var postRouter = express_1.Router();
var fileSystem = new file_system_1["default"]();
//Obtener Post por pagina
postRouter.get('/', async(req, any, res, express_1.Response), {
    let: pagina = Number(req.query.pagina) || 1,
    let: skip = pagina - 1,
    skip:  = skip * 10,
    const: posts = await, Post: .find()
        .sort({ '_id': -1 })
        .limit(10)
        .skip(skip)
        .populate('usuario', '-password')
        .exec(),
    res: .json({
        ok: true,
        pagina: pagina,
        posts: posts
    })
});
//Crear Post
postRouter.post('/', [autenticacion_1.verificarToken], function (req, res) {
    var body = req.body;
    body.usuario = req.usuario._id;
    var imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
    body.imgs = imagenes;
    post_model_1.Post.create(body).then(async, function (postDB) {
        await;
        postDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            post: postDB
        });
    }).catch(function (error) {
        res.json(error);
    });
});
//Servicio para subir archivos
postRouter.post('/upload', [autenticacion_1.verificarToken], async(req, any, res, express_1.Response), {
    if: function () { } }, !req.files);
{
    res.status(400).json({
        ok: false,
        mensaje: 'No se subio ningun archivo'
    });
}
var file = req.files.image;
if (!file) {
    res.status(400).json({
        ok: false,
        mensaje: 'No se subio ningun archivo -- image'
    });
}
if (!file.mimetype.includes('image')) {
    res.status(400).json({
        ok: false,
        mensaje: 'Lo que subio no es una imagen'
    });
}
await;
fileSystem.guardarImagenTemporal(file, req.usuario._id);
res.json({
    ok: true,
    file: file.mimetype
});
;
//Obtener una imagen
postRouter.get('/imagen/:userId/:img', function (req, res) {
    var userId = req.params.userId;
    var img = req.params.img;
    var pathImagen = fileSystem.getImagenUrl(userId, img);
    res.sendFile(pathImagen);
});
exports["default"] = postRouter;
