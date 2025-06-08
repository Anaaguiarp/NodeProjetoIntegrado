const express = require("express");
const router = express.Router();

console.log("Paciente router carregado!");

router.get("/", (req, res) => {
    res.send("Listagem de Pacientes");
});

router.get("/cadastrar", (req, res) => {
    res.render("formPaciente");
});

router.post("/", (req, res) => {
    const { nome, cpf, dataNascimento } = req.body;
    console.log("Nome:", nome, "CPF:", cpf, "Data:", dataNascimento);
    res.send("Paciente inserido com sucesso!");
});

router.get("/editar/:idpaciente", (req, res) => {
    const codigoPaciente = req.params.idpaciente;
    console.log("Editando o paciente: ", codigoPaciente);
    res.send("Editando o paciente: " + codigoPaciente);
});

router.delete("/:idpaciente", (req, res) => {
    const codigoPaciente = req.params.idpaciente;
    res.send("Paciente removido com sucesso!");
});

module.exports = router;