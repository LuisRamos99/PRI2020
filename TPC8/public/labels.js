//add label to choose new file
function addLabel(){
    var newLabel = $('<input class="w3-input w3-border w3-light-grey" style="margin:10px" type="file" name="myFile"> ')
    $("#label").append(newLabel)
}

//remove label to choose new file
function remLabel(){
    $('#label input').last().remove();
}