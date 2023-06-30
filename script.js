const gravity = 0.1;
const terminalVelocity = 1000000;
var colliding = false;

const app = new PIXI.Application({ 
    antialias: true, 
    width: window.innerWidth, 
    height: window.innerHeight,
    backgroundColor: "#008080",
    resolution: 1
});
    
document.body.appendChild(app.view);

app.renderer.autoDensity = true;


blocks = []
blocks.push(new PIXI.Graphics().lineStyle(20, "#c3c3c3").drawRect(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 1280, 20));
blocks.push(new PIXI.Graphics().lineStyle(20, "#c3c3c3").drawRect(window.innerWidth/2 - 640, window.innerHeight/2 + 360, 1280, 20));
blocks.push(new PIXI.Graphics().lineStyle(20, "#c3c3c3").drawRect(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 20, 720));
blocks.push(new PIXI.Graphics().lineStyle(20, "#c3c3c3").drawRect(window.innerWidth/2 + 640, window.innerHeight/2 - 360, 20, 740));
blocks.forEach(block => {
  app.stage.addChild(block)
});

const playerSprite = PIXI.Sprite.from('media/sprite.png');

// center the sprite's anchor point
playerSprite.anchor.set(0.5);

// move the sprite to the center of the screen
playerSprite.x = app.screen.width / 2;
playerSprite.y = 500;
playerSprite.xSpeed = 0;
playerSprite.ySpeed = 0;
playerSprite.width = 36;
playerSprite.height = 40;
let isOnGround = true;
const playerJumpForce = 5;

app.stage.addChild(playerSprite);

const keys = {
    w: false,
    a: false,
    s: false,
    d: false
  };
  
  const speed = 5;
  
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  
  function onKeyDown(event) {
    const key = event.key.toLowerCase();
    if (keys.hasOwnProperty(key)) {
      keys[key] = true;
    }
  }
  
  function onKeyUp(event) {
    const key = event.key.toLowerCase();
    if (keys.hasOwnProperty(key)) {
      keys[key] = false;
    }
  }
  
  app.ticker.add(gameLoop);
  
function gameLoop(delta) {
    if(!isOnGround)
    playerSprite.ySpeed += gravity;
    playerSprite.xSpeed = 0;
    if (playerSprite.ySpeed > terminalVelocity) {
        playerSprite.ySpeed = terminalVelocity;
    }

    if(keys.w && isOnGround){
      playerSprite.ySpeed = -playerJumpForce;
      isOnGround = false;
    }
    playerSprite.xSpeed -= keys.a*speed;
    playerSprite.xSpeed += keys.d*speed;

    playerSprite.x += playerSprite.xSpeed;
    playerSprite.y += playerSprite.ySpeed;
    for (var i = 0; i < blocks.length; i++) {
        if (isColliding(playerSprite, blocks[i])) {
           resolveCollision(playerSprite, blocks[i]);
           colliding = true;
        }
    }

    if (!colliding) {
        isOnGround = false;
    }
}

function isColliding(sprite, rect) {
  const spriteBounds = sprite.getBounds();
  const rectBounds = rect.getLocalBounds();

  return spriteBounds.x + spriteBounds.width >= rectBounds.x &&
         spriteBounds.x <= rectBounds.x + rectBounds.width &&
         spriteBounds.y + spriteBounds.height >= rectBounds.y &&
         spriteBounds.y <= rectBounds.y + rectBounds.height;
}

function resolveCollision(sprite, rect) {
  const spriteBounds = sprite.getBounds();
  const rectBounds = rect.getLocalBounds();


  const dx = (spriteBounds.x + spriteBounds.x + spriteBounds.width) / 2 - (rectBounds.x + rectBounds.x + rectBounds.width) / 2;
  const dy = (spriteBounds.y + spriteBounds.y + spriteBounds.height) / 2 - (rectBounds.y + rectBounds.y + rectBounds.height) / 2;

  const combinedHalfWidths = (spriteBounds.width + rectBounds.width) / 2;
  const combinedHalfHeights = (spriteBounds.height + rectBounds.height) / 2;

  if (Math.abs(dx) < combinedHalfWidths && Math.abs(dy) < combinedHalfHeights) {
    const overlapX = combinedHalfWidths - Math.abs(dx);
    const overlapY = combinedHalfHeights - Math.abs(dy);

    if (overlapX >= overlapY) {
      if (dy > 0) {
        //Player top side collision
        playerSprite.y += overlapY;
        playerSprite.ySpeed += gravity;
    } else {
        //Player bottom side collision
        if (playerSprite.ySpeed > 0) {
          playerSprite.ySpeed = 0;
        }
        isOnGround = true;
        playerSprite.y -= overlapY;
      }
      return true;
    } else {
      if (dx > 0) {
        //Player left side collision
        playerSprite.x += overlapX;
        isOnGround = true;
      } else {
        //Player right side collision
        playerSprite.x -= overlapX;
        isOnGround = true;
      }
      return true;
    }
  }
}