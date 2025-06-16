const pacientes = [];

// READ
function listarPacientes(){
    return pacientes;
}

// CREATE
function cadastrarPaciente(dados){
    dados.id = pacientes.length + 1;
    pacientes.push(dados);
}

function buscarPacientePorId(id){
    return pacientes.find(x => x.id == id);
}

function atualizarPaciente(id, novosDados){
    const index = pacientes.findIndex(x => x.id == id);

    if(index !== -1){
        pacientes[index] = {...pacientes[index], ...novosDados};
    }
}

function removerPaciente(id){
    const index = pacientes.findIndex(x => x.id == id);

    if(index !== -1){
        pacientes.splice(index, 1);
    }
}

module.exports = {
    listarPacientes,
    cadastrarPaciente,
    buscarPacientePorId,
    atualizarPaciente,
    removerPaciente
};