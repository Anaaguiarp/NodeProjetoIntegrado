const express = require("express");
const router = express.Router();
const paciente = require("../model/paciente");

console.log("Paciente controller carregado!");

// READ - Listando os pacientes
router.get("/", (req, res) => {
    const pacientes = paciente.listarPacientes();
    res.render("listaPacientes", { pacientes});
});

// CREATE 1 - Formulário
router.get("/cadastrar", (req, res) => {
    res.render("formPaciente", { paciente: {} });
});

// CREATE 2 - Cadastrando paciente
router.post("/", (req, res) => {
    const {
        nome,
        nome_social,
        email,
        senha,
        confirmacao_senha,
        data_nascimento,
        estado,
        cidade,
        genero,
        tipo_sanguineo,
        medicacao,
        doencas,
    } = req.body;

    const novoPaciente = {
        nome,
        nome_social,
        email,
        senha,
        confirmacao_senha,
        data_nascimento,
        estado,
        cidade,
        genero,
        tipo_sanguineo,
        medicacao,
        doencas,
    };

    paciente.cadastrarPaciente(novoPaciente);
    res.redirect("/paciente");
});

router.get("/editar/:idpaciente", (req, res) => {
    const id = req.params.idpaciente;
    const pacienteEncontrado = paciente.buscarPacientePorId(id);

    if (pacienteEncontrado) {
        res.render("formPaciente", {paciente: pacienteEncontrado});
    } else {
        res.status(404).send("Paciente não encontrado");
    }
});

// UPDATE
router.put("/:idpaciente", (req, res) => {
    const id = req.params.idpaciente;
    const dados = req.body;
    paciente.atualizarPaciente(id, dados);
    res.send("Paciente atualizado com sucesso!");
});

// DELETE
router.delete("/:idpaciente", (req, res) => {
    const id = req.params.idpaciente;
    paciente.removerPaciente(id);
    res.send("Paciente removido com sucesso!");
});

module.exports = router;