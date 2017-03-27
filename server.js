var express = require('express');
var app = express();

app.use('/css',express.static(__dirname + '/css'));
app.use('/script',express.static(__dirname + '/script'));

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/html/todoList.html');
});

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000");
});
