const gravity = 9.8;
const terminalVelocity = 100;

const app = new PIXI.Application({ 
    antialias: true, 
    width: window.innerWidth, 
    height: window.innerHeight,
    backgroundColor: "#008080",
    resolution: 1
});
    
document.body.appendChild(app.view);

app.renderer.autoDensity = true;

const graphics = new PIXI.Graphics();
graphics.lineStyle(20, "#c3c3c3");
graphics.drawRect(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 1280, 720);

app.stage.addChild(graphics);

const playerSprite = PIXI.Sprite.from('media/sprite.png');

// center the sprite's anchor point
playerSprite.anchor.set(0.5);

// move the sprite to the center of the screen
playerSprite.x = app.screen.width / 2;
playerSprite.y = app.screen.height / 2;

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
    playerSprite.y += gravity;

    if (playerSprite.ySpeed > terminalVelocity) {
        playerSprite.ySpeed = terminalVelocity;
    }
    if (keys.w) {
      playerSprite.y -= speed;
    }
    if (keys.a) {
      playerSprite.x -= speed;
    }
    if (keys.s) {
      playerSprite.y += speed;
    }
    if (keys.d) {
      playerSprite.x += speed;
    }

  if (isColliding(playerSprite, graphics)) {
    console.log("I am crying :(")
  }
}

function isColliding(sprite, rect) {
    const spriteBounds = sprite.getBounds();
    const rectBounds = rect.getBounds();
  
    const borderThickness = 2; // Specify the thickness of the square's borders
  
    const spriteRight = spriteBounds.x + spriteBounds.width;
    const spriteBottom = spriteBounds.y + spriteBounds.height;
    const rectRight = rectBounds.x + rectBounds.width;
    const rectBottom = rectBounds.y + rectBounds.height;
  
    // Check if any of the sprite's borders overlap with the rectangle's borders
    const collidingLeft = spriteRight > rectBounds.x && spriteBounds.x < rectBounds.x + borderThickness;
    const collidingRight = spriteBounds.x < rectRight && spriteRight > rectRight - borderThickness;
    const collidingTop = spriteBottom > rectBounds.y && spriteBounds.y < rectBounds.y + borderThickness;
    const collidingBottom = spriteBounds.y < rectBottom && spriteBottom > rectBottom - borderThickness;
  
    return collidingLeft || collidingRight || collidingTop || collidingBottom;
}
