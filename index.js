var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app).listen(3000, ()=>{
  console.log("Listening on port 3000");
});
var io = require('socket.io')(server);
var Chess = require('chess.js').Chess;
var chess = new Chess();
var nickname = "";
var users = [];

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/public/index.html');
});

io.of('/').on('connection', function(socket) {
  console.log("New socket connected");

  socket.on('newMove', function(data) {
    chess.move(data);
    console.log(chess.ascii());
    //TODO: only emit if move was successful
    io.sockets.emit('updateBoard', data);
  });
  socket.on('disconnect', function() {
    console.log("Socket disconnected");
  });
});
