const screenWidth = 1280;
const screenHeight = 720;
let elapsed = 0;

let currentLevel = 0;

const app = new PIXI.Application({ 
    antialias: true,
    width: screenWidth, 
    height: screenHeight,
    backgroundColor: "#008080",
    resolution: 1,
});

app.stage.interactive = true;
app.stage.hitArea = app.screen;

let backgroundScreen = new Block(screenWidth, screenHeight, 1280, 720, 2, "#ffffff", 'v', "#ffffff");

let bottomBorder = new Border(0, 710, 1300, 10, 2, "#c8c8c8", 'v', "#c8c8c8");
let leftBorder = new Border(0, 0, 10, 720, 2, "#c8c8c8", 'h', "#c8c8c8");
let rightBorder = new Border(1270, 0, 10, 740, 2, "#c8c8c8", 'h', "#c8c8c8");
let topBorder = new Border(0, 0, 1280, 20, 2, "#c8c8c8", 'v', "#010081");
let blocks = []
let playLevel = new Level(currentLevel.toString(), 0);
levelBlocks = []
playLevel.generate()
blocks.push(topBorder, bottomBorder, leftBorder, rightBorder)

app.ticker.add(gameLoop);

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
    // Readjust size of screen after changing positions of borders
    if (topBorder.rechanging) {
        document.getElementById("main").style.borderTop = "5px dashed #008080";
        topBorder.positionX = leftBorder.positionX;
        topBorder.width = rightBorder.positionX - leftBorder.positionX + rightBorder.width;
    } else {
        document.getElementById("main").style.borderTopColor = "#ff0081";
    }
    if (bottomBorder.rechanging) {
        document.getElementById("main").style.borderBottom = "5px dashed #008080";
        bottomBorder.positionX = leftBorder.positionX;
        bottomBorder.width = rightBorder.positionX - leftBorder.positionX + rightBorder.width;
    } else {
        document.getElementById("main").style.borderBottomColor = "#ff0081";
    }
    if (leftBorder.rechanging) {
        document.getElementById("main").style.borderLeft = "5px dashed #008080";
        leftBorder.positionY = topBorder.positionY;
        leftBorder.height = bottomBorder.positionY - topBorder.positionY + bottomBorder.height;
    } else {
        document.getElementById("main").style.borderLeftColor = "#ff0081";
    }
    if (rightBorder.rechanging) {
        document.getElementById("main").style.borderRight = "5px dashed #008080";
        rightBorder.positionY = topBorder.positionY;
        rightBorder.height = bottomBorder.positionY - topBorder.positionY + bottomBorder.height;
    } else {
        document.getElementById("main").style.borderRightColor = "#ff0081";
    }
    
    backgroundScreen.positionX = leftBorder.positionX;
    backgroundScreen.width = rightBorder.positionX - leftBorder.positionX + rightBorder.width;
    backgroundScreen.positionY = topBorder.positionY;
    backgroundScreen.height = bottomBorder.positionY - topBorder.positionY + bottomBorder.height;
    
    eval(`playLevel.Level${currentLevel}(delta);`);
    
    
    blocks.forEach(block => {
        block.drawBlock();
    });
    backgroundScreen.drawBlock();
}