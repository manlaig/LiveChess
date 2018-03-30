//var name = "";
var socket = io.connect();

//these arrays are used to find locations of keypresses
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];

$(function()
{
  var userClick;
  var moveFrom = "";
  var moveTo = "";
  var selected = false;
  var itemSelect = document.getElementById('selectItem').getContext('2d');
  $('#pieces').on('click', function(event){
    selected = !selected;
    if(selected)
    {
      moveFrom = getBoardLocation(event.pageX, event.pageY);
      userClick = getCoordinates(moveFrom);
      drawChessPieces(itemSelect, 'select.png', userClick.x, userClick.y);
    } else
    {
      moveTo = getBoardLocation(event.pageX, event.pageY);
      if(moveFrom === 'e1' && moveTo === 'g1')
        socket.emit('switchKingTower', {from: 'e1', to: 'g1'});
      else if(moveFrom === 'e1' && (moveTo === 'c1' || moveTo === 'b1'))
        socket.emit('switchKingTower', {from: 'e1', to: 'c1'});
      else if(moveFrom === 'e8' && moveTo === 'g8')
        socket.emit('switchKingTower', {from: 'e8', to: 'g8'});
      else if(moveFrom === 'e8' && (moveTo === 'c8' || moveTo === 'b8'))
        socket.emit('switchKingTower', {from: 'e8', to: 'b8'});
      else if(moveFrom != moveTo)
        socket.emit('newMove', {from: moveFrom, to: moveTo});
      itemSelect.clearRect(userClick.x, userClick.y, 60, 60);
    }
  });
});

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

function drawRect(ctx, x, y)
{
  var drawX = 60, drawY = 60;
  ctx.fillRect(x, y, drawX, drawY);
  ctx.fillRect(x + 120, y, drawX, drawY);
  ctx.fillRect(x + 240, y, drawX, drawY);
  ctx.fillRect(x + 360, y, drawX, drawY);
}

function drawChessPieces(ctx, src, x, y)
{
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, x, y);
  };
  img.src = src;
}

function draw()
{
     var ctx = document.getElementById('board').getContext('2d');
     var ctx2 = document.getElementById('pieces').getContext('2d');
     var whiteX = 70;
     var whiteY = 70;
     var blackX = 130;
     var blackY = 70;

     //white board rectangles
     ctx.fillStyle = 'rgb(255, 255, 255)';
     drawRect(ctx, whiteX, whiteY);
     drawRect(ctx, blackX, blackY + 60);
     drawRect(ctx, whiteX, blackY + 120);
     drawRect(ctx, blackX, blackY + 180);
     drawRect(ctx, whiteX, blackY + 240);
     drawRect(ctx, blackX, blackY + 300);
     drawRect(ctx, whiteX, blackY + 360);
     drawRect(ctx, blackX, blackY + 420);
     //black board rectangles
     ctx.fillStyle = '#616161';
     drawRect(ctx, blackX, blackY);
     drawRect(ctx, whiteX, blackY + 60);
     drawRect(ctx, blackX, blackY + 120);
     drawRect(ctx, whiteX, blackY + 180);
     drawRect(ctx, blackX, blackY + 240);
     drawRect(ctx, whiteX, blackY + 300);
     drawRect(ctx, blackX, blackY + 360);
     drawRect(ctx, whiteX, blackY + 420);

     //black pieces
     drawChessPieces(ctx2, 'tower-black.png', whiteX, whiteY);
     drawChessPieces(ctx2, 'horse-black.png', blackX, blackY);
     drawChessPieces(ctx2, 'bishop-black.png', whiteX + 120, whiteX);
     drawChessPieces(ctx2, 'queen-black.png', whiteX + 180, whiteX);
     drawChessPieces(ctx2, 'king-black.png', whiteX + 240, whiteX);
     drawChessPieces(ctx2, 'bishop-black.png', whiteX + 300, whiteX);
     drawChessPieces(ctx2, 'horse-black.png', whiteX + 360, whiteX);
     drawChessPieces(ctx2, 'tower-black.png', whiteX + 420, whiteX);
     drawChessPieces(ctx2, 'pawn-black.png', whiteX, whiteY + 60);
     drawChessPieces(ctx2, 'pawn-black.png', blackX, whiteY + 60);
     drawChessPieces(ctx2, 'pawn-black.png', whiteX + 120, whiteY + 60);
     drawChessPieces(ctx2, 'pawn-black.png', whiteX + 180, whiteY + 60);
     drawChessPieces(ctx2, 'pawn-black.png', whiteX + 240, whiteY + 60);
     drawChessPieces(ctx2, 'pawn-black.png', whiteX + 300, whiteY + 60);
     drawChessPieces(ctx2, 'pawn-black.png', whiteX + 360, whiteY + 60);
     drawChessPieces(ctx2, 'pawn-black.png', whiteX + 420, whiteY + 60);
     //white pieces
     drawChessPieces(ctx2, 'tower-white.png', whiteX, whiteY + 420);
     drawChessPieces(ctx2, 'horse-white.png', blackX, whiteY + 420);
     drawChessPieces(ctx2, 'bishop-white.png', whiteX + 120, whiteY + 420);
     drawChessPieces(ctx2, 'queen-white.png', whiteX + 180, whiteY + 420);
     drawChessPieces(ctx2, 'king-white.png', whiteX + 240, whiteY + 420);
     drawChessPieces(ctx2, 'bishop-white.png', whiteX + 300, whiteY + 420);
     drawChessPieces(ctx2, 'horse-white.png', whiteX + 360, whiteY + 420);
     drawChessPieces(ctx2, 'tower-white.png', whiteX + 420, whiteY + 420);
     drawChessPieces(ctx2, 'pawn-white.png', whiteX, whiteY + 360);
     drawChessPieces(ctx2, 'pawn-white.png', blackX, whiteY + 360);
     drawChessPieces(ctx2, 'pawn-white.png', whiteX + 120, whiteY + 360);
     drawChessPieces(ctx2, 'pawn-white.png', whiteX + 180, whiteY + 360);
     drawChessPieces(ctx2, 'pawn-white.png', whiteX + 240, whiteY + 360);
     drawChessPieces(ctx2, 'pawn-white.png', whiteX + 300, whiteY + 360);
     drawChessPieces(ctx2, 'pawn-white.png', whiteX + 360, whiteY + 360);
     drawChessPieces(ctx2, 'pawn-white.png', whiteX + 420, whiteY + 360);
 }
