var {parse} = require('querystring')

// Template para a página com a agenda ------------------
function geraPagHTML( tarefas, d , resposta){
  let pagHTML = `
    <html>
        <head>
            <title>Agenda</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
        `
    if (resposta!=null) {
        pagHTML += showResposta(resposta)
    }

    pagHTML += geraFormTarefa(d)
    
    pagHTML += getListTarefas(tarefas)

    pagHTML += getHistoricoTarefas(tarefas)

    pagHTML += `

        <div class="w3-container w3-teal">
            <address>Gerado por galuno::PRI2020 em ${d} --------------</address>
        </div>
    </body>
    </html>
  `
  return pagHTML
}


// Template para a lista de tarefas ------------------
function getListTarefas(tarefas) {
    let pag = ` 
    <div class="w3-container w3-teal">
         <h2>Lista de Tarefas</h2>
    </div>
    <table class="w3-table w3-bordered">
    <tr>
        <th>Data</th>
        <th>Responsável</th>
        <th>Descrição</th>
    </tr>
    `
    tarefas.forEach( a => {
        if (a.estado=="ativo") {
            pag += `
            <tr>
            <form action="/acao" method="POST">
            <td>${a.data}</td>
            <td>${a.responsavel}</td>
            <td>${a.descricao}</td>
            <td>
                <input type="radio" id="bt1" name="acao" value="terminar_${a.id}">
                <label for="bt1">Terminar</label><br>
            </td>
            <td>
                <input type="radio" id="bt2" name="acao" value="cancelar_${a.id}">
                <label for="bt2">Cancelar</label><br>
            </td>
            <td>
                <input type="submit" value="Submit">
            </td>
            </form>
            </tr>
            `
            }
    })
    pag += `</table>`
    return pag
}







// Template para a historico de tarefas ------------------
function getHistoricoTarefas(tarefas) {
    let pag = `
    <div class="w3-container w3-teal">
         <h2>Historico de Tarefas</h2>
    </div>
    <table class="w3-table w3-bordered">
    <tr>
        <th>Data</th>
        <th>Responsável</th>
        <th>Descrição</th>
        <th>Estado</th>
    </tr>
    `
    tarefas.forEach( a => {
        if (a.estado!="ativo") {
            pag += `
            <tr>
            <td>${a.data}</td>
            <td>${a.responsavel}</td>
            <td>${a.descricao}</td>
            <td>${a.estado}</td>
            </tr>
            `
            }
    })
    pag += `</table>`
    return pag
}


// Template para o registo de tarefa ------------------
function geraFormTarefa( d ){
    return `
            <div class="w3-container w3-teal">
                <h2>Registo de Tarefa</h2>
            </div>

            <form class="w3-container" action="/registo" method="POST">
                <label class="w3-text-teal"><b>Descrição</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">
          
                <label class="w3-text-teal"><b>Responsável</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">

                <label class="w3-text-teal"><b>Data</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="data">
                </br>
                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>
    `
}



function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            callback(parse(body))
        })
    }
}



function showResposta(resposta){
    return `
        <div class="alert alert-success">
            <strong>${resposta}</strong>
        </div>
    `
}



function getHome(res,d,axios,resposta) {
    axios.get("http://localhost:3000/agenda?_sort=data,responsavel,estado&_order=asc,asc,asc")
        .then(response => {
            var agenda = response.data
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write(geraPagHTML(agenda,d,resposta))
            res.end()
        })
        .catch(function(erro){
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>Não foi possível obter a agenda...")
            res.end()
        })
}

function errorPost(erro) {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write('<p>Erro no POST: ' + erro + '</p>')
    res.write('<p><a href="/">Voltar</a></p>')
    res.end()
}


module.exports = {
    geraPagHTML,
    getListTarefas,
    getHistoricoTarefas,
    geraFormTarefa,
    recuperaInfo,
    showResposta,
    getHome,
    errorPost
}