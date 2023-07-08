class MovingBlock extends Block{
    constructor(positionX, positionY, width, height, thickness, color, direction, fillColor, speedX, speedY, gravity){
        super(positionX, positionY, width, height, thickness, color, direction, fillColor);
        this.speedX = speedX;
        this.speedY = speedY;
        this.gravity = gravity;
    }
    drawBlock() {
        if (this.positionX > 1280 || this.positionX < -1 * this.width || this.positionY > 720 || this.positionY < -1 * this.height){
            app.stage.removeChild(this);
            blocks.splice(blocks.indexOf(this), 1);
            delete this;
        }
        this.speedY += this.gravity;
        this.positionX += this.speedX;
        this.positionY += this.speedY;
        this.graphic.clear();
        this.graphic.beginFill(this.fillColor);
        this.graphic.lineStyle(this.thickness, this.color).drawRect(this.positionX, this.positionY, this.width, this.height);
        this.graphic.endFill();
      }
}

window.MovingBlock = MovingBlock;