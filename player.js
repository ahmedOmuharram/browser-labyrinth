let player = document.getElementById("player");
let solid = document.getElementById("solid");
let keyState = {};

let playerX = 0;
let playerY = 0;
let playerSpeed = 5;

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

function updatePlayerPosition() {
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
  
  if (checkCollision(player, solid)) {
    console.log("Collision");
  } else {
    console.log("No Collision");
  }

  if (playerX < 0) {
    playerX = 0;
  }
  if (playerY < 0) {
    playerY = 0;
  }
  if (playerX + player.offsetWidth > window.innerWidth) {
    playerX = window.innerWidth - player.offsetWidth;
  }
  if (playerY + player.offsetHeight > window.innerHeight) {
    playerY = window.innerHeight - player.offsetHeight;
  }

  player.style.transform = `translate(${playerX}px, ${playerY}px)`;

  requestAnimationFrame(updatePlayerPosition);
}

document.addEventListener("keydown", (event) => {
  keyState[event.code] = true;
});

document.addEventListener("keyup", (event) => {
  keyState[event.code] = false;
});

updatePlayerPosition();