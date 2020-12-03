var Aluno = require('../models/aluno')


//Devolve a lista de alunos
module.exports.listar = () => {
    return Aluno
        .find()
        .exec()
}

//Consultar aluno
module.exports.consultar = id => {
    return Aluno
        .findOne({Número: id})
        .exec()
}

//Inserir aluno
module.exports.inserir = a => {
    var novo = new Aluno(a)
    return novo.save()
}

//Apagar aluno
module.exports.apagar = id => {
    return Aluno
        .deleteOne({Número: id})
        .exec()
}


module.exports.atualizar = a => {
    id = a["Número"]
    return Aluno
        .replaceOne({Número: id}, a)
        .exec()
}