var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app).listen(process.env.PORT || 3000, ()=>{
  console.log("Listening for connections");
});
var io = require('socket.io')(server, { wsEngine: 'ws' });
var Chess = require('chess.js').Chess;
var chess = new Chess();
var users = [];
//var messages = [];
var name = "";

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images')));

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/public/index.html');
});

io.of('/').on('connection', function(socket) {
  console.log("New socket connected");
  socket.emit('displayUsers', {total : users.length, all_users : users});

  socket.on('newMove', function(data) {
    //if valid move, then update the board
    if(chess.move(data))
      io.sockets.emit('updateBoard', data);
    console.log(chess.ascii());
  });

  socket.on('switchKingTower', function(data) {
    chess.move(data);
    io.sockets.emit('switchKing', data);
  });

  socket.on('newUser', function(data) {
    // TODO: load all previous messages
    users.push(data);
    name = data;
    io.sockets.emit('appendUser', data);
   });

  socket.on('newMessage', function(data) {
    //messages.push(data.message);
    io.sockets.emit('appendMessage', data);
   });

   socket.on('disconnect', function() {
     var index = users.indexOf(name);
     users.splice(index, 1);
     io.sockets.emit('updateUsers', users);
     chess.reset();
     console.log('disconnected');
  });
});
