const express = require("express");
const router = express.Router();
const administrador = require("../model/administrador");

console.log("Administrador controller carregado!");

// READ - Listar administradores
router.get("/", (req, res) => {
    const administradores = administrador.listarAdministradores();
    res.render("listaAdministradores", { administradores });
});

// CREATE - Mostrar formulário
router.get("/cadastrar", (req, res) => {
    res.render("formAdministrador", { administrador: {} });
});

// CREATE - Cadastro do adm
router.post("/", (req, res) => {
    console.log("Recebido no corpo:", req.body);
    const {
        nome,
        nome_social,
        email,
        senha,
        confirmacao_senha,
        data_nascimento,
        genero,
        conselhoProfissional,
        formacao,
        registroProfissional,
        especialidade
    } = req.body;

    const novoAdministrador = {
        nome,
        nome_social,
        email,
        senha,
        confirmacao_senha,
        data_nascimento,
        genero,
        conselhoProfissional,
        formacao,
        registroProfissional,
        especialidade
    };

    administrador.cadastrarAdministrador(novoAdministrador);

    res.redirect("/administrador"); // redireciona pra listagem
});

// formulário com dados do administrador
router.get("/editar/:idadministrador", (req, res) => {
    const id = req.params.idadministrador;
    const admEncontrado = administrador.buscarAdministradorPorId(id);

    if (admEncontrado) {
        res.render("formAdministrador", { administrador: admEncontrado });
    } else {
        res.status(404).send("Administrador não encontrado");
    }
});

// UPDATE
router.put("/:idadministrador", (req, res) => {
    const id = req.params.idadministrador;
    const dados = req.body;
    administrador.atualizarAdministrador(id, dados);
    res.send("Administrador atualizado com sucesso!");
});

// DELETE
router.delete("/:idadministrador", (req, res) => {
    const id = req.params.idadministrador;
    administrador.removerAdministrador(id);
    res.send("Administrador removido com sucesso!");
});

module.exports = router;