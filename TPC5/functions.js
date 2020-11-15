function home(res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    res.write('<h2>Escola de musica</h2>')
    res.write('<ul>')
    res.write('<li style="margin-top:20px"> <a href=\"http://localhost:3001/alunos?_page=1\">Lista de alunos</a> </li>')
    res.write('<li style="margin-top:20px"> <a href=\"http://localhost:3001/cursos?_page=1\">Lista de cursos</a> </li>')
    res.write('<li style="margin-top:20px"> <a href=\"http://localhost:3001/instrumentos?_page=1\">Lista de instrumentos</a> </li>')
    res.write('</ul>')
    res.end()
}


function alunos(res,axios,page) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    axios.get('http://localhost:3000/alunos?_page=' + page + '&_limit=30')
    .then(resp => {
        alunos= resp.data;
        res.write('<ul>');
        alunos.forEach(a => {
            res.write(`<li> <a href=\"http://localhost:3001/alunos/${a.id}\">${a.id}</a></li>`)
        });
        res.write('</ul>');
        botoesMenuPaginas(res,resp)
        res.end()
    })
    .catch(error => {
        console.log('ERRO: ' + error);
        res.write('<p>Não obtive alunos...</p>')
    });
}


function aluno(res,axios,value) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            axios.get(`http://localhost:3000/alunos/A${value}`)
            .then(resp => {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
                al = resp.data;
                res.write(`<h2>${al.nome}</h2>`)
                res.write(`<p><b>Id:</b> ${al.id}</p>`)
                res.write(`<p><b>Data nascimento:</b> ${al.dataNasc}</p>`)
                res.write(`<p><b>Curso:</b> ${al.curso}</p>`)
                res.write(`<p><b>Ano:</b> ${al.anoCurso}</p>`)
                res.write(`<p><b>Instrumento:</b> ${al.instrumento}</p>`)
                res.write('<address style="position:absolute;bottom: 40px;right: 40px;font-size: 20px;">[<a href=\"http://localhost:3001/alunos?_page=1\">Voltar atrás</a>]</address>')
                res.end()
            })
            .catch(error => {
                console.log('ERRO: ' + error);
                res.write(`<p>Não obtive aluno A${value}...</p>`)
            });
}


function instrumentos(res,axios,page) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    axios.get('http://localhost:3000/instrumentos?_page=' + page + '&_limit=30')
    .then(resp => {
        instrumentos= resp.data;
        res.write('<ul>');
        instrumentos.forEach(a => {
            res.write(`<li> <a href=\"http://localhost:3001/instrumentos/${a.id}\">${a.id} - ${a['#text']}</a></li>`)
        });
        res.write('</ul>');
        botoesMenuPaginas(res,resp)
        res.end()
    })
    .catch(error => {
        console.log('ERRO: ' + error);
        res.write('<p>Não obtive instrumentos...</p>')
    });
}

function instrumento(res,axios,instrumento,curso) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            axios.get(`http://localhost:3000/instrumentos/I${instrumento}`)
            .then(resp => {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                instrument = resp.data;
                res.write(`<h2>${instrument['#text']}</h2>`)
                res.write(`<p><b>Id:</b> ${instrument.id}</p>`)
                curso ?  res.write(`<address style="position:absolute;bottom: 40px;right: 40px;font-size: 20px;">[<a href=\"http://localhost:3001/cursos/C${curso}\">Voltar atrás</a>]</address>`) :
                         res.write('<address style="position:absolute;bottom: 40px;right: 40px;font-size: 20px;">[<a href=\"http://localhost:3001/instrumentos?_page=1\">Voltar atrás</a>]</address>')
                res.end()
            })
            .catch(error => {
                console.log('ERRO: ' + error);
                res.write(`<p>Não obtive instrumento ${instrumento}...</p>`)
            });
}


function cursos(res,axios,page) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    axios.get('http://localhost:3000/cursos?_page=' + page + '&_limit=30&_sort=designacao')
    .then(resp => {
        cursos= resp.data;
        res.write('<ul>');
        cursos.forEach(a => {
            res.write(`<li> <a href=\"http://localhost:3001/cursos/${a.id}\">${a.designacao} - ${a.id}</a></li>`)
        });
        res.write('</ul>');
        botoesMenuPaginas(res,resp)
        res.end()
    })
    .catch(error => {
        console.log('ERRO: ' + error);
        res.write('<p>Não obtive cursos...</p>')
    });
}

function curso(res,axios,value) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    axios.get(`http://localhost:3000/cursos/C${value}`)
    .then(resp => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        curso = resp.data;
        res.write(`<h2>${curso.designacao}</h2>`)
        res.write(`<p><b>Id:</b> ${curso.id}</p>`)
        res.write(`<p><b>Duracao:</b> ${curso.duracao}</p>`)
        res.write(`<address><a href=\"http://localhost:3001/instrumentos/C${value}/${curso.instrumento['id']}\">Instrumento</a></address>`)
        res.write('<address style="position:absolute;bottom: 40px;right: 40px;font-size: 20px;">[<a href=\"http://localhost:3001/cursos?_page=1\">Voltar atrás</a>]</address>')
        res.end()
    })
    .catch(error => {
        console.log('ERRO: ' + error);
        res.write(`<p>Não obtive curso C${value}...</p>`)
    });
}


function pedidoErrado(res) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write('<p>Pedido nao suportado: ' + res.method + '</p>')
    res.end()
}

function getLink(dataLinks, value) {
    if (dataLinks=="") return null
    else {
        var links = dataLinks.split("link:")
        links = dataLinks.split(", ")
        var linkFinal = null
        links.forEach(link => {
            var sep = link.split(";")
            var rel = sep[1].split("rel=")[1]
            var relFinal = rel.substring(1, rel.length-1);
            if (relFinal == value) {
                linkFinal = sep[0].substring(1, sep[0].length-1);
                linkFinal=linkFinal.replace("3000","3001")
                linkFinal=linkFinal.split("&_limit")[0]
            }
        })
        return linkFinal
    }
}

function botoesMenuPaginas(res,resp) {
    res.write('<address style="position:absolute;bottom: 40px;right: 40px;font-size: 20px;">[<a href=\"http://localhost:3001/\">Voltar atrás</a>]</address>')
    res.write('<address style="text-align:center">')
    var linkNext = getLink(resp.headers['link'],"next")
    var linkPrev = getLink(resp.headers['link'],"prev")
    var linkFirst = getLink(resp.headers['link'],"first")
    var linkLast = getLink(resp.headers['link'],"last")
    linkFirst ? res.write(`[<a href="${linkFirst}">Primeiro</a>]`): res.write('')
    linkPrev ? res.write(`[<a href="${linkPrev}">Anterior</a>]`): res.write('')
    linkNext ? res.write(`[<a href="${linkNext}">Próximo</a>]`): res.write('')
    linkLast ? res.write(`[<a href="${linkLast}">Ultimo</a>]`): res.write('')
    res.write('</adress>')
}


module.exports = {
    home,
    alunos,
    aluno,
    instrumentos,
    instrumento,
    cursos,
    curso,
    pedidoErrado
}