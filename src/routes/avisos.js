var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/", function (req, res) {
    avisoController.testar(req, res);
});

router.get("/listarPlantacoes/:idUsuario", function (req, res) {
    avisoController.listarPlantacoes(req, res);
});

router.get("/listarSetores/:idUsuario", function (req, res) {
    avisoController.listarSetores(req, res);
});

router.get("/listarFuncionarios/:idProprietario", function (req, res) {
    avisoController.listarFuncionarios(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    avisoController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    avisoController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    avisoController.publicar(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    avisoController.editar(req, res);
});

router.delete("/deletar/:idAviso", function (req, res) {
    avisoController.deletar(req, res);
});

module.exports = router;