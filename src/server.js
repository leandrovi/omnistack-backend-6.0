// Importar a Biblioteca Express do node_modules:
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

// Importante definir o cors antes de tudo
app.use(cors()); // Basicamente, todo mundo pode acessar minha aplicação e consumir os recursos dela

// Variável da minha aplicação, que vai guardar todas as infos da aplicação
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server); // o Socket.io retorna uma função, por isso já atribuimos em formato de função com server como parâmetro

// Toda vez que o usuário abrir a aplicação, vou receber o socket que representa a conexão do usuário com o realtime
io.on("connection", socket => {
    // Quando receber uma requisição chamada connectRoom
    socket.on("connectRoom", box => {
        // Vou pegar o socket e dar um join na sala box
        socket.join(box); // A partir desse momento o usuário fica isolado do restante dos usuários na aplicação
    })
});

// Conectar com o MongoDB Atlas
mongoose.connect(
    "mongodb+srv://leandrovi:leandrovi@omnistack-apini.mongodb.net/omnistack?retryWrites=true",
    {
        useNewUrlParser: true,
    }
);

// Para interagir com o usuário isolado no socket, criar um middleware global
app.use((req, res, next) => {
    req.io = io; // A partir de agora, toda requisição vai ter acesso ao io dentro do req

    return next(); // Se não colocar, as requisições não saem daqui.. e as rotas http terminam de processar com o response
});

// Cadastrar um módulo dentro do meu Express
app.use(express.json()); // Middleware que ajuda o servidor a entender as requisições que vem em formato json
app.use(express.urlencoded({ extended: true })); // Permite enviar arquivos pelo json
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp"))); // Redirecionamento toda vez que o usuário acessar a rota "/files"

// Usar arquivo de rotas separado:
app.use(require("./routes")); // O "./" serve pra dizer que não é um node_modules

server.listen(process.env.PORT || 3333); // Trocar app por server permite a aplicação ouvir protocolos tanto http quanto web socket

// Como definir rotas para receber informações em real time e também enviar ?
// Basta utilizar io.on("connection", socket => ());