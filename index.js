//abertura do server express com require
const express = require("express");
const server = express();

//http://localholst:3000/hello?nome=Alexandre?idade=27
//Query params (querry = consulta) = ?nome=Alexandre&idade=27
//os parametros de consulta não são obrigatórios, entao, se nenhum parametro for oferecido, ele entrará na rota, e usará o undefined

//utilizando o servidor para enviar a mensagem de hello world em formato json
server.get("/hello", (req, res) => {
    const { nome, idade } = req.query;


    return res.json({
        title: "Hello World",
        message: `Olá ${nome}, tudo bem?`,
        idade: idade,
    })
});

//http://localhost:3000/hello/Alexandre
//Route params = /hello/:nome
//parametros de rota são obrigatórios, ou seja, é requerido que tenha o /alexandre para que essa rota seja usada

server.get("/hello/:nome", (req, res) => {
    const nome = req.params.nome;

    return res.json({
        title: "Hello World",
        message: `Olá ${nome}, tudo bem?`
    })
})

//determinando a porta a ser utilizada pelo servidor
server.listen(3000);
