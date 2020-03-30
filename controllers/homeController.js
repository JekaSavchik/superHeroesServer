exports.index = function(request, response){
    response.sendFile(__dirname + "/public/index.html");
}

exports.about = function(request, response){
    response.send("Aboute");
}
