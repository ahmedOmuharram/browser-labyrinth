const gravity = 0.1;
const terminalVelocity = 1000000;
let isOnGround = true;
const playerJumpForce = 5;
let lost = false;
const explosionTextures = [];
PIXI.Assets.load('https://pixijs.com/assets/spritesheet/mc.json').then(() =>
  {
      // create an array to store the textures
      for (let i = 0; i < 26; i++)
      {
          const texture = PIXI.Texture.from(`Explosion_Sequence_A ${i + 1}.png`);
          explosionTextures.push(texture);
      }
  });
const playerSprite = PIXI.Sprite.from('media/sprite.png');
playerSprite.anchor.set(0.5);
playerSprite.x = screenWidth / 2 - 600;
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
    if (playerSprite.y + playerSprite.height/2 < topBorder.positionY && !lost ||
        playerSprite.y - playerSprite.height/2 > bottomBorder.positionY + bottomBorder.height && !lost||
        playerSprite.x + playerSprite.width/2 < leftBorder.positionX && !lost || 
        playerSprite.x - playerSprite.width/2 > rightBorder.positionX + rightBorder.width && !lost) {
          lose();
          lost = true;
        }
    if (playerSprite.topCollision && playerSprite.bottomCollision && !lost || playerSprite.leftCollision && playerSprite.rightCollision && !lost){
      lose();
      lost = true;
    }
    
    if (!colliding) {
        isOnGround = false;
    }
}

function lose() { 
  console.log("test")
  playerSprite.ySpeed = 0;
  playerSprite.height = 0;
  const explosion = new PIXI.AnimatedSprite(explosionTextures);
    for (i = 0; i < 1; i++)
    {
        explosion.x = playerSprite.x;
        explosion.y = playerSprite.y;
        explosion.anchor.set(0.5);
        explosion.rotation = Math.random() * Math.PI;
        explosion.scale.set(0.75 + Math.random() * 0.5);
        explosion.gotoAndPlay(0);
        app.stage.addChild(explosion);
    }
    explosion.loop = false;
    explosion.onComplete = () => {
    setTimeout(restart, 1500);
    app.stage.removeChild(explosion);
    };
}
function restart() {
  bottomBorder.onDragEnd();
  leftBorder.onDragEnd();
  rightBorder.onDragEnd();
  topBorder.onDragEnd();
  app.stage.removeChildren();
  backgroundScreen = new Block(0, 0, screenWidth, screenHeight, 2, "#ffffff", 'v', "#ffffff");
  bottomBorder = new Border(0, 710, 1300, 10, 2, "#c8c8c8", 'v', "#c8c8c8");
  leftBorder = new Border(0, 0, 10, 720, 2, "#c8c8c8", 'h', "#c8c8c8");
  rightBorder = new Border(1270, 0, 10, 740, 2, "#c8c8c8", 'h', "#c8c8c8");
  topBorder = new Border(0, 0, 1280, 20, 2, "#c8c8c8", 'v', "#010081");
  blocks = [topBorder, bottomBorder, leftBorder, rightBorder]
  levelBlocks = [];
  app.stage.addChild(playerSprite);
  playerSprite.x = screenWidth / 2 - 600;
  playerSprite.y = 500;
  playerSprite.height = 40;
  lost = false;
  test.generate()
}
