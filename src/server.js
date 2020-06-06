const express = require("express")
const server = express()


//configurar pasta public
server.use(express.static("public"))


// configgurar caminhos da minha aplicação
// página inicial
// req: requisição
// res: resposta
server.get("/", (req, res)=> {
    res.sendFile(__dirname + "/views/index.html")
}) 

server.get("/create-point", (req, res)=> {
    res.sendFile(__dirname + "/views/create-point.html")
}) 

//ligar o servidor
server.listen(3000)