const app = new PIXI.Application({ 
    antialias: true, 
    width: window.innerWidth, 
    height: window.innerHeight,
    backgroundColor: "#008080",
    resolution: 1,
});

document.body.appendChild(app.view);

app.stage.interactive = true;
app.stage.hitArea = app.screen;

let topBorder = new Border(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 1300, 20, 2, "#FF0000", 'v', "#FF0000");
let bottomBorder = new Border(window.innerWidth/2 - 640, window.innerHeight/2 + 360, 1300, 20, 2, "#00FF00", 'v', "#00FF00");
let leftBorder = new Border(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 20, 740, 2, "#0000FF", 'h', "#0000FF");
let rightBorder = new Border(window.innerWidth/2 + 640, window.innerHeight/2 - 360, 20, 740, 2, "#FF00FF", 'h', "#FF00FF");

function refresh(){
    topBorder.positionX = window.innerWidth/2 - 640;
    topBorder.positionY = window.innerHeight/2 - 360;

    bottomBorder.positionX = window.innerWidth/2 - 640;
    bottomBorder.positionY = window.innerHeight/2 + 360;

    leftBorder.positionX = window.innerWidth/2 - 640;
    leftBorder.positionY = window.innerHeight/2 - 360;

    rightBorder.positionX = window.innerWidth/2 + 640;
    rightBorder.positionY = window.innerHeight/2 - 360;
}

blocks = []


let test = new Level("menu", 0);
test.addBlock(leftBorder.positionX + 150, leftBorder.positionY, leftBorder.width, 3 * bottomBorder.width/4, 2, "#FFF", "#FFF", "tl");
test.addBlock(window.innerWidth/2 - 50, window.innerHeight/2 + 50, leftBorder.positionX/2, topBorder.positionY/2, 2, "#FFF", "#FFF", "tr")
test.addBlock(window.innerWidth/2 - 50, window.innerHeight/2 + 50, leftBorder.positionX/2, topBorder.positionY/2, 2, "#FFF", "#FFF", "bl")
test.addBlock(window.innerWidth/2 - 50, window.innerHeight/2 + 50, leftBorder.positionX/2, topBorder.positionY/2, 2, "#FFF", "#FFF", "br")

blocks.push(topBorder);
blocks.push(bottomBorder);
blocks.push(leftBorder);
blocks.push(rightBorder);


app.ticker.add(gameLoop);

window.onresize = function()
{
    refresh()
    app.renderer.resize(window.innerWidth, window.innerHeight);
}

function gameLoop(delta) {
    blocks.forEach(block => {
      block.drawBlock();
    });

    if (topBorder.rechanging) {
        topBorder.positionX = leftBorder.positionX;
        topBorder.width = rightBorder.positionX - leftBorder.positionX + rightBorder.width/2 + leftBorder.width/2;
    }
    if (bottomBorder.rechanging) {
        bottomBorder.positionX = leftBorder.positionX;
        bottomBorder.width = rightBorder.positionX - leftBorder.positionX + rightBorder.width/2 + leftBorder.width/2;
    }
    if (leftBorder.rechanging) {
        leftBorder.positionY = topBorder.positionY;
        leftBorder.height = bottomBorder.positionY - topBorder.positionY + bottomBorder.height/2 + topBorder.height/2;
    }
    if (rightBorder.rechanging) {
        rightBorder.positionY = topBorder.positionY;
        rightBorder.height = bottomBorder.positionY - topBorder.positionY + bottomBorder.height/2 + topBorder.height/2;
    }
    test.blocks[0].height = 3 * bottomBorder.width/4;
}