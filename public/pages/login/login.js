function entrar() {
  var emailVar = input_email.value;
  var senhaVar = input_senha.value;

  // TODO: VERIFICAR AS VALIDAÇÕES QUE ELES ESTÃO APRENDENDO EM ALGORITMOS
  if (emailVar == '' || senhaVar == '') {
    span_email.innerHTML = `Por favor, preencha todos os campos!`;
    input_email.style.borderColor = ` red `;
    input_senha.style.borderColor = ` red `;
    return false;
  }
  if (emailVar.indexOf('@') == -1 || emailVar.indexOf('.com') == -1) {
    span_email.innerHTML = `Insira um e-mail válido!`;
    input_email.style.borderColor = ` red `;
    input_senha.style.borderColor = ` red `;
    return false;
  }

  console.log('FORM LOGIN: ', emailVar);
  console.log('FORM SENHA: ', senhaVar);

  fetch('/usuarios/autenticar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      console.log('ESTOU NO THEN DO entrar()!');

      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));

          sessionStorage.EMAIL_USUARIO = json.email;
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.ID_USUARIO = json.idProprietario;
          sessionStorage.ID_FUNC = json.idFuncionario;

          setTimeout(function () {
            window.location = './../dashboard/dashboard.html';
          }, 1000); // apenas para exibir o loading
        });
      } else {
        console.log('Houve um erro ao tentar realizar o login!');
        span_email.innerHTML = `Usuário não encontrado, verifique se os dados estão corretos! `;
        input_email.style.borderColor = ` red `;
        input_senha.style.borderColor = ` red `;
        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });

  return false;
}
