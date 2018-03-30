//var name = "";
var socket = io.connect();

socket.on('switchKing', function(data) {
  var ctx = document.getElementById('pieces').getContext('2d');
  var fromCoord = getCoordinates(data.from);
  var toCoord = getCoordinates(data.to);
  var imagedataTower;
  var imagedataKing = ctx.getImageData(fromCoord.x, fromCoord.y, 60, 60);
  if(toCoord.x > 310)
  {
    imagedataTower = ctx.getImageData(490, fromCoord.y, 60, 60);
    ctx.putImageData(imagedataTower, toCoord.x - 60, toCoord.y);
    ctx.clearRect(toCoord.x + 60, toCoord.y, 60, 60);
    ctx.putImageData(imagedataKing, toCoord.x, toCoord.y);
  } else
  {
    imagedataTower = ctx.getImageData(70, fromCoord.y, 60, 60);
    ctx.putImageData(imagedataTower, toCoord.x + 60, toCoord.y);
    ctx.clearRect(70, toCoord.y, 60, 60);
    ctx.putImageData(imagedataKing, toCoord.x, toCoord.y);
  }
  ctx.clearRect(fromCoord.x, fromCoord.y, 60, 60);
});

socket.on('updateBoard', function(data) {
    var ctx = document.getElementById('pieces').getContext('2d');
    var fromCoord = getCoordinates(data.from);
    var toCoord = getCoordinates(data.to);
    var imagedata = ctx.getImageData(fromCoord.x, fromCoord.y, 60, 60);
    ctx.putImageData(imagedata, toCoord.x, toCoord.y);
    ctx.clearRect(fromCoord.x, fromCoord.y, 60, 60);
});

function getBoardLocation(x, y)
{
  if(x < 70 || x > 550 || y < 70 || y > 550) return '';
  var xAxis = letters[Math.abs(Math.floor((x - 71) / 60))];
  var yAxis = numbers[Math.abs(Math.floor((y - 71) / 60))];
  return xAxis + yAxis;
}

function getCoordinates(location)
{
  var xAxis = letters.indexOf(location[0]);
  var yAxis = numbers.indexOf(location[1]);
  return {x: (xAxis * 60 + 70), y: (yAxis * 60 + 70)};
}
