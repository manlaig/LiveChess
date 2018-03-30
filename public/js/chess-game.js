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
