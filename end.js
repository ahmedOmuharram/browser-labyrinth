let endApp = null;
let endScreenWidth = window.innerWidth;
let endScreenHeight = window.innerHeight;
let finale = new Audio("media/finale.mp3");
let startTimer = -9.000;
let timer = 0;
let backgroundStartTimer = -9.000;
let backgroundTimer = 0;
function Finale(){
    finale.volume = 0.1;
    elapsed = 0;
    endScreenWidth = window.innerWidth;
    endScreenHeight = window.innerHeight;
    endApp = new PIXI.Application({ 
        antialias: true,
        width: endScreenWidth, 
        height: endScreenHeight,
        backgroundColor: "#000000",
        resolution: 1,
    });
    endApp.resizeTo = window;
    window.onresize = function (event){
        endScreenWidth = window.innerWidth;
        endScreenHeight = window.innerHeight;
    }

    document.getElementById("canvas").appendChild(endApp.view);
    playerSprite.tint = "#ffffff";
    playerSprite.x = 100;
    playerSprite.y = endScreenHeight/2;
    playerSprite.xSpeed = 0;
    playerSprite.ySpeed = 0;
    playerSprite.width = 36;
    playerSprite.height = 40;

    endApp.stage.addChild(playerSprite)
    finale.play();
    endApp.ticker.add(endGameLoop);
}

function endGameLoop(delta){
    timer = startTimer + finale.currentTime;
    backgroundTimer = backgroundStartTimer + finale.currentTime;
    playerSprite.xSpeed = 0;
    playerSprite.ySpeed = 0;
    playerSprite.ySpeed -= (keys[38] || keys[87]) * speed;
    playerSprite.ySpeed += (keys[40] || keys[83]) * speed;

    blocks.forEach(block => {
        block.positionX -= 10;
    });

    if (timer > 0) {
        startTimer -= 1/(105/60);
        testBeat();
    }
    if(backgroundTimer > 0) {
        backgroundStartTimer -= 2/(105/60);
        endApp.renderer.background.color = "#111111";
        setTimeout(() => {
            endApp.renderer.background.color = "#000000";
        }, 100)
    }

    playerSprite.x += playerSprite.xSpeed * delta;
    playerSprite.y += playerSprite.ySpeed * delta;
}
function testBeat(){
    playerSprite.tint = "#00FF00"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 100)
}