const metaModel = require("../../../models/Meta");

class MetaImageController {
    async getImage(req, res) {
        const metaImage = await metaModel.getImageMeta(req.params.metaId);

        res.setHeader("Content-Type", metaImage.tipo_imagem);

        return res.send(metaImage.imagem_meta);
    }
}

const MetaImageControllerRead = new MetaImageController();

module.exports = MetaImageControllerRead;