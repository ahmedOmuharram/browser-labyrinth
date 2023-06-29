let keyState = {};

let playerX = 0;
let playerY = 0;
let playerSpeed = 300;

let gravity = 1000;
let verticalVelocity = 0;
let jumpForce = 500;
let isOnGround = false;

const targetFPS = 1001;
const targetInterval = 1000 / targetFPS;

let previousTimestamp = 0;

function createCustomBody(bottomValue, rightValue, widthValue, heightValue) {
  document.body.innerHTML += `<div class="object solid" style="position:absolute; box-shadow: inset 0 0 10px 5px #0f0, inset 0 0 15px 10px #fff, 0 0 15px 5px #0f0; background-color: #fff; bottom: ${bottomValue}px; right: ${rightValue}px; width: ${widthValue}px; height: ${heightValue}px"></div>`;
}

createCustomBody('0', '200', '200', '20');
createCustomBody('200', '50', '20', '500');
createCustomBody('100', '500', '20', '500');
createCustomBody('400', '800', '500', '20');
createCustomBody('600', '300', '400', '20');

function createRamp(bottomValue, rightValue, widthValue, heightValue) {
  document.body.innerHTML += `<div class="object solid" style="border-radius: 0% 100% 0% 0%; position:absolute; box-shadow: inset 0 0 10px 5px #0f0, inset 0 0 15px 10px #fff, 0 0 15px 5px #0f0; background-color: #fff; bottom: ${bottomValue}px; right: ${rightValue}px; width: ${widthValue}px; height: ${heightValue}px"></div>`;
}

createRamp('400', '200', '200', '100');

let player = document.getElementById("player");
let solids = document.querySelectorAll('.solid');

function checkCollision(obj1, obj2) {
  let rect1 = obj1.getBoundingClientRect();
  let rect2 = obj2.getBoundingClientRect();

  if (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  ) { return true; }

  return false;
}

function gameLoop(timestamp) {
    const elapsed = timestamp - previousTimestamp;
    const deltaTime = elapsed / 1000;

    verticalVelocity += gravity * deltaTime;
    playerY += verticalVelocity * deltaTime;
    
    // if (keyState["KeyW"]) {
    //     playerY -= playerSpeed * deltaTime;
    // }
    if (keyState["KeyA"]) {
        playerX -= playerSpeed * deltaTime;
    }
    // if (keyState["KeyS"]) {
    //     playerY += playerSpeed * deltaTime;
    // }
    if (keyState["KeyD"]) {
        playerX += playerSpeed * deltaTime;
    }

    let colliding = false;
    for( var i = 0; i < solids.length; i++) {
      if (checkCollision(player, solids[i])) {
        colliding = true;
        console.log("Colliding")
        resolveCollision(player.getBoundingClientRect(), solids[i].getBoundingClientRect());
      }
    }
    if (!colliding) {
      gravity = 1000;
    }
    
    if (playerX < 0) {
        playerX = 0;
        isOnGround = true;
    }

    if (playerY < 0) {
        playerY = 0;
    }
    
    if (playerX + player.offsetWidth > window.innerWidth) {
        playerX = window.innerWidth - player.offsetWidth;
        isOnGround = true;
    }
    
    if (playerY + player.offsetHeight > window.innerHeight) {
        playerY = window.innerHeight - player.offsetHeight;
        verticalVelocity = 0;
        isOnGround = true;
    }


    player.style.transform = `translate(${playerX}px, ${playerY}px)`;


    previousTimestamp = timestamp;
    
    setTimeout(() => {
        requestAnimationFrame(gameLoop);
    }, targetInterval);
}

function resolveCollision(playerRect, solidRect) {

  const dx = (playerRect.left + playerRect.right) / 2 - (solidRect.left + solidRect.right) / 2;
  const dy = (playerRect.top + playerRect.bottom) / 2 - (solidRect.top + solidRect.bottom) / 2;

  const combinedHalfWidths = (playerRect.width + solidRect.width) / 2;
  const combinedHalfHeights = (playerRect.height + solidRect.height) / 2;

  if (Math.abs(dx) < combinedHalfWidths && Math.abs(dy) < combinedHalfHeights) {
    const overlapX = combinedHalfWidths - Math.abs(dx);
    const overlapY = combinedHalfHeights - Math.abs(dy);

    if (overlapX >= overlapY) {
      if (dy > 0) {
        playerY += overlapY;
        verticalVelocity = 0;
      } else {
        if (verticalVelocity > 0) {
          verticalVelocity = 0;
        }
        isOnGround = true;
        playerY -= overlapY;
      }
      return true;
    } else {
      if (dx > 0) {
        playerX += overlapX;
        isOnGround = true;
      } else {
        playerX -= overlapX;
        isOnGround = true;
      }
      return true;
    }
  }
}

function jump() {
    if (isOnGround) { 
      verticalVelocity = -jumpForce;
      isOnGround = false;
    }
}

document.addEventListener("keydown", (event) => {
  keyState[event.code] = true;

  if (event.code === "Space") {
    jump();
  }
});

document.addEventListener("keyup", (event) => {
  keyState[event.code] = false;
});

requestAnimationFrame(gameLoop);
