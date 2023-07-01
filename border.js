var dragPoint = 0;

class Border extends Block{
  constructor(positionX, positionY, width, height, thickness, color, direction){
    super(positionX, positionY, width, height, thickness, color, direction)
    this.graphic.interactive = true;
    this.graphic.hitArea = new PIXI.Rectangle(positionX, positionY, width, height);
    this.graphic.on("pointerdown", this.onDragStart);
    this.graphic.on("pointerup", this.onDragEnd);
    this.graphic.on("pointerupoutside", this.onDragEnd);
  }

  drawBlock() {
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
      if (this.direction == 'v') {
        const offsetY = newPoint.y - dragPoint.y;
        this.positionY += offsetY;
        dragPoint.y = newPoint.y;
      } else if(this.direction == 'h') {
        const offsetX = newPoint.x - dragPoint.x;
        this.positionX += offsetX;
        dragPoint.x = newPoint.x;
      } else {
        const offsetX = newPoint.x - dragPoint.x;
        const offsetY = newPoint.y - dragPoint.y;
        this.positionX += offsetX;
        this.positionY += offsetY;
        dragPoint.x = newPoint.x;
        dragPoint.y = newPoint.y;
      } 
  };
  
  onDragEnd = (event) => {
    event.stopPropagation();
    this.graphic.parent.off("pointermove", this.onDragMove);
  };
}

window.Border = Border;
