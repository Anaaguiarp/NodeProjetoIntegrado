console.log("Administrador!");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json);

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("Página inicial");
});

app.get("/administradores", (req, res) => {
    res.send("Listagem de Administradores");
});

app.get("/cadastraradministrador", (req, res) => {
    res.render("formAdministrador");
});

// INSERIR
app.post("/administrador", (req, res) => {
    const {} = req.body;

    console.log("Nome: " + + " CNPJ: " +  + " Data: " );
    res.send("Administrador inserido com sucesso!");
});

// UPDATE
app.get("/editaradministrador/:idadministrador", (req, res) => {
    const codigoAdministrador = req.params.idadministrador;
    console.log("Editando o paciente: ", codigoAdministrador);
    res.send("Editando o paciente: " + codigoAdministrador);
});

// DELETE
app.delete("/administrador/:idadministrador", (req, res) => {
    const codigoPaciente = req.params.idpaciente;
    //método no banco de dados para remover um cliente passando o id
    res.send("Administrador removido com sucesso!");
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
})