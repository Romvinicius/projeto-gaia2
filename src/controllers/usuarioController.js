var usuarioModel = require('../models/usuarioModel');

var sessoes = [];

function testar(req, res) {
  console.log('ENTRAMOS NA usuarioController');
  res.json('ESTAMOS FUNCIONANDO!');
}

function listar(req, res) {
  usuarioModel
    .listar()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send('Nenhum resultado encontrado!');
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        'Houve um erro ao realizar a consulta! Erro: ',
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function entrar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send('Seu email está undefined!');
  } else if (senha == undefined) {
    res.status(400).send('Sua senha está indefinida!');
  } else {
    usuarioModel
      .entrar(email, senha)
      .then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          //SE NÃO TIVER PROPRIETÁRIO COM ESSE EMAIL E SENHA CONSULTA SE TEM FUNCIONÁRIO
          usuarioModel
          .entrarDois(email, senha)
          .then(function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
    
            if (resultado.length == 1) {
              console.log(resultado);
              res.json(resultado[0]);
            } else if (resultado.length == 0) {
              res.status(403).send('Email e/ou senha inválido(s)');
            } else {
              res.status(403).send('Mais de um usuário com o mesmo login e senha!');
            }
          })
          .catch(function (erro) {
            console.log(erro);
            console.log(
              '\nHouve um erro ao realizar o login! Erro: ',
              erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
          });
        } else {
          res.status(403).send('Mais de um usuário com o mesmo login e senha!');
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          '\nHouve um erro ao realizar o login! Erro: ',
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}
debugger;
function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var telCel = req.body.cellServer;
  var telFixo = req.body.fixoServer;
  var senha = req.body.senhaServer;
  var cpf = req.body.cpfServer;
  var cep = req.body.cepServer;
  var cidade = req.body.cidadeServer;
  var bairro = req.body.bairroServer;
  var uf = req.body.ufServer;
  var logradouro = req.body.logradouroServer;
  var numero = req.body.numeroServer;
  var complemento = req.body.complementoVar;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send('Seu nome está undefined!');
  } else if (email == undefined) {
    res.status(400).send('Seu email está undefined!');
  } else if (senha == undefined) {
    res.status(400).send('Sua senha está undefined!');
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrar(
        nome,
        email,
        senha,
        bairro,
        telCel,
        telFixo,
        cpf,
        cep,
        cidade,
        uf,
        logradouro,
        numero,
        complemento
      )
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          '\nHouve um erro ao realizar o cadastro! Erro: ',
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrarFuncionario(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var plant = req.body.plantacaoServer;
  var cargo = req.body.cargoServer;
  var prop = req.body.proprietarioServer;
  var idFunc = 0;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send('Seu nome está undefined!');
  } else if (email == undefined) {
    res.status(400).send('Seu email está undefined!');
  } else if (senha == undefined) {
    res.status(400).send('Sua senha está undefined!');
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrarFuncionario(
        nome,
        email,
        senha,
        prop
      )
      .then(function (resultado) {
        console.log('CADASTREI O FUNCIONÁRIO')
        //SE CADASTROU O FUNCIONARIO PROCURA O ID DO FUNCIONARIO
        usuarioModel
        .pegarID(
          email
        )
        .then(function (resultado) {
          console.log('COLETEI O ID');
          idFunc = resultado[0].idFuncionario;

          console.log('O ID DO FUNCIONÁRIO É:' + idFunc);
          // SE ACHOU O ID DO FUNCIONÁRIO VINCULA ELE A UMA PLANTAÇÃO
          usuarioModel
          .cadastrarCargo(
            idFunc,
            plant,
            cargo,
            prop
          )
          .then(function (resultado) {
            console.log('VINCULEI O FUNCIONÁRIO A UMA PLANTAÇÃO');
            res.json(resultado);
          })
          .catch(function (erro) {
            console.log(erro);
            console.log(
              '\nHouve um erro ao realizar o cadastro! Erro: ',
              erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
          });
        })
        .catch(function (erro) {
          console.log(erro);
          console.log(
            '\nHouve um erro ao realizar o cadastro! Erro: ',
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          '\nHouve um erro ao realizar o cadastro! Erro: ',
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  entrar,
  cadastrar,
  cadastrarFuncionario,
  listar,
  testar,
};
