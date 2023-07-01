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


app.stage.interactive = true;
app.stage.hitArea = app.screen;

let topBorder = new PIXI.Graphics();
let bottomBorder = new PIXI.Graphics();
let leftBorder = new PIXI.Graphics();
let rightBorder = new PIXI.Graphics();
topBorder.interactive = true;
topBorder.hitArea = new PIXI.Rectangle(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 1300, 20);
topBorder.on('pointerdown', ronDragStart, topBorder);
function ronDragStart(){
  console.log("red");
}
bottomBorder.interactive = true;
bottomBorder.hitArea = new PIXI.Rectangle(window.innerWidth/2 - 640, window.innerHeight/2 + 360, 1300, 20);
bottomBorder.on('pointerdown', gonDragStart, bottomBorder);
function gonDragStart(){
  console.log("green");
}
leftBorder.interactive = true;
leftBorder.hitArea = new PIXI.Rectangle(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 20, 740);
leftBorder.on('pointerdown', bonDragStart, leftBorder);
function bonDragStart(){
  console.log("blue");
}
rightBorder.interactive = true;
rightBorder.hitArea = new PIXI.Rectangle(window.innerWidth/2 + 640, window.innerHeight/2 - 360, 20, 740);
rightBorder.on('pointerdown', ponDragStart, rightBorder);
function ponDragStart(){
  console.log("purple");
}
/*let box = new PIXI.Graphics();
box.lineStyle(20, "#ff0000").drawRect(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 1280, 720);


blocks.push(box)
app.stage.addChild(box);*/
blocks = []

blocks.push(topBorder);
blocks.push(bottomBorder);
blocks.push(leftBorder);
blocks.push(rightBorder);

app.stage.addChild(topBorder);
app.stage.addChild(bottomBorder);
app.stage.addChild(leftBorder);
app.stage.addChild(rightBorder);

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
    drawObjects();
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
    colliding = false;
    for (var i = 0; i < blocks.length; i++) {
        if (isColliding(playerSprite, blocks[i])) {
            console.log("test")
           resolveCollision(playerSprite, blocks[i]);
           colliding = true;
        }
    }

    if (!colliding) {
        isOnGround = false;
    }
}
/*
function isCollidingBox(sprite, rect) {
    const spriteBounds = sprite.getBounds();
    const rectBounds = rect.getBounds();
  
    const borderThickness = 20;
  
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

function resolveBoxCollision(sprite, rect) {
    const spriteBounds = sprite.getBounds();
    const rectBounds = rect.getLocalBounds();
    const rectThickness = 20
    
    const left = rectBounds.x;
    const right = rectBounds.x + rectBounds.width;
    const top = rectBounds.y;
    const bottom = rectBounds.y + rectBounds.height;

    if (spriteBounds.x <= left+rectThickness) {
        playerSprite.x = left+spriteBounds.width/2+rectThickness;
    }
    if (spriteBounds.x+spriteBounds.width >= right-rectThickness) {
        playerSprite.x = right-spriteBounds.width/2-rectThickness;
    }

    if (spriteBounds.y+spriteBounds.height >= bottom-rectThickness) {
        isOnGround = true;
        playerSprite.y = bottom-spriteBounds.height/2-rectThickness;
    }
    
    if (spriteBounds.y <= top+rectThickness) {
        playerSprite.y = top+spriteBounds.height/2+rectThickness;
    }
}
*/

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

function drawObjects(){
  topBorder.clear();
  bottomBorder.clear();
  leftBorder.clear();
  rightBorder.clear();
  topBorder.lineStyle(2, "#ff0000").drawRect(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 1300, 20);
  bottomBorder.lineStyle(2, "#00ff00").drawRect(window.innerWidth/2 - 640, window.innerHeight/2 + 360, 1300, 20);
  leftBorder.lineStyle(2, "#0000ff").drawRect(window.innerWidth/2 - 640, window.innerHeight/2 - 360, 20, 740);
  rightBorder.lineStyle(2, "#ff00ff").drawRect(window.innerWidth/2 + 640, window.innerHeight/2 - 360, 20, 740);
}