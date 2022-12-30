// ## Sistema de Vagas de Emprego

// Escreva um programa em javascript que simule um sistema de vagas de emprego, onde é possível gerenciar as vagas e adicionar candidatos às vagas. Ele deve atender aos seguintes requisitos:

// - Ter um um menu onde é possível escolher entre as diferentes funcionalidades do sistema
//     - Listar vagas disponíveis
//     - Criar um nova vaga
//     - Visualizar uma vaga
//     - Inscrever um candidato em uma vaga
//     - Excluir uma vaga
//     - Sair
// - A opção de listar as vagas deve mostrar o índice, o nome e a quantidade de candidatos inscritos de todas as vagas.
// - A opção de criar uma nova vaga deve pedir um nome para a vaga, uma descrição e uma data limite, e também deve pedir que o usuário confirme as informações antes de salvá-las.
// - A opção de visualizar uma vaga deve pedir o índice da vaga e mostrar todas as informações dela: índice, nome, descrição, data limite, quantidade de candidatos e o nome dos candidatos.
// - A opção de inscrever um candidato em uma vaga deve pedir o nome do candidato, o índice da vaga e então uma confirmação exibindo as informações da vaga antes de salvar o candidato na vaga.
// - A opção de excluir uma vaga deve pedir o índice da vaga, mostrar suas informações e pedir que o usuário confirme a exclusão da vaga antes de realmente exclui-la.

// Este é o exercício de revisão do módulo, então aproveite para utilizar todos os recursos vistos até agora sempre que possível, como os objetos, arrays e funções.

let continuar = true;
let option;
var opportunity = [];
var candidates = [];
let vagastxt = "";

function createOpportunity() {
    let name = prompt("Digite o nome da vaga:");
    let description = prompt("Insira a descrição da vaga:");
    let limit = prompt("Digite a data limite da vaga (dd/mm/aaaa):");
    return {
        name: name,
        description: description,
        limit: limit
    };
}

function listOpportunity() {
    for (let i = 0; i < opportunity.length; i++) {
        vagastxt = vagastxt + `${i + 1} - ${opportunity[i].name}` + '\n'
    }
    return vagastxt;
}

function showOpportunity(i = -1) {
    if (i == -1) {
        i = parseInt(prompt("Digite o índice da vaga que você procura:"));
        alert(`Índice da vaga: ${i}
            Nome da vaga: ${opportunity[i - 1].name}
            Descrição: ${opportunity[i - 1].description}
            Data Limite: ${opportunity[i - 1].limit}
            Quantidade de Inscritos: ${countCandidate(i)}
            Nome dos candidatos: ${listCandidates(i)}`);
    } else {
        return (`Índice da vaga: ${i}
            Nome da vaga: ${opportunity[i - 1].name}
            Descrição: ${opportunity[i - 1].description}
            Data Limite: ${opportunity[i - 1].limit}
            Quantidade de Inscritos: ${countCandidate(i)}
            Nome dos candidatos: ${listCandidates(i)}`);

    }
}

function countCandidate(i){
    let count = 0;
    for(let k = 0; k < candidates.length; k++){
        if(candidates[k].indice == i){
            count += 1;
        }
    }
    return count;
}

function listCandidates(i){
    let list = '';
    for (let l = 0; l < candidates.length; l++) {
        if(candidates[l].indice == i){
            list = list + ` - ${candidates[l].name}` + '\n';
        }
    }
    return list;

}

function subscription() {
    let nameCandidate = prompt("Digite o nome do candidato:");
    let i = prompt("Digite o indice da vaga:");
    if (i == 0 || i > opportunity.length) {
        alert("Opção inválida! Tente novamente");
        subscription();
    }
    confirm(`Confirme a inscrição na seguinte vaga:
            ${showOpportunity(i)}`);
    if (confirm) {
        return {
            name: nameCandidate,
            indice: i
        };
    } else {
        alert("Reiniciando inscrição...");
        subscription();
    }
}

function exclude() {
    let indiceExclude = parseInt(prompt("Digite o índice da vaga a ser excluída:"));
    confirm(`Confirme a exclusão da seguinte vaga:
            ${showOpportunity(indiceExclude)}`);
    if (confirm) {
        opportunity.splice(indiceExclude - 1, 1);
        for (let m = 0; m < candidates.length; m++) {
            if(candidates[m].indice == indiceExclude){
                candidates.splice(m, 1);
            }
        }
        
        alert("Vaga excluída com sucesso!");
    } else {
        alert("Vaga não excluída!");
        return;
    }

}




do {
    option = prompt(`-------InfoJoys---------
    Esolha uma opção:

    1)Ver vagas disponíveis
    2)Criar vaga
    3)Vizualizar vaga
    4)Inscrever em uma vaga
    5)Excluir vaga

    0)Sair`);

    switch (option) {
        case '1':
            listOpportunity();
            alert(`Vagas Disponíveis:
            
            ${vagastxt}`);
            vagastxt = '';
            break;

        case '2':
            opportunity.push(createOpportunity());
            break;

        case '3':
            showOpportunity();
            break;

        case '4':
            candidates.push(subscription());
            break;

        case '5':
            exclude();
            break;

        case '0':
            alert("Saindo...");
            continuar = false;
            break;

        default:
            alert("Opção inválida!");
            break;
    }


} while (continuar);


