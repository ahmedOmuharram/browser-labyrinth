let player = document.getElementById("player");
let solid = document.getElementById("solid");
let keyState = {};

let playerX = 0;
let playerY = 0;
let playerSpeed = 5;

let gravity = 0.5;
let verticalVelocity = 0;
let jumpForce = 10;
let isOnGround = false;
let lastTime = 0;

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

function updatePlayerPosition(currentTime) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  
  verticalVelocity += gravity;
  playerY += verticalVelocity;
  
  if (keyState["KeyW"]) {
    playerY -= playerSpeed;
  }
  if (keyState["KeyA"]) {
    playerX -= playerSpeed;
  }
  if (keyState["KeyS"]) {
    playerY += playerSpeed;
  }
  if (keyState["KeyD"]) {
    playerX += playerSpeed;
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


  requestAnimationFrame(updatePlayerPosition);
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

requestAnimationFrame(updatePlayerPosition);
