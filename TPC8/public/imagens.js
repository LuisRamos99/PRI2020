//Image display on client browser
function showImage(name, type){
    if(type=='image/png' || type=='image/jpeg')    
        var file = $('<img src="/fileStore/' + name + '" width="80%" />')
    else 
        var file = $('<p>' + name + ', ' + type + '</p>')
    var download = $('<div><a href="/download/' + name + '">Download</a></div>')

    $("#display").empty()
    $("#display").append(file, download)
    $("#display").modal()
}

//add label to choose new file
function addLabel(){
    var newLabel = $('<input class="w3-input w3-border w3-light-grey" style="margin:10px" type="file" name="myFile"> ')
    $("#label").append(newLabel)
}

//remove label to choose new file
function remLabel(){
    $('#label input').last().remove();
}