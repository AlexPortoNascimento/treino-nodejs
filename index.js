const express = require("express");
const server = express();

server.use(express.json());

let customers = [
    {id: 1, name: "Dev Samurai", site: "http://devsamurai.com.br"},
    {id: 2, name: "Google", site: "http://google.com.br"},
    {id: 3, name: "UOL", site: "http://uol.com.br"},
    {id: 4, name: "Tibia", site: "http://tibia.com"},

];

//Cria a opção de listar todos os registros usando o metodo REST get
server.get("/customers", (req,res) => {
    return res.json(customers);
})

//Cria a opção de mostrar um registro específico usando o metodo REST GET
server.get("/customers/:id", (req,res) => {
    //transforma o id colocado na url em inteiro
    const id = parseInt(req.params.id);
    
    //encontra o item da lista customers que possui o id colocado na url
    const customer = customers.find(item => item.id === id);
    
    //se existir um item na lista com o id colocado na url, retorna 200(OK), se não, retorna 404(not found)
    const status = customer ? 200 : 404; 

    return res.status(status).json(customer);
})

//Cria a opção de criar novos registros usando o metodo REST post
server.post("/customers", (req,res) => {
    //variavel que possibilita receber o json com name, site
    const { name, site } = req.body;

    //variável que recebe o próximo id em relação ao ultimo id da lista customers
    const id = customers[customers.length-  1].id + 1;

    //cria um novo customer, recebendo o id novo criado, o name e o site do json enviado
    const newCustomer = { id, name, site };

    //coloca na lisa customers o novo customer
    customers.push(newCustomer);

    //retorna o status 201(Created)
    return res.status(201).json(newCustomer);
});

//Cria a opção de atualizar registros usando o metodo REST put
server.put("/customers/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const { name, site } = req.body;

    //encontra o item da lista customers que tem o id colocado na url
    const index = customers.findIndex(item => item.id === id);

    //se o index for maior que 0, retorna 200, se não 404
    const status = index >= 0 ? 200 : 404;

    //se o index for maior que 0, modifica o item para os paraemetros colocados pelo json na hora do put
    if (index >= 0) {
        customers[index] = { id: parseInt(id), name, site };
    }

    //retorna o status e o json do item modificado
    return res.status(status).json(customers[index]);
});

//Cria a opção de excuir registros usando o metodo REST delete
server.delete("/customers/:id", (req,res) => {
    const id = parseInt(req.params.id);

    const index = customers.findIndex(item => item.id === id);
    const status = index >= 0 ? 200 : 404;

    //se o index for >=0, deleta o index. O segundo parametro é a quantidade de items a ser deletado a partir do index colocado
    if (index >= 0) {
        customers.splice(index, 1);
    }

    return res.status(status).json();
});

server.listen(3000)