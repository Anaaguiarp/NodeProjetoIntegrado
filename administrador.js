const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json);

//encodando todos os parâmetros para JSON
app.use(bodyParser.urlencoded({extended: true}));

//configurante o express para usar o oejs como mecanismo de renderização de views
app.set("view engine", "ejs");

//implementando rotas do tipo GET
app.get("/", (req, res) => {
    res.send("Página inicial");
});

app.get("/clientes", (req, res) => {
    res.send("Listagem Clientes.");
});