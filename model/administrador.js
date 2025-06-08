const administradores = [];

function listarAdministradores() {
    return administradores;
}

function cadastrarAdministrador(dados) {
    dados.id = administradores.length + 1;
    administradores.push(dados);
}

function buscarAdministradorPorId(id) {
    return administradores.find(a => a.id == id);
}

function atualizarAdministrador(id, novosDados) {
    const index = administradores.findIndex(a => a.id == id);
    if (index !== -1) {
        administradores[index] = { ...administradores[index], ...novosDados };
    }
}

function removerAdministrador(id) {
    const index = administradores.findIndex(a => a.id == id);
    if (index !== -1) {
        administradores.splice(index, 1);
    }
}

module.exports = {
    listarAdministradores,
    cadastrarAdministrador,
    buscarAdministradorPorId,
    atualizarAdministrador,
    removerAdministrador
};