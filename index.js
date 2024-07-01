let clinica = [];
let consulta;
let opcao;
console.log("Deseja marcar uma consulta? Se sim, digite 'Marcar': ");
process.stdin.on("data", function(data) {
    let entrada = data.toString().trim();
    if (!opcao) {
        opcao = entrada;
        if (opcao === "listar") {
            console.log("Lista de pacientes:");
            listarConsultas();
            opcao = undefined;
            console.log("Deseja marcar outra consulta? Se sim, digite 'Marcar', se não, digite 'Cancelar':");
        } else if (opcao === "Marcar") {
            iniciarNovaConsulta();
        } else if (opcao === "Alterar") {
            console.log("Digite o número da consulta que deseja alterar:");
            listarConsultas();
            opcao = "alterar";
        } else if (opcao === "Remover") {
            console.log("Digite o número da consulta que deseja remover:");
            listarConsultas();
            opcao = "remover";
        } else if (opcao === "Cancelar") {
            cancelarOperacao();
        }
    } else {
        if (opcao === "Marcar") {
            marcarConsulta(entrada);
        } else if (opcao === "alterar") { 
            processarAlteracao(entrada);
        }else if (opcao === "remover") {
            removerConsulta(entrada);
        }
    }
});
function listarConsultas() {
    clinica.forEach((consulta, index) => {
        console.log(`${index + 1}. Nome: ${consulta.nome}, Médico: ${consulta.medico}, Data: ${consulta.data}, Hora: ${consulta.hora}`);
    });
}
function iniciarNovaConsulta() {
    consulta = {};
    console.log("Nome do paciente:");
}
function marcarConsulta(valor) {
    if (!consulta.nome) {
        consulta.nome = valor;
        console.log("Nome do Médico:");
    } else if (!consulta.medico) {
        consulta.medico = valor;
        console.log("Data da consulta:");
    } else if (!consulta.data) {
        consulta.data = valor;
        console.log("Hora marcada para a consulta:");
    } else if (!consulta.hora) {
        consulta.hora = valor;
        clinica.push(consulta);
        consulta = undefined;
        console.log("Consulta marcada com sucesso e adicionada à lista!");
        opcao = undefined;
        console.log("Deseja marcar outra consulta? Se sim, digite 'Marcar', se não, digite 'Cancelar':");
    }
}
function processarAlteracao(numeroConsulta) {
    let index = parseInt(numeroConsulta) - 1;
    if (index >= 0 && index < clinica.length) {
        consulta = clinica[index];
        console.log(`Consulta selecionada para alteração: ${consulta.nome}, Médico: ${consulta.medico}, Data: ${consulta.data}, Hora: ${consulta.hora}`);
        console.log("Digite o campo que deseja alterar (Nome, Médico, Data, Hora):");
        process.stdin.once("data", function(data) {
            let campo = data.toString().trim().toLowerCase();
            switch (campo) {
                case "nome":
                    console.log("Novo nome do paciente:");
                    break;
                case "médico":
                    console.log("Novo nome do médico:");
                    break;
                case "data":
                    console.log("Nova data da consulta:");
                    break;
                case "hora":
                    console.log("Nova hora da consulta:");
                    break;
                default:
                    console.log("Campo inválido.");
                    opcao = undefined;
                    console.log("Deseja marcar uma consulta? Se sim, digite 'Marcar': ");
                    return;
            }
            process.stdin.once("data", function(novoValor) {
                novoValor = novoValor.toString().trim();
                switch (campo) {
                    case "nome":
                        consulta.nome = novoValor;
                        break;
                    case "médico":
                        consulta.medico = novoValor;
                        break;
                    case "data":
                        consulta.data = novoValor;
                        break;
                    case "hora":
                        consulta.hora = novoValor;
                        break;
                }
                console.log("Consulta alterada com sucesso!");
                opcao = undefined;
                console.log("Deseja marcar outra consulta? Se sim, digite 'Marcar', se não, digite 'Cancelar':");
            });
        });
    } else {
        console.log("Número de consulta inválido.");
        opcao = undefined;
        console.log("Deseja marcar uma consulta? Se sim, digite 'Marcar': ");
    }
}
function removerConsulta(numeroConsulta) {
    let index = parseInt(numeroConsulta) - 1;
    if (index >= 0 && index < clinica.length) {
        clinica.splice(index, 1);
        console.log("Consulta removida com sucesso!");
    } else {
        console.log("Número de consulta inválido.");
    }
    opcao = undefined;
    console.log("Deseja marcar outra consulta? Se sim, digite 'Marcar', se não, digite 'Cancelar':");
}

function cancelarOperacao() {
    consulta = undefined;
    console.log("Operação de marcação de consulta cancelada.");
    opcao = undefined;
}