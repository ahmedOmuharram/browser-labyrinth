const app = new PIXI.Application({ 
    antialias: true, 
    width: window.innerWidth, 
    height: window.innerHeight,
    backgroundColor: "#008080",
    resolution: 1
});

document.body.appendChild(app.view);

app.stage.interactive = true;
app.stage.hitArea = app.screen;

let topBorder = new Border(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 1300, 20, 2, "#FF0000", 'v', "#FF0000");
let bottomBorder = new Border(window.innerWidth/2 - 640, window.innerHeight/2 + 360, 1300, 20, 2, "#00FF00", 'v', "#00FF00");
let leftBorder = new Border(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 20, 740, 2, "#0000FF", 'h', "#0000FF");
let rightBorder = new Border(window.innerWidth/2 + 640, window.innerHeight/2 - 360, 20, 740, 2, "#FF00FF", 'h', "#FF00FF");

let tlBlock = new Block(window.innerWidth/2 - 50, window.innerHeight/2 + 50, 100, 100, 2, "#FFF", 'v', null);
let trBlock = new Block(window.innerWidth/2 - 50, window.innerHeight/2 + 50, 100, 100, 2, "#FFF", 'v', null);
let blBlock = new Block(window.innerWidth/2 - 50, window.innerHeight/2 + 50, 100, 100, 2, "#FFF", 'v', null);
let brBlock = new Block(window.innerWidth/2 - 50, window.innerHeight/2 + 50, 100, 100, 2, "#FFF", 'v', null);




blocks = []
blocks.push(topBorder);
blocks.push(bottomBorder);
blocks.push(leftBorder);
blocks.push(rightBorder);
blocks.push(tlBlock);
blocks.push(trBlock);
blocks.push(blBlock);
blocks.push(brBlock);
topBorder.blocks.push(tlBlock);
topBorder.blocks.push(trBlock);
bottomBorder.blocks.push(blBlock);
bottomBorder.blocks.push(brBlock);
leftBorder.blocks.push(tlBlock);
leftBorder.blocks.push(blBlock);
rightBorder.blocks.push(trBlock);
rightBorder.blocks.push(brBlock);

  
app.ticker.add(gameLoop);
  
function gameLoop(delta) {
    blocks.forEach(block => {
      block.drawBlock();
    });
    if(topBorder.rechanging){
    topBorder.positionX = leftBorder.positionX;
    topBorder.width = rightBorder.positionX - leftBorder.positionX + rightBorder.width/2 + leftBorder.width/2;
    }
    if(bottomBorder.rechanging){
    bottomBorder.positionX = leftBorder.positionX;
    bottomBorder.width = rightBorder.positionX - leftBorder.positionX + rightBorder.width/2 + leftBorder.width/2;
    }
    if(leftBorder.rechanging){
    leftBorder.positionY = topBorder.positionY;
    leftBorder.height = bottomBorder.positionY - topBorder.positionY + bottomBorder.height/2 + topBorder.height/2;
    }
    if(rightBorder.rechanging){
    rightBorder.positionY = topBorder.positionY;
    rightBorder.height = bottomBorder.positionY - topBorder.positionY + bottomBorder.height/2 + topBorder.height/2;
    }

}