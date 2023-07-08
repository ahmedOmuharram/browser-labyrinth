class Cannon extends Block{
    constructor(positionX, positionY, width, height, thickness, color, direction, fillColor, minSpeed, maxSpeed, minAngle, maxAngle){
        super(positionX, positionY, width, height, thickness, color, direction, fillColor);
        this.minSpeed = minSpeed;
        this.maxSpeed = maxSpeed;
        this.minAngle = minAngle;
        this.maxAngle = maxAngle;
        levelBlocks.push(this);
        blocks.push(this);
    }
    shoot(number, width, height, thickness, color, fillColor, gravity){
        let angle = 0;
        let speed = 0;
        for (let i = 0; i < number; i++) {
            angle = (Math.random() * (this.maxAngle - this.minAngle) + this.minAngle) * Math.PI / 180;
            speed = Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed;
            let movingblock = new MovingBlock(this.positionX, this.positionY, width, height, thickness, color, "v", fillColor, speed * Math.cos(angle), speed * Math.sin(angle), gravity);
            blocks.push(movingblock);
        }
    }
}

window.Cannon = Cannon;