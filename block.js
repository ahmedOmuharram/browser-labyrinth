var dragPoint = 0;

class Block{
  constructor(positionX, positionY, width, height, thickness, color, direction, fillColor) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.thickness = thickness;
    this.color = color;
    this.direction = direction;
    this.fillColor = fillColor;
    this.graphic = new PIXI.Graphics();
    app.stage.addChild(this.graphic);
  }

  drawBlock() {
    this.graphic.clear();
    this.graphic.beginFill(this.fillColor);
    this.graphic.lineStyle(this.thickness, this.color).drawRect(this.positionX, this.positionY, this.width, this.height);
    this.graphic.endFill();
  }
}

window.Block = Block;
