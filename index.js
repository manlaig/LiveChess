var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app).listen(3000, ()=>{
  console.log("Listening on port 3000");
});
var io = require('socket.io')(server);
var nickname = "";
var users = [];

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/play', (req, res)=>{
  res.sendFile(__dirname + '/public/play.html');
});

io.of('/').on('connection', function(socket) {
  console.log("New socket connected");

  socket.on('play', function(data){
    nickname = data.nickname;
    socket.emit('redirect', '/play');
    //socket.disconnect(false);
    //console.log("disconnected");
  });

  socket.on('disconnect', function() {
    console.log("Socket disconnected");
  });
});

io.of('/play').on('connection', function(socket){
  console.log(nickname + " is connected in /play");
  users.push(nickname);
  socket.emit('newplayer', nickname);
  io.of('/play').emit('appendPlayers', nickname);

  socket.on('disconnect', function(){
    console.log("disconnected from /play")
  });
});
