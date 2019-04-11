const Box = require("../models/Box");
const File = require("../models/File");

class FileController {
    async store(req, res) {
        // Criar um arquivo
        const box = await Box.findById(req.params.id); // Parâmetro da minha rota

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key,
        });

        box.files.push(file);

        await box.save();

        // Avisar aos usuários que houve um novo aquivo.. em realtime
        req.io.sockets.in(box._id).emit("file", file); // Tanto o cara no desktop quanto o cara no mobile serão notificados

        return res.json(file);
    }
}

module.exports = new FileController();