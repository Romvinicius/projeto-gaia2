function cadastrarFuncionario() {
    fetch('/usuarios/cadastrarFuncionario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nomeServer: input_nome.value,
        emailServer: input_email.value,
        senhaServer: input_senha.value,
        plantacaoServer: cad.value,
        cargoServer: input_cargo.value,
        proprietarioServer: sessionStorage.ID_USUARIO,
      }),
    })
      .then(function (resposta) {
        console.log('resposta: ', resposta);
  
        if (resposta.ok) {
            alert('Funcionário Cadastrado com Sucesso!');
            window.location = "../dashboard.html";
            input_email.value = '';
            input_senha.value = '';
            input_nome.value = '';
            input_confirmarSenha.value = '';
            input_cargo.value = '';
            cad.value = 0
        } else {
          alert('Houve um erro ao realizar o cadastro');
          throw 'Houve um erro ao tentar realizar o cadastro!';
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
    return false;
  }
  