const pacienteRouter = require('./controller/pacienteController');
const administradorRouter = require('./controller/administradorController');

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const IP = "127.0.0.1";

//Configurando para sempre receber os dados no formato JSON
app.use(bodyParser.json());
//Encondando todos os parâmetros para JSON
app.use(bodyParser.urlencoded({extended: true}));

//Configurando o express para usar o EJS como mecanismo de renderização de views padrão
app.set("view engine", "ejs");

//Implementado rotas do tipo GET
app.get("/", (req, res) => {
    res.send("<h1>Página inicial</h1>");
})

//Listar (read) os clientes
app.get("/clientes", (req, res) => {
    res.send("Listagem de clientes.");
})

//Exibir a página de cadastro de clientes
app.get("/cadastrarcliente", (req, res) =>{
    res.render("formcliente");
})

//Inserir (create) os clientes
app.post("/cliente", (req, res) => {
    const {nome, cnpj, dataFundacao} = req.body;

    console.log("Nome: " + nome + " CNPJ: " + cnpj + " Data: " + dataFundacao);
    res.send("Cliente inserido com sucesso!");
})

//Exibir a página de atualiazação do cliente
app.get("/editarcliente/:idcliente", (req, res) => {
    const codigoCliente = req.params.idcliente;
    console.log("Editando o cliente: ", codigoCliente);
    res.send("Editando o cliente: " + codigoCliente);
})

//Editar (update) o cliente
app.put("/cliente", (req, res) => {
    const {nome, cnpj} = req.body;
    //método no banco para atualizar o cliente passando (nome, cnpj)
    res.send("Cliente atualizado com sucesso");
})

//Apagando um cliente (delete)
app.delete("/cliente/:idcliente", (req, res) => {
    const codigoCliente = req.params.idcliente;
    //método no banco de dados para remover um cliente passando o id
    res.send("Cliente removido com sucesso!");
})

app.get("/fornecedores", (req, res) => {
    res.end("<html><head><title>Listagem de fornecedores</title></head><body><h3>Página de Listagem de Fornecedores</h3><h5>Lista abaixo</h5></body></html>");
})

app.use("/paciente", pacienteRouter);
app.use("/administrador", administradorRouter);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
})