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

app.get("/cadastrarPaciente", (req, res) => {
    res.render("formPaciente");
});

