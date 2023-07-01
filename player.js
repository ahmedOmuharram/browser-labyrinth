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
    playerSprite.ySpeed += gravity;
    playerSprite.xSpeed = 0;
    if (playerSprite.ySpeed > terminalVelocity) {
        playerSprite.ySpeed = terminalVelocity;
    }

    if (keys.w && isOnGround) {
        playerSprite.ySpeed = -playerJumpForce;
        isOnGround = false;
    }
    playerSprite.xSpeed -= keys.a * speed;
    playerSprite.xSpeed += keys.d * speed;

    playerSprite.x += playerSprite.xSpeed;
    playerSprite.y += playerSprite.ySpeed;
    colliding = false;
    for (let i = 0; i < blocks.length; i++) {
        if (isColliding(playerSprite, blocks[i].graphic)) {
            resolveCollision(playerSprite, blocks[i].graphic);
            colliding = true;
        }
    }

    if (!colliding) {
        isOnGround = false;
    }
}

function isColliding(sprite, rect) {
  const { x, y, width, height } = sprite.getBounds();
  const { x: rectX, y: rectY, width: rectWidth, height: rectHeight } = rect.getLocalBounds();

  return (
      x + width >= rectX &&
      x <= rectX + rectWidth &&
      y + height >= rectY &&
      y <= rectY + rectHeight
  );
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
        playerSprite.y += overlapY;
        playerSprite.ySpeed += gravity;
    } else {
        if (playerSprite.ySpeed > 0) {
          playerSprite.ySpeed = 0;
        }
        isOnGround = true;
        playerSprite.y -= overlapY;
      }
      return true;
    } else {
      if (dx > 0) {
        playerSprite.x += overlapX;
        isOnGround = true;
      } else {
        playerSprite.x -= overlapX;
        isOnGround = true;
      }
      return true;
    }
  }
}
