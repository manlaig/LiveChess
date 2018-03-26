var app = require('express')();
var server = require('http').Server(app).listen(3000, ()=>{
  console.log("Listening on port 3000");
});
var io = require('socket.io')(server);

app.get('/', (req, res)=>{
  res.send("Hello, Welcome");
});
