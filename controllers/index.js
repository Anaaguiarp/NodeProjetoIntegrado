//console.log("Funcionando");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs"); 
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const {getAdministradores, insertAdministrador, editAdministrador, deleteAdministrador} = require("../models/DAO/AdministradorDAO");

app.get("/", (req, res) => {
    res.status(200).render("index");
});

//Dados de Administrador
//Enviando os dados do administrador (read)
app.get("/administradores", async (req, res) => {
    const administradores = await getAdministradores();
    console.log("Administradores: ", administradores);

    res.status(200).render("listaadministradores", {administradoresDoController: administradores});
});

// API para enviar os dados de administrador
app.get("/api/administradores", async (req, res) => {
    const administradores = await getAdministradores();

    res.status(200).json({sucess: true, administradores});
});

//Inserindo Administrador (create)
app.get("/novoAdministrador", (req, res) => {
    res.status(200).render("formadministrador", {administrador: {}});
});

app.post("/administrador", async (req, res) => {
    const {id, nome, nome_social, email, senha, confirmacao_senha, data_nascimento, genero, conselho_profissional, formacao, registro_profissional, especialidade} = req.body;

    if(id){
        const result = await editAdministrador(id, nome, nome_social, email, senha, confirmacao_senha, data_nascimento, genero, conselho_profissional, formacao, registro_profissional, especialidade);
        if(result) return res.redirect("/administradores");
        return res.status(404).send("Não foi possível editar o administrador!");
    }else{
        const result = await insertAdministrador(nome, nome_social, email, senha, confirmacao_senha, data_nascimento, genero, conselho_profissional, formacao, registro_profissional, especialidade);
        if(result) return res.redirect("/administradores");
        return res.status(404).send("Não foi possível inserir o administrador!");
    }
});

/*app.post("/administrador", async (req, res) => {
    const {nome, nome_social, email, senha, confirmacao_senha, data_nascimento, genero, conselhoProfissional, formacao, registroProfissional, ultimo_login, especialidade} = req.body;
    
    const result = await insertAdministrador(nome, nome_social, email, senha, confirmacao_senha, data_nascimento, genero, conselhoProfissional, formacao, registroProfissional, ultimo_login, especialidade);
    
    if(result){
        return res.status(201).send("Administrador inserido!");
    }
    return res.status(404).send("Administrador Não inserido!");
});*/

//Inserindo administrador via API
app.post("/api/administrador", async (req, res) => {
    const {nome, nome_social, email, senha, data_nascimento, genero, conselho_profissional, formacao, registro_profissional, ultimo_login, especialidade} = req.body;
    const result = await insertAdministrador(nome, nome_social, email, senha, data_nascimento, genero, conselho_profissional, formacao, registro_profissional, ultimo_login, especialidade);
    if(result){
        return res.status(202).json({sucess: true});
    }
    return res.status(400).json({sucess: false});
});

//Atualizando Administrador (Update)
app.get("/editaradministrador/:idadministrador", async (req, res) => {
    const id = req.params.idadministrador;

    const administradores = await getAdministradores();
    const administrador = administradores.find(adm => adm.id == id);

    if (!administrador) {
    return res.status(404).send("Administrador não encontrado");
    }

    res.status(200).render("formadministrador", {administrador});
});

app.put("/administrador", async (req, res) => {
    console.log("REQ.BODY:", req.body);
    const {id, nome, nome_social, email, senha, data_nascimento, genero, conselho_profissional, formacao, registro_profissional, especialidade} = req.body;
    const result = await editAdministrador(id, nome, nome_social, email, senha, data_nascimento, genero, conselho_profissional, formacao, registro_profissional, especialidade);

    if(result){
        return res.status(200).send("Administrador editado com sucesso!")
    }
    return res.status(404).send("Não foi possível editar o administrador")
});

// API para editar um administrador
app.put("/api/administrador", async (req, res) => {
    const {id, nome, nome_social, email, senha, data_nascimento, genero, conselho_profissional, formacao, registro_profissional, especialidade} = req.body;
    const result = await editAdministrador(id, nome, nome_social, email, senha, data_nascimento, genero, conselho_profissional, formacao, registro_profissional, especialidade);

    if(result){
        return res.status(200).json({sucess: true});
    }
    return res.status(404).json({sucess: false});
});

//Removendo Administrador (delete)
app.get("/removeradministrador/:id", async (req, res) => {
    const id = req.params.id;
    const result = await deleteAdministrador(id);
    if(result){
        return res.status(200).redirect("/administradores");
    }
    return res.status(404).send("Não foi possível remover o administrador!");
})

app.delete("/administrador", async (req, res) => {
    const {id} = req.body;
    const result = await deleteAdministrador(id);
    if(result){
        return res.status(200).send("Administrador removido com sucesso!");
    }  
    return res.status(404).send("Não foi possível remover o administrador!");
});

// API para remover o administrador
app.delete("/api/administrador", async (req, res) => {
    const {id} = req.body;
    const result = await deleteAdministrador(id);
    if(result){
        return res.status(200).json({sucess: true});
    }  
    return res.status(404).json({sucess: false});
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- ☆ PACIENTE ☆

const {getPacientes, insertPaciente, editPaciente, deletePaciente} = require("../models/DAO/PacienteDAO");

// READ
app.get("/pacientes", async (req, res) => {
    const pacientes = await getPacientes();
    console.log("Pacientes: ", pacientes);

    res.status(200).render("listaPacientes", {pacientesDoController: pacientes});
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// Formulário - CREATE
app.get('/novopaciente', (req, res) => {
    res.render('formPaciente');
});

// CREATE
app.post('/paciente', async (req, res) => {
    const {nome, nome_social, email, senha, confirmacao_senha, data_nascimento, genero, estado, cidade, medicacao, doenca, tipo_sanguineo
    } = req.body;

    const sucesso = await insertPaciente(nome, nome_social, email, senha, confirmacao_senha, data_nascimento, genero, estado, cidade, medicacao, doenca, tipo_sanguineo
    );

    if (sucesso){
        res.redirect('/pacientes');
    }else{
        res.status(400).send("Erro ao cadastrar paciente.");
    }
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// Formulário - UPDATE
app.get('/editarpaciente/:id', async (req, res) => {
    const {id} = req.params;
    const pacientes = await getPacientes();
    const paciente = pacientes.find(p => p.id == id);

    if(paciente){
        res.render('paciente/edit', { paciente });
    }else{
        res.status(404).send("Paciente não encontrado.");
    }
});

// UPDATE
app.post('/editarpaciente/:id', async (req, res) => {
    const {id} = req.params;

    const {nome, nome_social, email, senha, confirmacao_senha, data_nascimento, genero, estado, cidade, medicacao, doenca, tipo_sanguineo
    } = req.body;

    const sucesso = await editPaciente( id, nome, nome_social, email, senha, confirmacao_senha, data_nascimento, genero, estado, cidade, medicacao, doenca, tipo_sanguineo
    );

    if(sucesso){
        res.redirect('/pacientes');
    }else{
        res.status(400).send("Erro ao editar paciente.");
    }
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// DELETE
app.get('/removerpaciente/:id', async (req, res) => {
    const {id} = req.params;
    const sucesso = await deletePaciente(id);

    if(sucesso){
        res.redirect('/pacientes');
    }else{
        res.status(400).send("Erro ao remover paciente.");
    }
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- ☆ CONTENUDO ☆

const {getConteudos, insertConteudo, editConteudo, deleteConteudo} = require("../models/DAO/ConteudoDAO");

// READ
app.get("/conteudos", async (req, res) => {
    const conteudos = await getConteudos();
    console.log("Conteúdos: ", conteudos);

    res.status(200).render("listaConteudos", { conteudosDoController: conteudos });
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// Formulário - CREATE
app.get('/novoconteudo', (req, res) => {
    res.render('formConteudo', { conteudo: {} });
});

// CREATE
app.post('/conteudo', async (req, res) => {
    const {titulo, texto} = req.body;
    const sucesso = await insertConteudo(titulo, texto);

    if (sucesso) {
        res.redirect('/conteudos');
    } else {
        res.status(400).send("Erro ao cadastrar conteúdo.");
    }
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// Formulário - UPDATE
app.get('/editarconteudo/:id', async (req, res) => {
    const { id } = req.params;
    const conteudos = await getConteudos();
    const conteudo = conteudos.find(c => c.id == id);

    if(conteudo){
        res.render('formConteudo', { conteudo });
    }else{
        res.status(404).send("Conteúdo não encontrado.");
    }
});

// UPDATE
app.post('/editarconteudo/:id', async (req, res) => {
    const {id} = req.params;
    const {titulo, texto} = req.body;
    const sucesso = await editConteudo(id, titulo, texto);

    if(sucesso){
        res.redirect('/conteudos');
    }else{
        res.status(400).send("Erro ao editar conteúdo.");
    }
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// DELETE
app.get('/removerconteudo/:id', async (req, res) => {
    const {id} = req.params;
    const sucesso = await deleteConteudo(id);

    if (sucesso) {
        res.redirect('/conteudos');
    } else {
        res.status(400).send("Erro ao remover conteúdo :(");
    }
});

app.listen(3000, 'localhost', () => {
    console.log("Servidor rodando na porta 3000");
});
