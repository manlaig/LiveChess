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
app.use(express.static(path.join(__dirname, 'public/images')));
app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/public/index.html');
});

io.of('/').on('connection', function(socket) {
  console.log("New socket connected");

  socket.on('newMove', function(data) {
    if(chess.move(data))
      io.sockets.emit('updateBoard', data);
    console.log(chess.ascii());
  });

  socket.on('disconnect', function() {
    chess.reset();
    //draw chess pieces in initial position
    console.log("Socket disconnected");
  });
});
