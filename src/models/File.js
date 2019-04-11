const mongoose = require("mongoose");

const File = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toObject: { virtuals: true }, // Toda vez que o const File for convertido em Object ou JSON
        toJSON: { virtuals: true } // é para fazer o carregamento do virtual abaixo automaticamente
    }
);

// Campo virtual: não existe no mongo, mas existe aqui no Backend
File.virtual("url").get(function() {
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`
});

module.exports = mongoose.model("File", File);