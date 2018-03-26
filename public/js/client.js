var name = "";
var socket = io.connect();
$(function(){
  var $formPlay = $('#formPlay');
  var $nickname = $('#nickname');

  $formPlay.submit(function(e){
    e.preventDefault();
    if($nickname.val() != "")
    {
      name = $nickname.val();
      socket.emit('play', {nickname : name});
      console.log("Hello, " + name);
    }
  });
});
socket.on('redirect', function(url){
  window.location.href = url;
});
