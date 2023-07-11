let endApp = null;
let endScreenWidth = window.innerWidth;
let endScreenHeight = window.innerHeight;
let finale = new Audio("media/finale.mp3");
let fullTimerBeats = 0;
let startTimer = -9.000;
let timer = 0;
let halfTimerBeats = 0;
let startHalfTimer = -9.000;
let halfTimer = 0;
let quarterTimerBeats = 0;
let startQuarterTimer = -9.000;
let quartertimer = 0;
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

    blocks = [];
    blocks.push(new Block(500, innerHeight/2, 50, 50, 2, "#00FF00", "v", "#00FF00"))

    endApp.stage.addChild(playerSprite)
    finale.play();
    endApp.ticker.add(endGameLoop);
}

function endGameLoop(delta){
    timer = startTimer + finale.currentTime;
    halfTimer = startHalfTimer + finale.currentTime;
    quarterTimer = startQuarterTimer + finale.currentTime;
    playerSprite.xSpeed = 0;
    playerSprite.ySpeed = 0;
    playerSprite.ySpeed -= (keys[38] || keys[87]) * speed;
    playerSprite.ySpeed += (keys[40] || keys[83]) * speed;

    if (timer > 0) {
        fullTimerBeats++;
        startTimer -= 1/(105/60);
        //Main Beats
        if (fullTimerBeats >= 1 && fullTimerBeats <= 13){
            mainBeat();
        }
        if (fullTimerBeats >= 17 && fullTimerBeats <= 32){
            mainBeat();
        }
        if (fullTimerBeats >= 33 && fullTimerBeats <= 67){
            if (fullTimerBeats % 2){
                mainBeat();
            }
            else {
                LoudmainBeat();
            } 
        }
        if (fullTimerBeats >= 69 && fullTimerBeats <= 80){
            mainBeat();
        }
        if (fullTimerBeats >= 97 && fullTimerBeats <= 104){
            mainBeat();
        }
        if (fullTimerBeats >= 113 && fullTimerBeats <= 147){
            if (fullTimerBeats % 2){
                mainBeat();
            }
            else {
                LoudmainBeat();
            } 
        }
        if (fullTimerBeats >= 149 && fullTimerBeats <= 163){
            if (fullTimerBeats % 2){
                mainBeat();
            }
            else {
                LoudmainBeat();
            } 
        }
        if (fullTimerBeats >= 165 && fullTimerBeats <= 177){
            if (fullTimerBeats % 2){
                mainBeat();
            }
            else {
                LoudmainBeat();
            } 
        }
    }
    if (halfTimer > 0) {
        halfTimerBeats++;
        startHalfTimer -= 0.5/(105/60);
    }
    if (quarterTimer > 0) {
        quarterTimerBeats++;
        startQuarterTimer -= 0.25/(105/60);
        //Quarter Main Beat
        if ((quarterTimerBeats - 1)%4 != 1)
        {
            if (quarterTimerBeats >= 1 && quarterTimerBeats <= 48){
                quarterBeat();
            }
            if (quarterTimerBeats >= 65 && quarterTimerBeats <= 266){
                quarterBeat();
            }
            if (quarterTimerBeats >= 273 && quarterTimerBeats <= 321){
                quarterBeat();
            }
            if (quarterTimerBeats >= 449 && quarterTimerBeats <= 466){
                quarterBeat();
            }
            if (quarterTimerBeats >= 482 && quarterTimerBeats <= 498){
                quarterBeat();
            }
            if (quarterTimerBeats >= 514 && quarterTimerBeats <= 530){
                quarterBeat();
            }
            if (quarterTimerBeats >= 546 && quarterTimerBeats <= 562){
                quarterBeat();
            }
            if (quarterTimerBeats >= 578 && quarterTimerBeats <= 586){
                quarterBeat();
            }
            if (quarterTimerBeats >= 594 && quarterTimerBeats <= 610){
                quarterBeat();
            }
            if (quarterTimerBeats >= 626 && quarterTimerBeats <= 642){
                quarterBeat();
            }
            if (quarterTimerBeats >= 658 && quarterTimerBeats <= 674){
                quarterBeat();
            }
            if (quarterTimerBeats >= 690 && quarterTimerBeats <= 705){
                quarterBeat();
            }
        }
        //Special Beat 1 made out of 8 beats
        if (quarterTimerBeats >= 267 && quarterTimerBeats <= 272) {
            S1quarterBeat();
        }
        if (quarterTimerBeats >= 587 && quarterTimerBeats <= 593) {
            S1quarterBeat();
        }
        if (quarterTimerBeats >= 651 && quarterTimerBeats <= 656) {
            S1quarterBeat();
        }
        //Special Beat made out of 14 beats with space in beat 7
        if (quarterTimerBeats != 473 && quarterTimerBeats >= 467 && quarterTimerBeats <= 480) {
            if (quarterTimerBeats < 473)
                S2quarterBeat();
            else
                S1quarterBeat();
        }
        if (quarterTimerBeats != 505 && quarterTimerBeats >= 499 && quarterTimerBeats <= 512) {
            if (quarterTimerBeats < 505)
                S2quarterBeat();
            else
                S1quarterBeat();
        }
        if (quarterTimerBeats != 537 && quarterTimerBeats >= 531 && quarterTimerBeats <= 544) {
            if (quarterTimerBeats < 537)
                S2quarterBeat();
            else
                S1quarterBeat();
        }
        if (quarterTimerBeats != 569 && quarterTimerBeats >= 563 && quarterTimerBeats <= 576) {
            if (quarterTimerBeats < 569)
                S2quarterBeat();
            else
                S1quarterBeat();
        }
        if (quarterTimerBeats != 617 && quarterTimerBeats >= 611 && quarterTimerBeats <= 624) {
            if (quarterTimerBeats < 617)
                S2quarterBeat();
            else
                S1quarterBeat();;
        }
        if (quarterTimerBeats >= 643 && quarterTimerBeats <= 649) {
            S2quarterBeat();
        }
        if (quarterTimerBeats != 681 && quarterTimerBeats >= 675 && quarterTimerBeats <= 688) {
            if (quarterTimerBeats < 681)
                S2quarterBeat();
            else
                S1quarterBeat();
        }
        //Quarter Pre-Drop Beat
        //Low
        if (quarterTimerBeats >= 321 && quarterTimerBeats <= 352) {
            LowquarterBeat();
        }
        //High
        if (quarterTimerBeats >= 353 && quarterTimerBeats <= 400) {
            HighquarterBeat();
        }
        //Highest
        if (quarterTimerBeats >= 401 && quarterTimerBeats <= 433) {
            HighestquarterBeat();
        }
        //Quarter Drop Beat
        if (quarterTimerBeats >= 417 && quarterTimerBeats <= 433) {
            testBeat();
            quarterBeat();
            mainBeat();
        }
        //Quarter Pre-Drop Beat with 1 half then 2 quarters
        if (quarterTimerBeats >= 323 && quarterTimerBeats <= 328) {
            let check = (quarterTimerBeats - 323) % 6;
            if (check == 0) {
                RBeat();
            }
            else if (check == 3) {
                GBeat();
            }
            else if (check == 5) {
                BBeat();
            }
        }
        if (quarterTimerBeats >= 331 && quarterTimerBeats <= 336) {
            let check = (quarterTimerBeats - 331) % 6;
            if (check == 0) {
                RBeat();
            }
            else if (check == 3) {
                GBeat();
            }
            else if (check == 5) {
                BBeat();
            }
        }
        if (quarterTimerBeats >= 339 && quarterTimerBeats <= 344) {
            let check = (quarterTimerBeats - 339) % 6;
            if (check == 0) {
                RBeat();
            }
            else if (check == 3) {
                GBeat();
            }
            else if (check == 5) {
                BBeat();
            }
        }
        if (quarterTimerBeats >= 347 && quarterTimerBeats <= 352) {
            let check = (quarterTimerBeats - 347) % 6;
            if (check == 0) {
                RBeat();
            }
            else if (check == 3) {
                GBeat();
            }
            else if (check == 5) {
                BBeat();
            }
        }
        if (quarterTimerBeats >= 355 && quarterTimerBeats <= 360) {
            let check = (quarterTimerBeats - 355) % 6;
            if (check == 0) {
                RBeat();
            }
            else if (check == 3) {
                GBeat();
            }
            else if (check == 5) {
                BBeat();
            }
        }
        if (quarterTimerBeats >= 363 && quarterTimerBeats <= 368) {
            let check = (quarterTimerBeats - 363) % 6;
            if (check == 0) {
                RBeat();
            }
            else if (check == 3) {
                GBeat();
            }
            else if (check == 5) {
                BBeat();
            }
        }
        if (quarterTimerBeats >= 371 && quarterTimerBeats <= 376) {
            let check = (quarterTimerBeats - 371) % 6;
            if (check == 0) {
                RBeat();
            }
            else if (check == 3) {
                GBeat();
            }
            else if (check == 5) {
                BBeat();
            }
        }
        if (quarterTimerBeats >= 379 && quarterTimerBeats <= 384) {
            let check = (quarterTimerBeats - 379) % 6;
            if (check == 0) {
                RBeat();
            }
            else if (check == 3) {
                GBeat();
            }
            else if (check == 5) {
                BBeat();
            }
        }
        if (quarterTimerBeats == 321) {
            blocks[0].fillColor = "#000000"
            blocks[0].color = "#000000"
        }
    }

    playerSprite.x += playerSprite.xSpeed * delta;
    playerSprite.y += playerSprite.ySpeed * delta;

    blocks.forEach(block => {
        block.drawBlock();
    });
}
function testBeat(){
    playerSprite.tint = "#00FF00"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 50)
}

function mainBeat(){
    endApp.renderer.background.color = "#111111";
    setTimeout(() => {
        endApp.renderer.background.color = "#000000";
    }, 100)
}
function LoudmainBeat(){
    endApp.renderer.background.color = "#222222";
    setTimeout(() => {
        endApp.renderer.background.color = "#000000";
    }, 120)
    playerSprite.tint = "#0000FF"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 120)
}

function quarterBeat(){
    blocks[0].fillColor = "#FFFFFF"
    setTimeout(() => {
        blocks[0].fillColor = "#00FF00";
    }, 70)
}
function RBeat(){
    blocks[0].fillColor = "#FF0000"
}
function GBeat(){
    blocks[0].fillColor = "#00FF00"
}
function BBeat(){
    blocks[0].fillColor = "#0000FF"
}

function S1quarterBeat(){
    playerSprite.tint = "#FF0000"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 70)
}
function S2quarterBeat(){
    playerSprite.tint = "#0000FF"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 70)
}
function LowquarterBeat(){
    playerSprite.tint = "#00FF00"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 70)
}
function HighquarterBeat(){
    playerSprite.tint = "#0000FF"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 70)
}
function HighestquarterBeat(){
    playerSprite.tint = "#FF0000"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 70)
}