// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var proprietario = sessionStorage.ID_USUARIO;

    if (email != null && nome != null) {

        name_user.innerHTML = nome;
        //SE O ID DO PROPRIETÁRIO FOR DIFERENTE DE NULL DEIXA ELE TER ACESSO AO REGISTRO DE FUNCIONÁRIO
        if(proprietario != 'undefined'){
            document.querySelector('.proprietario').style.display = 'block'
        }
        // finalizarAguardar();
    } else {

        window.location = "/pages/login/login.html";
    }
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "/index.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.innerHTML = texto;
    }
}


// modal
function mostrarModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "flex";
}

function fecharModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "none";
}

// ATUALIZANDO O DASHBOARD COM AS PLANTAÇÕES DO CLIENTE
function atualizarFeedDash() {
    var idVar = sessionStorage.EMAIL_USUARIO;
    //aguardar();
    fetch(`/avisos/listarPlantacoes/${idVar}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                alert('Os serviços de instalação ainda estão em andamento! Por favor Aguarde!');
            }
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var temp = document.getElementById("temp");
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    // criando e manipulando elementos do HTML via JavaScript
                    var nomePlant = document.createElement("option");
                    temp.appendChild(nomePlant);
                    nomePlant.value = publicacao.idPlantacao;
                    nomePlant.innerHTML = publicacao.nomePlantacao
                }

                //finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        //finalizarAguardar();
    });
}

// ATUALIZANDO O DASHBOARD COM AS PLANTAÇÕES DO CLIENTE
function atualizarFeedCadastro() {
    var idVar = sessionStorage.EMAIL_USUARIO;
    //aguardar();
    fetch(`/avisos/listarPlantacoes/${idVar}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
               /* alert('Você ainda não possuí Plantações registradas!');
                window.location = "/pages/dashboard/dashboard.html";*/
            }
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var cadastro = document.getElementById("cad");
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    var nomePlant2 = document.createElement("option");
                    cadastro.appendChild(nomePlant2);
                    nomePlant2.value = publicacao.idPlantacao;
                    nomePlant2.innerHTML = publicacao.nomePlantacao

                }

                //finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        //finalizarAguardar();
    });
}


//ATUALIZANDO OS SETORES COM OS SETORES DE DETERMINADA PLANTAÇÃO
function atualizarSetorTemp() {
    var idVar = temp.value; 
    //aguardar();
    fetch(`/avisos/listarSetores/${idVar}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                alert('Você não possuí nenhum setor para essa plantação');
                var temp = document.getElementById("card_temp");
                temp.innerHTML = ''
                var umi = document.getElementById("card_umi");
                umi.innerHTML = ''
            }
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var temp = document.getElementById("card_temp");
                temp.innerHTML = ''
                var umi = document.getElementById("card_umi");
                umi.innerHTML = ''
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    // criando e manipulando elementos do HTML via JavaScript
                    var cardSetor = document.createElement("div");
                    temp.appendChild(cardSetor);
                    cardSetor.className = 'setor';

                    var nomeSetor = document.createElement('h3');
                    nomeSetor.innerHTML = `Setor ${publicacao.nomeSetor}`
                    cardSetor.appendChild(nomeSetor);

                    var temperatura = document.createElement('div');
                    temperatura.className = 'temperatura';
                    cardSetor.appendChild(temperatura);

                    // criando e manipulando elementos do HTML via JavaScript Umidade
                    var cardSetorUmi = document.createElement("div");
                    umi.appendChild(cardSetorUmi);
                    cardSetorUmi.className = 'setor';

                    var nomeSetorUmi = document.createElement('h3');
                    nomeSetorUmi.innerHTML = `Setor ${publicacao.nomeSetor}`
                    cardSetorUmi.appendChild(nomeSetorUmi);

                    var umidade = document.createElement('div');
                    umidade.className = 'temperatura';
                    cardSetorUmi.appendChild(umidade);
                }

                //finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        //finalizarAguardar();
    });
}

// function atualizarSetorUmi() {
//     var idVar = umi.value; 
//     //aguardar();
//     fetch(`/avisos/listarSetores/${idVar}`).then(function (resposta) {
//         if (resposta.ok) {
//             if (resposta.status == 204) {
//                 alert('Você não possuí nenhum setor para essa plantação');
//                 var temp = document.getElementById("card_umi");
//                 temp.innerHTML = ''
//             }
//             resposta.json().then(function (resposta) {
//                 console.log("Dados recebidos: ", JSON.stringify(resposta));

//                 var temp = document.getElementById("card_umi");
//                 temp.innerHTML = ''
//                 for (let i = 0; i < resposta.length; i++) {
//                     var publicacao = resposta[i];

//                     // criando e manipulando elementos do HTML via JavaScript
//                     var cardSetor = document.createElement("div");
//                     temp.appendChild(cardSetor);
//                     cardSetor.className = 'setor';

//                     var nomeSetor = document.createElement('h3');
//                     nomeSetor.innerHTML = `Setor ${publicacao.nomeSetor}`
//                     cardSetor.appendChild(nomeSetor);

//                     var temperatura = document.createElement('div');
//                     temperatura.className = 'temperatura';
//                     cardSetor.appendChild(temperatura);

//                 }

//                 //finalizarAguardar();
//             });
//         } else {
//             throw ('Houve um erro na API!');
//         }
//     }).catch(function (resposta) {
//         console.error(resposta);
//         //finalizarAguardar();
//     });
// }

// Exibir o funcionarios
function exibirFuncionarios() {
    //aguardar();
    var idProprietario = temp.value;
    fetch(`/avisos/listarFuncionarios/${idProprietario}`).then(function (resposta) {
        if (resposta.ok) {
            var func = document.getElementById("table_func");
                func.innerHTML = ''
                func.innerHTML = `
                <tr class="tr_title">
                <td>Nome</td>
                <td>Cargo</td>
                <td>Modificar</td>
                <td>Deletar</td>
              </tr>`
            if (resposta.status == 204) {
                alert('Você não possuí nenhum funcionário');
                var func = document.getElementById("table_func");
                func.innerHTML = ''
                func.innerHTML = `
                <tr class="tr_title">
                <td>Nome</td>
                <td>Cargo</td>
                <td>Modificar</td>
                <td>Deletar</td>
              </tr>`
            }
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var func = document.getElementById("table_func");
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    var linhas_func = document.createElement("tr")
                    func.appendChild(linhas_func);
                    linhas_func.className = "tr_func";

                    var td_nome_func = document.createElement("td")
                    linhas_func.appendChild(td_nome_func);
                    td_nome_func.innerHTML = `${publicacao.nome}`;

                    var td_cargo_func = document.createElement("td")
                    linhas_func.appendChild(td_cargo_func);
                    td_cargo_func.innerHTML = `${publicacao.cargo}`;

                    var td_modificar_func = document.createElement("td")
                    linhas_func.appendChild(td_modificar_func);
                    td_modificar_func.innerHTML = `<button>Modificar</button>`;

                    var td_deletar_func = document.createElement("td")
                    linhas_func.appendChild(td_deletar_func);
                    td_deletar_func.innerHTML = `<button>Deletar</button>`;
                }

                //finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        //finalizarAguardar();
    });
}