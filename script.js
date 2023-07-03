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

let backgroundScreen = new Block(screenWidth, screenHeight, 1280, 720, 2, "#ffffff", 'v', "#ffffff");

let bottomBorder = new Border(0, 710, 1300, 10, 2, "#c8c8c8", 'v', "#c8c8c8");
let leftBorder = new Border(0, 0, 10, 720, 2, "#c8c8c8", 'h', "#c8c8c8");
let rightBorder = new Border(1270, 0, 10, 740, 2, "#c8c8c8", 'h', "#c8c8c8");
let topBorder = new Border(0, 0, 1280, 20, 2, "#c8c8c8", 'v', "#010081");
let blocks = [topBorder, bottomBorder, leftBorder, rightBorder]
let test = new Level("test", 0);
levelBlocks = []
test.generate()




app.ticker.add(gameLoop);

window.onresize = function()
{
    test.refresh();
}

function gameLoop(delta) {
    //Readjust border positions after leaving the screen
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
    //Readjust border positions after colliding with their opposite border
    if (topBorder.positionY > bottomBorder.positionY - topBorder.height && !topBorder.rechanging) {
        const offsetY = bottomBorder.positionY - topBorder.positionY - topBorder.height;
        topBorder.positionY += offsetY;
        topBorder.blocks.forEach(block => {
            block.positionY += offsetY;
          });
    }
    if (leftBorder.positionX > rightBorder.positionX - leftBorder.width && !leftBorder.rechanging) {
        const offsetX = rightBorder.positionX - leftBorder.positionX - leftBorder.width;
        leftBorder.positionX += offsetX;
        leftBorder.blocks.forEach(block => {
            block.positionX += offsetX;
          });
    }
    if (bottomBorder.positionY < topBorder.positionY + topBorder.height && !bottomBorder.rechanging) {
        const offsetY = topBorder.positionY + topBorder.height - bottomBorder.positionY; 
        bottomBorder.positionY += offsetY;
        bottomBorder.blocks.forEach(block => {
            block.positionY += offsetY;
          });
    }
    if (rightBorder.positionX < leftBorder.positionX + leftBorder.width && !rightBorder.rechanging) {
        const offsetX = leftBorder.positionX + leftBorder.width - rightBorder.positionX;
        rightBorder.positionX += offsetX;
        rightBorder.blocks.forEach(block => {
            block.positionX += offsetX;
          })
    }
    //Readjust size of screen after changing positions of borders
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
    /*if (levelBlocks[1])
        levelBlocks[1].height = Math.min(screenHeight/2, topBorder.positionY - 10);*/
    blocks.forEach(block => {
        block.drawBlock();
    });
    backgroundScreen.drawBlock();
}