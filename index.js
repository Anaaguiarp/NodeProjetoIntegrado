console.log("Funcionando!");

/*

comandos no cmd (esteja na pasta do projeto)

-> npm init
preenche as informações

-> npm run start
não esqueça de verificar se o arquivo package.json possui o script ""start": "node index.js""

-> npm install express
para baixar a biblioteca "express"

*/

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//configurando para sempre receber dados em formato JSON
app.use(bodyParser.json);

//encodando todos os parâmetros para JSON
app.use(bodyParser.urlencoded({extended: true}));

//configurante o express para usar o oejs como mecanismo de renderização de views
app.set("view engine", "ejs");

//implementando rotas do tipo GET
app.get("/", (req, res) => {
    res.send("Página inicial");
});

//Listar (read) clientes
app.get("/clientes", (req, res) => {
    res.send("Listagem Clientes.");
});

//Exibir a página de cadastro de cliente
app.get("/cadastrarcliente", (req, res) => {
    res.render("formcliente");
});

//Inserir (create) os clientes
app.post("/cliente", (req, res) => {
    const {nome, cnpj, dataFundacao} = req.body; //corpo da requisição do post

    console.log("Nome: "+nome+" CNPJ: "+cnpj+" Data de Fundação: "+dataFundacao);
    res.send("Cliente inserido com sucesso!")
});

//Editar (update) o cliente
app.get("/editarcliente/:idcliente", (req, res) => {
    const codigoCliente = req.params.idCliente;
    console.log("Editando o cliente: " + codigoCliente);
    res.send("Editando o cliente: "+ codigoCliente);
});

app.put("/cliente", (req, res) =>{
    const {nome, cnpj} = req.body;
    res.send("Cliente atualizado com sucesso!");
});

//Deletando cliente (delete)
app.delete("/cliente/:idcliente", (req, res) => {
    const codigoCliente = req.params.idcliente;
    res.send("Cliente removido com sucesso!");
})

app.get("/fornecedores", (req, res) => {
    res.end("<html><head><title>Listagem de Fornecedores</title></head><body><h3>Pagina de Listagem de Fornecedores</h3><h5>Lista abaixo:</h5></body></html>");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

/*
abrir prompt do proprio node
-> npm install -g nodemon

entrar na pasta do projeto
-> nodemon index.js
(com o nodemon não é necessário parar e startar novamente o código no cmd pois ele já faz isso a cada alteração)

ir no arquivo "package.json" e adicionar o script ""dev": "nodemon index.js""
-> npm run dev

abrir prompt do node
-> npm install body-parser

-> npm install ejs
instalar outra biblioteca

para instalar a biblioteca body parser
*/