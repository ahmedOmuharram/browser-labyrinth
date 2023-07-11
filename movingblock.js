class MovingBlock extends Block{
    constructor(positionX, positionY, width, height, thickness, color, direction, fillColor, speedX, speedY, gravity){
        super(positionX, positionY, width, height, thickness, color, direction, fillColor);
        this.speedX = speedX;
        this.speedY = speedY;
        this.gravity = gravity;
    }
    drawBlock(delta) {
        if (app.stage) {
            if (this.positionX > screenWidth || this.positionX < -1 * this.width || this.positionY > screenHeight || this.positionY < -1 * this.height) {
                app.stage.removeChild(this);
                blocks.splice(blocks.indexOf(this), 1);
                delete this;
            }
        }
        else {
            if (this.positionX > endScreenWidth || this.positionX < -1 * this.width || this.positionY > endScreenHeight || this.positionY < -1 * this.height) {
                endApp.stage.removeChild(this);
                blocks.splice(blocks.indexOf(this), 1);
                delete this;
            }
        }
        this.speedY += this.gravity * delta * 0.5;
        this.positionX += this.speedX * delta;
        this.positionY += this.speedY * delta;
        this.speedY += this.gravity * delta * 0.5;
        this.graphic.clear();
        this.graphic.beginFill(this.fillColor);
        this.graphic.lineStyle(this.thickness, this.color).drawRect(this.positionX, this.positionY, this.width, this.height);
        this.graphic.endFill();
      }
    
}

window.MovingBlock = MovingBlock;