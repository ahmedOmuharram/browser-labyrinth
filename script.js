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

let topBorder = new Border(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 1300, 20, 10, "#FF0000", 'v', "#FF0000");
let bottomBorder = new Border(window.innerWidth/2 - 640, window.innerHeight/2 + 360, 1300, 20, 10, "#00FF00", 'v', "#00FF00");
let leftBorder = new Border(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 20, 740, 10, "#0000FF", 'h', "#0000FF");
let rightBorder = new Border(window.innerWidth/2 + 640, window.innerHeight/2 - 360, 20, 740, 10, "#FF00FF", 'h', "#FF00FF");

blocks = []
blocks.push(topBorder);
blocks.push(bottomBorder);
blocks.push(leftBorder);
blocks.push(rightBorder);
  
app.ticker.add(gameLoop);
  
function gameLoop(delta) {
    blocks.forEach(block => {
      block.drawBlock();
    });
}