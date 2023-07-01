const gravity = 0.1;
const terminalVelocity = 1000000;
let isOnGround = true;
const playerJumpForce = 5;

const playerSprite = PIXI.Sprite.from('media/sprite.png');
playerSprite.anchor.set(0.5);
playerSprite.x = app.screen.width / 2;
playerSprite.y = 500;
playerSprite.xSpeed = 0;
playerSprite.ySpeed = 0;
playerSprite.width = 36;
playerSprite.height = 40;

playerSprite.topCollision = false;
playerSprite.bottomCollision = false;
playerSprite.leftCollision = false;
playerSprite.rightCollision = false;


app.stage.addChild(playerSprite);

const keys = {
    32: false,
    37: false,
    38: false,
    39: false,
    65: false,
    68: false,
    87: false
};

const speed = 5;

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function onKeyDown(event) {
    const key = event.which;
    if (keys.hasOwnProperty(key)) {
        keys[key] = true;
    }
}

function onKeyUp(event) {
    const key = event.which;
    if (keys.hasOwnProperty(key)) {
        keys[key] = false;
    }
}

app.ticker.add(gameLoop);

function gameLoop(delta) {
    playerSprite.ySpeed += gravity;
    playerSprite.xSpeed = 0;
    if (playerSprite.ySpeed > terminalVelocity) {
        playerSprite.ySpeed = terminalVelocity;
    }

    if ((keys[32] || keys[38] || keys[87]) && isOnGround) {
        playerSprite.ySpeed = -playerJumpForce;
        isOnGround = false;
    }
    playerSprite.xSpeed -= (keys[37] || keys[65]) * speed;
    playerSprite.xSpeed += (keys[39] || keys[68]) * speed;

    playerSprite.x += playerSprite.xSpeed;
    playerSprite.y += playerSprite.ySpeed;
    colliding = false;
    playerSprite.topCollision = false;
    playerSprite.bottomCollision = false;
    playerSprite.leftCollision = false;
    playerSprite.rightCollision = false;
    for (let i = 0; i < blocks.length; i++) {
        if (isColliding(playerSprite, blocks[i].graphic)) {
            resolveCollision(playerSprite, blocks[i].graphic);
            colliding = true;
        }
    }
    if (playerSprite.y - playerSprite.height/2 < topBorder.positionY ||
        playerSprite.y + playerSprite.height/2 > bottomBorder.positionY + bottomBorder.height ||
        playerSprite.x - playerSprite.width/2 < leftBorder.positionX || 
        playerSprite.x + playerSprite.width/2 > rightBorder.positionX + rightBorder.width) {
          playerSprite.height = 0;
          lose()
        }
    if (playerSprite.topCollision && playerSprite.bottomCollision || playerSprite.leftCollision && playerSprite.rightCollision){
      playerSprite.height = 0    
      lose()
    }

    if (!colliding) {
        isOnGround = false;
    }
}

function lose() {
  console.log("L")
}