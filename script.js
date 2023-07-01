dragPoint = 0;

const app = new PIXI.Application({ 
    antialias: true, 
    width: window.innerWidth, 
    height: window.innerHeight,
    backgroundColor: "#008080",
    resolution: 1
});

class Block{
  constructor(positionX, positionY, width, height, thickness, color){
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.thickness = thickness;
    this.color = color;
    this.graphic = new PIXI.Graphics();
    this.graphic.interactive = true;
    this.graphic.hitArea = new PIXI.Rectangle(positionX, positionY, width, height);
    this.graphic.on("pointerdown", this.onDragStart);
    this.graphic.on("pointerup", this.onDragEnd);
    this.graphic.on("pointerupoutside", this.onDragEnd);
    app.stage.addChild(this.graphic);
  }
  drawBlock(){
    this.graphic.clear();
    this.graphic.lineStyle(this.thickness, this.color).drawRect(this.positionX, this.positionY, this.width, this.height);
    let bounds = this.graphic.getBounds()
    this.graphic.hitArea = new PIXI.Rectangle(bounds.x, bounds.y, bounds.width, bounds.height);
  }
  onDragStart = (event) => {
    event.stopPropagation();
    dragPoint = event.data.getLocalPosition(this.graphic.parent);
    this.graphic.parent.on("pointermove", this.onDragMove);
  };
  
  onDragMove = (event) => {
      const newPoint = event.data.getLocalPosition(this.graphic.parent);
      const offsetX = newPoint.x - dragPoint.x;
      const offsetY = newPoint.y - dragPoint.y;
      this.positionX += offsetX;
      this.positionY += offsetY;
      dragPoint.x = newPoint.x;
      dragPoint.y = newPoint.y;
  };
  
  onDragEnd = (event) => {
    event.stopPropagation();
    this.graphic.parent.off("pointermove", this.onDragMove);
  };
}

document.body.appendChild(app.view);

app.stage.interactive = true;
app.stage.hitArea = app.screen;

let topBorder = new Block(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 1300, 20, 10, "#FF0000");
let bottomBorder = new Block(window.innerWidth/2 - 640, window.innerHeight/2 + 360, 1300, 20, 10, "#00FF00");
let leftBorder = new Block(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 20, 740, 10, "#0000FF");
let rightBorder = new Block(window.innerWidth/2 + 640, window.innerHeight/2 - 360, 20, 740, 10, "#FF00FF");

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