input_nome.value;
input_email.value;
input_telFixo.value;
input_celular.value;
input_cep.value;
input_uf.value;
input_cidade.value;
input_bairro.value;
input_rua.value;
input_numero.value;
input_complemento.value;
input_senha.value;
input_confirmarSenha.value;

function validarEmail() {
  if (
    input_email.value.indexOf('@') > -1 &&
    input_email.value.endsWith('.com')
  ) {
    span_error_email.innerHTML = '';
    span_error_email.style.color = '#002B2B';
  } else {
    span_error_email.innerHTML = 'E-mail Invalido';
    span_error_email.style.color = 'red';
  }
}

function validarSenha() {
  var color = '';

  if (
    input_senha.value != input_confirmarSenha.value &&
    input_confirmarSenha.value.length != 0
  ) {
    color = 'red';
    span_error_senha.innerHTML = `As senhas estão incorretas!`;
    span_error_confirmarSenha.innerHTML = `As senhas estão incorretas!`;
  } else {
    if (
      input_senha.value.length < 8 &&
      input_confirmarSenha.value.length < 8 &&
      input_confirmarSenha.value.length != 0
    ) {
      color = 'red';
      span_error_senha.innerHTML = `As senhas estão abaixo de 8 caracteres!`;
      span_error_confirmarSenha.innerHTML = `As senhas estão abaixo de 8 caracteres!`;
    } else {
      color = '#002B2B';
      span_error_senha.innerHTML = ``;
      span_error_confirmarSenha.innerHTML = ``;
    }
  }
  input_senha.style.color = `${color}`;
  input_confirmarSenha.style.color = `${color}`;
  input_senha.style.borderBottom = `2px solid ${color}`;
  input_confirmarSenha.style.borderBottom = `2px solid ${color}`;
}

function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('input_rua').value = '';
  document.getElementById('input_bairro').value = '';
  document.getElementById('input_cidade').value = '';
  document.getElementById('input_uf').value = '';
}

function meu_callback(conteudo) {
  if (!('erro' in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('input_rua').value = conteudo.logradouro;
    document.getElementById('input_bairro').value = conteudo.bairro;
    document.getElementById('input_cidade').value = conteudo.localidade;
    document.getElementById('input_uf').value = conteudo.uf;
    input_cep.style.borderBottom = '2px solid #002B2B';
    input_cep.style.color = 'black';
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    span_error_cep.innerHTML = `CEP não encontrado!`;
    input_cep.style.borderBottom = '2px solid red';
    input_cep.style.color = 'red';
  }
}

function pesquisacep(valor) {
  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if (cep != '') {
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById('input_rua').value = '...';
      document.getElementById('input_bairro').value = '...';
      document.getElementById('input_cidade').value = '...';
      document.getElementById('input_uf').value = '...';
      span_error_cep.innerHTML = ``;
      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src =
        'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);
    } //end if.
    else {
      //cep é inválido.
      limpa_formulário_cep();
      span_error_cep.innerHTML = `Digite um CEP válido!`;
      span_error_cep.style.color = 'red';
      input_cep.style.borderBottom = '2px solid red';
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
  }
}

function cadastrar() {
  fetch('/usuarios/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nomeServer: input_nome.value,
      emailServer: input_email.value,
      senhaServer: input_senha.value,
      cepServer: input_cep.value,
      cidadeServer: input_cidade.value,
      ufServer: input_uf.value,
      logradouroServer: input_rua.value,
      numeroServer: input_numero.value,
      complementoServer: input_complemento.value,
      bairroServer: input_bairro.value,
      cellServer: input_celular.value,
      fixoServer: input_telFixo.value,
      cpfServer: input_cpf.value,
    }),
  })
    .then(function (resposta) {
      console.log('resposta: ', resposta);

      if (resposta.ok) {
        window.location = '../login/login.html';
      } else {
        // alert('Houve um erro ao realizar o cadastro');
        throw 'Houve um erro ao tentar realizar o cadastro!';
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
  return false;
}

const btnCadastroVar = document.getElementById('btnCadastro');
btnCadastroVar.addEventListener('click', cadastrar);

function getEventForm(event) {
  event.preventDefault();
}

btnCadastroVar.addEventListener('click', getEventForm);
