const screenWidth = 1280;
const screenHeight = 720;


const app = new PIXI.Application({ 
    antialias: true,
    width: screenWidth, 
    height: screenHeight,
    backgroundColor: "#008080",
    resolution: 1,
});

let APPHTML = document.body.appendChild(app.view);
APPHTML.style.marginLeft = (window.innerWidth/2 - screenWidth/2) + "px";

app.stage.interactive = true;
app.stage.hitArea = app.screen;

let backgroundScreen = new Block(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 1000, 750, 2, "#ffffff", 'v', "#ffffff");

let test = new Level("test", 0);
levelBlocks = []
test.generate()

blocks = test.blocks
topBorder = test.blocks[0]
bottomBorder = test.blocks[1]
leftBorder = test.blocks[2]
rightBorder = test.blocks[3]


app.ticker.add(gameLoop);

window.onresize = function()
{
    test.refresh();
}

function gameLoop(delta) {
    if (topBorder.positionY < 0) {
        const offsetY = -topBorder.positionY
        topBorder.positionY += offsetY;
        topBorder.blocks.forEach(block => {
            block.positionY += offsetY;
          });
    }
    if (bottomBorder.positionY > screenHeight - bottomBorder.height) {
        const offsetY = screenHeight - bottomBorder.positionY - bottomBorder.height; 
        bottomBorder.positionY += offsetY;
        bottomBorder.blocks.forEach(block => {
            block.positionY += offsetY;
          });
    }
    if (leftBorder.positionX < 0) {
        const offsetX = -leftBorder.positionX;
        leftBorder.positionX += offsetX;
        leftBorder.blocks.forEach(block => {
            block.positionX += offsetX;
          });
    }
    if (rightBorder.positionX > screenWidth - rightBorder.width) {
        const offsetX = screenWidth - rightBorder.positionX - rightBorder.width;
        rightBorder.positionX += offsetX;
        rightBorder.blocks.forEach(block => {
            block.positionX += offsetX;
          });
    }
    if (topBorder.rechanging) {
        topBorder.positionX = leftBorder.positionX;
        topBorder.width = rightBorder.positionX - leftBorder.positionX + rightBorder.width;
    }
    if (bottomBorder.rechanging) {
        bottomBorder.positionX = leftBorder.positionX;
        bottomBorder.width = rightBorder.positionX - leftBorder.positionX + rightBorder.width;
    }
    if (leftBorder.rechanging) {
        leftBorder.positionY = topBorder.positionY;
        leftBorder.height = bottomBorder.positionY - topBorder.positionY + bottomBorder.height;
    }
    if (rightBorder.rechanging) {
        rightBorder.positionY = topBorder.positionY;
        rightBorder.height = bottomBorder.positionY - topBorder.positionY + bottomBorder.height;
    }
    backgroundScreen.positionX = leftBorder.positionX;
    backgroundScreen.width = rightBorder.positionX - leftBorder.positionX + rightBorder.width;
    backgroundScreen.positionY = topBorder.positionY;
    backgroundScreen.height = bottomBorder.positionY - topBorder.positionY + bottomBorder.height;
    if (levelBlocks[0]) {
        levelBlocks[0].height = Math.min(leftBorder.height, 3 * bottomBorder.width/4) - 20;
    }
    blocks.forEach(block => {
        block.drawBlock();
    });
    backgroundScreen.drawBlock();
}