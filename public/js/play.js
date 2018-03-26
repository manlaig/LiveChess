var socket = io('/play');
socket.on('newPlayer', function(data){
  console.log(data);
});
