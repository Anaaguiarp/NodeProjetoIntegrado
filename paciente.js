console.log("Paciente!");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json);

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("Página inicial");
});

app.get("/pacientes", (req, res) => {
    res.send("Listagem de Pacientes");
});

app.get("/cadastrarpaciente", (req, res) => {
    res.render("formPaciente");
});

// INSERIR
app.post("/paciente", (req, res) => {
    const {} = req.body;

    console.log("Nome: " + + " CNPJ: " +  + " Data: " );
    res.send("Paciente inserido com sucesso!");
});

// UPDATE
app.get("/editarpaciente/:idpaciente", (req, res) => {
    const codigoPaciente = req.params.idpaciente;
    console.log("Editando o cliente: ", codigoPaciente);
    res.send("Editando o cliente: " + codigoPaciente);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
})