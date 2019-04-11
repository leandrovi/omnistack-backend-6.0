// Esse model vai representar uma pasta na minha aplicação
const mongoose = require("mongoose");

const Box = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }] // Vai ser um vetor de models
    },
    {
        timestamps: true // Faz com que crie um campo chamado CreatedAt e UpdatedAt em cada registro do meu schema
    }
);

module.exports = mongoose.model("Box", Box);