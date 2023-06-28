let player = document.getElementById("player");
let keyState = {};

let playerX = 0;
let playerY = 0;
let playerSpeed = 5;

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