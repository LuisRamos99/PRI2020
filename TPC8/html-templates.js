
exports.fileList = fileList
exports.fileForm = fileForm

// File List HTML Page Template  -----------------------------------------
function fileList( files, d){
    let pagHTML = `
      <html>
          <head>
              <title>Lista dos Ficheiros</title>
              <meta charset="utf-8"/>
              <link rel="icon" href="/favicon.png"/>
              <link rel="stylesheet" href="/w3.css"/>
              <script src="/jquery-3.5.1.min.js"></script>
              <script src="/imagens.js"></script>
              <script src="/labels.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
          </head>
          <body>
              <div class="w3-card-4 modal" id="display"></div>

              <div class="w3-container w3-teal" >
                  <h2>Lista de Ficheiros</h2>  
              </div>

              <table class="w3-table w3-bordered">
                  <tr>
                      <th>Data</th>
                      <th>Ficheiro</th>
                      <th>Tamanho</th>
                      <th>Tipo</th>
                  </tr>
    `
    files.forEach( f => {
      pagHTML += `
          <tr onclick='showImage(\"${f.name}", \"${f.mimetype}\");'>
              <td>${f.date}</td>
              <td>${f.name}</td>
              <td>${f.size}</td>
              <td>${f.mimetype}</td>
          </tr>
      `
    })
    
    pagHTML += `
        </table>
        <a href="/files/upload">  
            <button class="w3-btn w3-teal"  style="margin:20px">
                <b style="color:white">Adicionar novo</b>
            </button>
        </a>
    `

    pagHTML += `
          <br>
          <div class="w3-container w3-teal" >
              <address>Generated by upload-single::PRI2020 em ${d} --------------</address>
          </div>
      </body>
      </html>
    `

    return pagHTML
  }

// File Form HTML Page Template ------------------------------------------
function fileForm( d ){
    return `
    <html>
        <head>
            <title>File Upload</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="/favicon.png"/>
            <link rel="stylesheet" href="/w3.css"/>
            <script src="/jquery-3.5.1.min.js"></script>
            <script src="/imagens.js"></script>
            <script src="/labels.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
        </head>
        <body>
        
        </body>

            <div class="w3-container w3-teal">
                <h2>Upload de Ficheiros</h2>
            </div>

            <form class="w3-container" action="/files" method="POST" enctype="multipart/form-data">
                <br>
                <label class="w3-text-teal" style="margin:10px"> <b> Escolher os ficheiros </b> </label>
                <div id="label"/>
                    <input class="w3-input w3-border w3-light-grey" style="margin:10px" type="file" name="myFile"/> 
                </div>
                <input class="w3-btn w3-blue-grey" type="submit" style="margin:10px" value="Submeter"/>
                <a href="/" class="w3-btn w3-blue-grey" type="button"> Cancelar </a>
                <input class="w3-btn w3-blue-grey" type="button" style="margin:10px" value="Adicionar" onclick="addLabel();"/> 
                <input class="w3-btn w3-blue-grey" type="button" value="Remover" onclick="remLabel();"/> 
            </form>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::PRI2020 em ${d}</address>
            </footer>
        </body>
    </html>
    `
}

