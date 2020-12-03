var express = require('express');
var router = express.Router();

const Aluno = require('../controllers/aluno')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Turma PRI de 2020' });
}); 



// Ligar à database dos alunos
router.get('/alunos', function(req, res, next) {  
  Aluno.listar()
    .then(dados => res.render('alunos', {lista: dados}))
    .catch(e => res.render('error', {error: e}))
})


// Ligar à database do aluno em especifico
router.get('/aluno/:id', function(req, res, next) {  
  Aluno.consultar(req.params.id)
    .then(dados => res.render('aluno', {aluno: dados}))
    .catch(e => res.render('error', {error: e}))
})

//registo de um aluno
router.get('/alunos/registar', function(req, res, next) {
  res.render('registo')
})

//editar registo de um aluno
router.get('/alunos/editar/:id', function(req, res, next) {  
  console.log(req.params.id)
  Aluno.consultar(req.params.id)
    .then(dados => res.render('editar', {aluno: dados}))
    .catch(e => res.render('error', {error: e}))
})


//inserir registo na BD
router.post('/alunos', function(req,res,next) {
  let json = {}
  json["Número"] = req.body["Número"]
  json["Nome"] = req.body["Nome"]
  json["Git"] = req.body["Git"]
  let tpc = []
  let i = 1
  while (i < 9) {
    if (req.body[`tpc${i}`]=="on") tpc[i-1]=1
    else tpc[i-1]=0
    i++
  }
  json["tpc"] = tpc
  Aluno.inserir(json)
    .then(data => res.render('aviso', {dados: data, tipo: "post"}))
    .catch(err => res.render('error', {error: err}))
})

//inserir registo modificado na BD
router.put('/alunos/:id', function(req,res,next) {
  let json = {}
  json["Número"] = req.body["Número"]
  json["Nome"] = req.body["Nome"]
  json["Git"] = req.body["Git"]
  let tpc = []
  let i = 1
  while (i < 9) {
    if (req.body[`tpc${i}`]=="on") tpc[i-1]=1
    else tpc[i-1]=0
    i++
  }
  json["tpc"] = tpc
  Aluno.atualizar(json)
    .then(data => res.render('aviso', {dados: data, tipo: "put"}))
    .catch(e => res.render('error', {error: e}))
})

//apagar registo da BD
router.delete('/alunos/:id', function(req, res, next) {
  Aluno.apagar(req.params.id)
    .then(data => res.render('aviso', {tipo: "delete"}))
    .catch(err => res.render('error', {error: err}))
 })



module.exports = router;
