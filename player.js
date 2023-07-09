const gravity = 0.5;
const terminalVelocity = 100;
let isOnGround = true;
const playerJumpForce = 12;
let lost = true;
let won = true;
const explosionTextures = [];
const winTextures = [];
let winSound = new Audio("media/win.mp3");
winSound.volume = 0.6;
winSound.loop = false;
let loseSound = new Audio("media/lose.mp3");
loseSound.volume = 0.6;
loseSound.loop = false;
loseSound.playbackRate = 1.3;

for (let i = 0; i < 11; i++)
{
    const texture = PIXI.Texture.from(`media/file_crumble_large_png_sequence/File Crumble Large${i + 1}.png`);
    explosionTextures.push(texture);
}

for (let i = 0; i < 14; i++)
{
    const texture = PIXI.Texture.from(`media/Folder_Win_Image_Sequence/Folder_Win${i + 1}.png`);
    winTextures.push(texture);
}

const playerSprite = PIXI.Sprite.from('media/sprite.png');
playerSprite.anchor.set(0.5);
playerSprite.x = screenWidth / 2 - 600;
playerSprite.y = 640;
playerSprite.xSpeed = 0;
playerSprite.ySpeed = 0;
playerSprite.width = 36;
playerSprite.height = 40;

const folderSprite = PIXI.Sprite.from('media/folder.png');
folderSprite.anchor.set(0.5);
folderSprite.x = screenWidth - 50;
folderSprite.y = 40;
folderSprite.width = 60;
folderSprite.height = 70;


playerSprite.topCollision = false;
playerSprite.bottomCollision = false;
playerSprite.leftCollision = false;
playerSprite.rightCollision = false;


const keys = {
    32: false,
    37: false,
    38: false,
    39: false,
    65: false,
    68: false,
    87: false
};

const speed = 12;

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

var deltaTime = 0
function gameLoop(delta) { 
    playerSprite.ySpeed += gravity * delta * 0.5;
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

    playerSprite.x += playerSprite.xSpeed * delta;
    playerSprite.y += playerSprite.ySpeed * delta;
    playerSprite.ySpeed += gravity * delta * 0.5;
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

    if (playerSprite.getBounds().x >= 1200 && playerSprite.getBounds().y <= 24 && !won && !lost) {
        won = true;
        win();
    }

    if (!won) {
        if (playerSprite.y + playerSprite.height/2 < topBorder.positionY && !lost ||
        playerSprite.y - playerSprite.height/2 > bottomBorder.positionY + bottomBorder.height && !lost||
        playerSprite.x + playerSprite.width/2 < leftBorder.positionX && !lost || 
        playerSprite.x - playerSprite.width/2 > rightBorder.positionX + rightBorder.width && !lost) {
            lost = true;
            lose();
        }

        if (playerSprite.topCollision && playerSprite.bottomCollision && !lost && !won || playerSprite.leftCollision && playerSprite.rightCollision && !lost){
            lost = true;
            lose();
        }
    }
    
    if (!colliding) {
        isOnGround = false;
    }
}

function lose() { 
    playerSprite.ySpeed = 0;
    playerSprite.height = 0;
    const text = new PIXI.Text("Request timed out.", {
        fontFamily: 'Levi Windows',
        fontSize: 24,
        lineHeight: 28,
        letterSpacing: 0,
        fill: "#ffffff",
        align: "center",
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 2,
        dropShadowDistance: 2,
    })
    const explosion = new PIXI.AnimatedSprite(explosionTextures);
    if (currentLevel == 10) {
        text.tint = "#00ff00";
        explosion.tint = "#00ff00";
    }
    zeroParticleGenerator.createParticles(Math.random() * 10, playerSprite.x, playerSprite.y);
    oneParticleGenerator.createParticles(Math.random() * 10, playerSprite.x, playerSprite.y);
    explosion.x = playerSprite.x;
    explosion.y = playerSprite.y;
    explosion.animationSpeed = 0.2;
    explosion.width = 60;
    explosion.height = 45;
    explosion.anchor.set(0.5);
    explosion.gotoAndPlay(0);
    app.stage.addChild(explosion);
    explosion.loop = false;
    loseSound.play();
    text.anchor.set(0.5);
    text.resolution = 1;
    text.x = Math.max(playerSprite.x, 100);
    if (text.x > 1180) {
        text.x = 1180;
    }
    text.y = playerSprite.y - 40;
    if (text.y < 70) {
        text.y = 70
    }
    app.stage.addChild(text);
    explosion.onComplete = () => {
        setTimeout(() => setLevel(currentLevel), 1500);
        app.stage.removeChild(explosion);
    };
}

function win() { 
    playerSprite.ySpeed = 0;
    playerSprite.height = 0;
    const text = new PIXI.Text("64 bytes from 8.8.8.8", {
        fontFamily: 'Levi Windows',
        fontSize: 24,
        lineHeight: 28,
        letterSpacing: 0,
        fill: "#ffffff",
        align: "center",
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 2,
        dropShadowDistance: 2,
    })
    const winAnimation = new PIXI.AnimatedSprite(winTextures);
    if (currentLevel == 10) {
        text.tint = "#00ff00";
        winAnimation.tint = "#00ff00";
    }
    winAnimation.x = folderSprite.x;
    winAnimation.y = folderSprite.y;
    winAnimation.width = folderSprite.width;
    winAnimation.height = folderSprite.height;
    winAnimation.animationSpeed = 0.2;
    winAnimation.anchor.set(0.5);
    winAnimation.gotoAndPlay(0);
    winSound.play();
    app.stage.addChild(winAnimation);
    winAnimation.loop = false;
    text.anchor.set(0.5);
    text.resolution = 1;
    text.x = folderSprite.x - 70;
    text.y = folderSprite.y + 50;
    app.stage.addChild(text);
    winAnimation.onComplete = () => {
        setTimeout(() => setLevel(++currentLevel), 1500);
        folderSprite.texture = PIXI.Texture.from('/media/full-folder.png')
        app.stage.removeChild(winAnimation);
    };
}
