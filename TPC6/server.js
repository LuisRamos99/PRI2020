var http = require('http')
var fs = require('fs')
var axios = require('axios')
var func = require('./functions.js')


// Criação do servidor

var galunoServer = http.createServer(function (req, res) {

    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

 
    switch(req.method){
        case "GET": 
            // GET /alunos --------------------------------------------------------------------
            if((req.url == "/") || (req.url == "/agenda")){
                func.getHome(res,d,axios,null)
            }
            // GET /w3.css ------------------------------------------------------------------------
            else if(req.url == "/w3.css"){
                fs.readFile("w3.css", function(erro, dados){
                    if(!erro){
                        res.writeHead(200, {'Content-Type': 'text/css;charset=utf-8'})
                        res.write(dados)
                        res.end()
                    }
                })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break
        case "POST":
            if (req.url == '/acao') {
                func.recuperaInfo(req, resultado => {
                if (JSON.stringify(resultado)=="{}") {console.log("pedido ignorado")}
                else {
                    var acao = JSON.stringify(resultado).split(":")[1];
                    var id = acao.split("_")[1];
                    id = id.substring(0,id.length-2)
                    acao = acao.split("_")[0];
                    acao = acao.substring(1,acao.length)
                    var body = {}
                    if (acao=="terminar") {body["estado"]="terminado",acao="terminada"}
                    else if (acao=="cancelar") {body["estado"]="cancelado",acao="cancelada"}
                    axios.patch(`http://localhost:3000/agenda/${id}`, body)
                        .then(resp => {
                            var resposta = `Tarefa de ${resp.data.responsavel} foi ${acao} com sucesso!`
                            func.getHome(res,d,axios,resposta)
                        })
                        .catch(erro => {
                            func.errorPost(erro)                            
                        })
                    }
                })    
            }
            else if (req.url == '/registo') {
                func.recuperaInfo(req, resultado => {
                resultado["estado"]="ativo"
                axios.post('http://localhost:3000/agenda', resultado)
                    .then(resp => {
                        var resposta = `Tarefa criada por ${resp.data.responsavel} foi adicionada com sucesso!`
                        func.getHome(res,d,axios,resposta)
                    })
                    .catch(erro => {
                        func.errorPost(erro)                        
                    })
                })
            }
            else {
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<p>Recebi um POST não suportado.</p>')
                res.write('<p><a href="/">Voltar</a></p>')
                res.end()
            }
            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
})

galunoServer.listen(7777)
console.log('Servidor à escuta na porta 7777...')