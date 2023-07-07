const gravity = 0.5;
const terminalVelocity = 100;
let isOnGround = true;
const playerJumpForce = 12;
let lost = false;
let won = false;
const explosionTextures = [];
const winTextures = [];

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
playerSprite.y = screenHeight - 30;
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

app.stage.addChild(playerSprite);
app.stage.addChild(folderSprite);

const keys = {
    32: false,
    37: false,
    38: false,
    39: false,
    65: false,
    68: false,
    78: false,
    80: false,
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

document.onkeydown = function (e) {
    if (keys[78]) {
        if (currentLevel < 3) {
            currentLevel++;
            setLevel(currentLevel);
        }
    }

    if (keys[80]) {
        if (currentLevel > 0){
            currentLevel--;
            setLevel(currentLevel);
        }
    }
};

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

    if (playerSprite.getBounds().x >= 1200 && playerSprite.getBounds().y <= 24 && !won) {
        won = true;
        win();
    }

    if (!won) {
        if (playerSprite.y + playerSprite.height/2 < topBorder.positionY && !lost ||
        playerSprite.y - playerSprite.height/2 > bottomBorder.positionY + bottomBorder.height && !lost||
        playerSprite.x + playerSprite.width/2 < leftBorder.positionX && !lost || 
        playerSprite.x - playerSprite.width/2 > rightBorder.positionX + rightBorder.width && !lost) {
            lose();
            lost = true;
        }

        if (playerSprite.topCollision && playerSprite.bottomCollision && !lost && !won || playerSprite.leftCollision && playerSprite.rightCollision && !lost){
            lose();
            lost = true;
        }
    }
    
    if (!colliding) {
        isOnGround = false;
    }
}

function lose() { 
    playerSprite.ySpeed = 0;
    playerSprite.height = 0;
    const explosion = new PIXI.AnimatedSprite(explosionTextures);
    explosion.x = playerSprite.x;
    explosion.y = playerSprite.y;
    explosion.animationSpeed = 0.2;
    explosion.width = 60;
    explosion.height = 45;
    explosion.anchor.set(0.5);
    explosion.gotoAndPlay(0);
    app.stage.addChild(explosion);
    explosion.loop = false;
    explosion.onComplete = () => {
        setTimeout(setLevel(currentLevel), 1500);
        app.stage.removeChild(explosion);
    };
}

function win() { 
    playerSprite.ySpeed = 0;
    playerSprite.height = 0;
    const winAnimation = new PIXI.AnimatedSprite(winTextures);
    winAnimation.x = folderSprite.x;
    winAnimation.y = folderSprite.y;
    winAnimation.width = folderSprite.width;
    winAnimation.height = folderSprite.height;
    winAnimation.animationSpeed = 0.2;
    winAnimation.anchor.set(0.5);
    winAnimation.gotoAndPlay(0);
    app.stage.addChild(winAnimation);
    winAnimation.loop = false;
    won = false;
    winAnimation.onComplete = () => {
        if (currentLevel < 3) {
            setTimeout(setLevel(currentLevel++), 1500);
        }
        app.stage.removeChild(winAnimation);
    };
}

function setLevel(level) {
    blocks = [];
    bottomBorder.onDragEnd();
    leftBorder.onDragEnd();
    rightBorder.onDragEnd();
    topBorder.onDragEnd();
    app.stage.removeChildren();
    elapsed = 0;
    backgroundScreen = new Block(0, 0, screenWidth, screenHeight, 2, "#ffffff", 'v', "#ffffff");
    bottomBorder = new Border(0, 710, 1300, 10, 2, "#c8c8c8", 'v', "#c8c8c8");
    leftBorder = new Border(0, 0, 10, 720, 2, "#c8c8c8", 'h', "#c8c8c8");
    rightBorder = new Border(1270, 0, 10, 740, 2, "#c8c8c8", 'h', "#c8c8c8");
    topBorder = new Border(0, 0, 1280, 20, 2, "#c8c8c8", 'v', "#010081");
    app.stage.addChild(playerSprite);
    playerSprite.x = screenWidth / 2 - 600;
    playerSprite.y = screenHeight - 30;
    playerSprite.height = 40;
    lost = false;
    playLevel = new Level(currentLevel.toString(), 0);
    levelBlocks = []
    playLevel.generate();
    blocks.push(topBorder, bottomBorder, leftBorder, rightBorder)
    app.stage.addChild(folderSprite)
}
