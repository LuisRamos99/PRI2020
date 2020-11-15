var http = require('http')
var func = require('./functions.js')

const axios  = require('axios')

var servidor = http.createServer(function (req,res) {
    if(req.method == 'GET') { 
        if (req.url == '/') { 
            func.home(res) 
        }
        else if(req.url.match(/^\/alunos\?_page=[1-9][0-9]*$/)) {
            var page = req.url.split("_page=")[1];
            func.alunos(res,axios,page)
        }
        else if(req.url.match(/^\/alunos\/A[^/ \?\n]*$/)) {
            var value = req.url.split("A")[1];
            func.aluno(res,axios,value)
        }
        else if(req.url.match(/^\/instrumentos\?_page=[1-9][0-9]*$/)) {
            var page = req.url.split("_page=")[1];
            func.instrumentos(res,axios,page)
        }
        else if(req.url.match(/^\/instrumentos\/I[^/ \?\n]*$/)) {
            var instrumento=req.url.split("I")[1];
            func.instrumento(res,axios,instrumento,null)
        }
        else if(req.url.match(/^\/instrumentos\/C[^/ \?\n]*\/I[^/ \?\n]*$/)) {
            var curso = req.url.split("C")[1];
            curso = curso.split("/I")[0]
            var instrumento = req.url.split("I")[1];
            func.instrumento(res,axios,instrumento,curso)
        }
        else if(req.url.match(/^\/cursos\?_page=[1-9][0-9]*$/)) {
            var page = req.url.split("_page=")[1];
            func.cursos(res,axios,page)
        }
        else if(req.url.match(/^\/cursos\/C[^/ \?\n]*$/)) {
            var value = req.url.split("C")[1]
            func.curso(res,axios,value)
        }
        else { func.pedidoErrado(res) }
    }
    else { func.pedidoErrado(res) }
})


servidor.listen(3001)
console.log('Servidor à escuta na porta 3001....')