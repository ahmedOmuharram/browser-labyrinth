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

let bottomBorder = new Border(window.innerWidth/2 - 640, window.innerHeight/2 + 360, 1300, 20, 2, "#c8c8c8", 'v', "#c8c8c8");
let leftBorder = new Border(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 10, 740, 2, "#c8c8c8", 'h', "#c8c8c8");
let rightBorder = new Border(window.innerWidth/2 + 640, window.innerHeight/2 - 360, 10, 740, 2, "#c8c8c8", 'h', "#c8c8c8");
let topBorder = new Border(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 1300, 20, 2, "#c8c8c8", 'v', "#010081");

blocks = [topBorder, bottomBorder, leftBorder, rightBorder]

let test = new Level("test", 0);
levelBlocks = []
test.generate()

app.ticker.add(gameLoop);

window.onresize = function()
{
    test.refresh();
}

function gameLoop(delta) {
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
    if (levelBlocks[0]) {
        levelBlocks[0].height = Math.min(leftBorder.height, 3 * bottomBorder.width/4);
    }
    blocks.forEach(block => {
        block.drawBlock();
    });
}