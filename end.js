let endApp = null;
let endScreenWidth = window.innerWidth;
let endScreenHeight = window.innerHeight;
let lives = 3;
let finale = new Audio("media/finale.mp3");
let fullTimerBeats = 0;
let startTimer = -9.000;
let timer = 0;
let halfTimerBeats = 0;
let startHalfTimer = -9.000;
let halfTimer = 0;
let quarterTimerBeats = 0;
let startQuarterTimer = -9.000;
let quarterTimer = 0;

function Finale(){
    endScreenWidth = window.innerWidth;
    endScreenHeight = window.innerHeight;
    lives = 3;
    finale.currentTime = 0;
    fullTimerBeats = 0;
    startTimer = -9.000;
    timer = 0;
    halfTimerBeats = 0;
    startHalfTimer = -9.000;
    halfTimer = 0;
    quarterTimerBeats = 0;
    startQuarterTimer = -9.000;
    quarterTimer = 0;
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
    playerSprite.x = endScreenWidth/2;
    playerSprite.y = endScreenHeight/2;
    playerSprite.xSpeed = 0;
    playerSprite.ySpeed = 0;
    playerSprite.width = 36;
    playerSprite.height = 40;

    blocks = [];
    blocks.push(new Block(1850, 0, 50, innerHeight, 2, "#14CC14", "v", "#14CC14"))
    new Cannon(endScreenWidth - 110, Math.random() * (endScreenHeight - 100) + 50, 30, 30, 2, "#008000", "v", "#008000", 10, 15, 90, 270);
    new Cannon(endScreenWidth - 110, Math.random() * (endScreenHeight - 100) + 50, 30, 30, 2, "#008000", "v", "#008000", 10, 15, 90, 270);
    new Cannon(endScreenWidth - 110, Math.random() * (endScreenHeight - 100) + 50, 30, 30, 2, "#FF0000", "v", "#000000", 25, 30, 90, 270);
    new Cannon(endScreenWidth - 110, Math.random() * (endScreenHeight - 100) + 50, 30, 30, 2, "#0000FF", "v", "#000000", 35, 40, 90, 270);
    new Cannon(endScreenWidth - 110, Math.random() * (endScreenHeight - 100) + 50, 30, 30, 2, "#008000", "v", "#008000", 10, 15, 90, 270);
    new Cannon(endScreenWidth - 110, Math.random() * (endScreenHeight - 100) + 50, 30, 30, 2, "#008000", "v", "#008000", 10, 15, 90, 270);

    endApp.stage.addChild(playerSprite)
    finale.play();
    endApp.ticker.add(endGameLoop);
}

function endGameLoop(delta){
    elapsed += delta;
    timer = startTimer + finale.currentTime;
    halfTimer = startHalfTimer + finale.currentTime;
    quarterTimer = startQuarterTimer + finale.currentTime;
    playerSprite.xSpeed = 0;
    playerSprite.ySpeed = 0;
    playerSprite.xSpeed -= (keys[37] || keys[65]) * speed;
    playerSprite.xSpeed += (keys[39] || keys[68]) * speed;
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
            if (fullTimerBeats % 2){
                mainBeat();
            }
            else {
                LoudmainBeat();
            } 
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
        //Special Beat 1 made out of 6 beats
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
                S1quarterBeat();
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
                blocks[0].fillColor = "#14CC14"
            }
        }
        if (quarterTimerBeats == 321) {
            blocks[0].fillColor = "#000000"
            blocks[0].color = "#000000"
        }
        if (quarterTimerBeats == 448) {
            blocks[1].minAngle = 180;
            blocks[1].maxAngle = 180;
            blocks[1].minSpeed = 60;
            blocks[1].maxSpeed = 70;
            blocks[2].minAngle = 180;
            blocks[2].maxAngle = 180;
            blocks[2].minSpeed = 60;
            blocks[2].maxSpeed = 70;
            blocks[4].minAngle = 180;
            blocks[4].maxAngle = 180;
            blocks[4].minSpeed = 60;
            blocks[4].maxSpeed = 70;
            blocks[5].minAngle = 180;
            blocks[5].maxAngle = 180;
            blocks[5].minSpeed = 60;
            blocks[5].maxSpeed = 70;
            blocks[6].minAngle = 180;
            blocks[6].maxAngle = 180;
            blocks[6].minSpeed = 60;
            blocks[6].maxSpeed = 70;
        }
    }

    playerSprite.x += playerSprite.xSpeed * delta;
    playerSprite.y += playerSprite.ySpeed * delta;

    blocks.forEach(block => {
        block.drawBlock(delta);
    });
    for (let i = 7; i < blocks.length; i++) {
        if (isColliding(playerSprite, blocks[i].graphic)) {
            endApp.stage.removeChild(blocks[i].graphic);
            blocks.splice(blocks.indexOf(blocks[i]), 1);
            endApp.renderer.background.color = "#550000";
            setTimeout(() => {
                endApp.renderer.background.color = "#000000";
            }, 120)
            lives--;
        }
    }
    for (let i = 1; i <= 6; i++) {
        blocks[i].positionY = 30.0 * Math.sin((elapsed / 100.0 + i * 2)) + i * 100 + (innerHeight/2 - 25 - 350);
    }
    if (lives < 0) {
        playerSprite.height = 0;
        quarterTimerBeats = 9000;
        finale.pause();
        setTimeout(() => {
            document.getElementById("canvas").removeChild(endApp.view);
            endApp.destroy();
            Finale();
        }, 2000);
    }
}
function testBeat(){
    playerSprite.tint = "#ADFFBB"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 50)
}

function mainBeat(){
    if (!((quarterTimerBeats >= 267 && quarterTimerBeats <= 272) || (quarterTimerBeats >= 587 && quarterTimerBeats <= 593) || 
        (quarterTimerBeats >= 651 && quarterTimerBeats <= 656) || (quarterTimerBeats >= 467 && quarterTimerBeats <= 480) || 
        (quarterTimerBeats >= 499 && quarterTimerBeats <= 512) || (quarterTimerBeats >= 531 && quarterTimerBeats <= 544) || 
        (quarterTimerBeats >= 563 && quarterTimerBeats <= 576) || (quarterTimerBeats >= 611 && quarterTimerBeats <= 624) || 
        (quarterTimerBeats >= 643 && quarterTimerBeats <= 649) || (quarterTimerBeats >= 675 && quarterTimerBeats <= 688))) {
        blocks[0].positionY += 10;
        setTimeout(() => {
            blocks[0].positionY -= 10;
        }, 50)
        console.log(blocks[1].minSpeed + " " + blocks[1].maxSpeed);
        blocks[1].shoot(1,20,20,2,"#008000","#008000",0);
        blocks[2].shoot(1,20,20,2,"#008000","#008000",0);
        blocks[5].shoot(1,20,20,2,"#008000","#008000",0);
        blocks[6].shoot(1,20,20,2,"#008000","#008000",0);
        blocks[1].positionX += 10;
        blocks[2].positionX += 10;
        blocks[5].positionX += 10;
        blocks[6].positionX += 10;
        setTimeout(() => {
            blocks[1].positionX -= 10;
            blocks[2].positionX -= 10;
            blocks[5].positionX -= 10;
            blocks[6].positionX -= 10;
        }, 100)
    }

    endApp.renderer.background.color = "#0A0A0A";
    setTimeout(() => {
        endApp.renderer.background.color = "#000000";
    }, 100)
}
function LoudmainBeat(){
    if (!((quarterTimerBeats >= 267 && quarterTimerBeats <= 272) || (quarterTimerBeats >= 587 && quarterTimerBeats <= 593) || 
        (quarterTimerBeats >= 651 && quarterTimerBeats <= 656) || (quarterTimerBeats >= 467 && quarterTimerBeats <= 480) || 
        (quarterTimerBeats >= 499 && quarterTimerBeats <= 512) || (quarterTimerBeats >= 531 && quarterTimerBeats <= 544) || 
        (quarterTimerBeats >= 563 && quarterTimerBeats <= 576) || (quarterTimerBeats >= 611 && quarterTimerBeats <= 624) || 
        (quarterTimerBeats >= 643 && quarterTimerBeats <= 649) || (quarterTimerBeats >= 675 && quarterTimerBeats <= 688)))  {
        console.log(blocks[1].minSpeed + " " + blocks[1].maxSpeed);
        blocks[1].shoot(2,30,30,2,"#008000","#008000",0);
        blocks[2].shoot(2,30,30,2,"#008000","#008000",0);
        blocks[5].shoot(2,30,30,2,"#008000","#008000",0);
        blocks[6].shoot(2,30,30,2,"#008000","#008000",0);

        blocks[1].positionX += 10;
        blocks[2].positionX += 10;
        blocks[5].positionX += 10;
        blocks[6].positionX += 10;
        setTimeout(() => {
            blocks[1].positionX -= 10;
            blocks[2].positionX -= 10;
            blocks[5].positionX -= 10;
            blocks[6].positionX -= 10;
    }, 100)
    }
    endApp.renderer.background.color = "#141414";
    setTimeout(() => {
        endApp.renderer.background.color = "#000000";
    }, 120)
    playerSprite.tint = "#C2C2FF"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 120)
}

function quarterBeat(){
    // let can = quarterTimerBeats % 2 + 1;
    // blocks[can].shoot(1, 10, 10, 2, blocks[can].color, blocks[can].fillColor,0)
    // blocks[can+4].shoot(1, 10, 10, 2, blocks[can+4].color, blocks[can+4].fillColor,0)
    // blocks[can].positionX += 10;
    // blocks[can+4].positionX += 10;
    // setTimeout(() => {
    //     blocks[can].positionX -= 10;
    //     blocks[can+4].positionX -= 10;
    // }, 100)
    // blocks[0].fillColor = "#FFFFFF"
    // setTimeout(() => {
    //     blocks[0].fillColor = "#85FF85";
    // }, 70)
}
function RBeat(){
    let oldMinSpeed = blocks[4].minSpeed;
    let oldMaxSpeed = blocks[4].maxSpeed;
    blocks[4].fillColor = "#FF0000"
    blocks[4].minSpeed = 5;
    blocks[4].maxSpeed = 50;
    let angle = Math.atan2(playerSprite.y - blocks[4].positionY, playerSprite.x - blocks[4].positionX) * (180 / Math.PI)
    blocks[4].minAngle = angle + 15;
    blocks[4].maxAngle = angle + 30;
    blocks[4].shoot(100,20,20,2,"#FF0000","#FF0000",0);
    blocks[4].minAngle = angle - 30;
    blocks[4].maxAngle = angle - 15;
    blocks[4].shoot(100,20,20,2,"#FF0000","#FF0000",0);

    blocks[4].minSpeed = oldMinSpeed;
    blocks[4].maxSpeed = oldMaxSpeed;

    blocks[4].positionX += 10;
    setTimeout(() => {
        blocks[4].positionX -= 10;
    }, 100)

    blocks[0].fillColor = "#FF0000"
}
function GBeat(){
    blocks[4].fillColor = "#14CC14"
    let angle = Math.atan2(playerSprite.y - blocks[4].positionY, playerSprite.x - blocks[4].positionX) * (180 / Math.PI)
    blocks[4].minAngle = angle;
    blocks[4].maxAngle = angle;

    blocks[4].shoot(50,20,20,2,"#14CC14","#14CC14",0);

    blocks[4].positionX += 10;
    setTimeout(() => {
        blocks[4].positionX -= 10;
    }, 100)

    blocks[0].fillColor = "#14CC14"
}
function BBeat(){
    blocks[4].fillColor = "#0000FF"
    let angle = Math.atan2(playerSprite.y - blocks[4].positionY, playerSprite.x - blocks[4].positionX) * (180 / Math.PI)
    blocks[4].minAngle = angle;
    blocks[4].maxAngle = angle;
    blocks[4].shoot(25,20,20,2,"#0000FF","#0000FF",0);
    blocks[4].positionX += 10;
    setTimeout(() => {
        blocks[4].positionX -= 10;
    }, 100)

    blocks[0].fillColor = "#0000FF"
}

function S1quarterBeat(){
    blocks[3].fillColor = "#FF0000"
    blocks[3].minAngle = 90;
    blocks[3].maxAngle = 270;
    blocks[3].minSpeed = 20;
    blocks[3].maxSpeed = 25;
    blocks[3].shoot(10,20,20,2,"#FF0000","#FF0000",0);
    blocks[3].minSpeed = 25;
    blocks[3].maxSpeed = 30;
    blocks[3].positionX += 10;
    setTimeout(() => {
        blocks[3].positionX -= 10;
    }, 100)

    playerSprite.tint = "#F4CDDB"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 70)
}
function S2quarterBeat(){
    let can = quarterTimerBeats % 6 + 1
    let angle = 225 - 90 * blocks[can].positionY/innerHeight;
    let oldColor = blocks[can].color;
    let oldFillColor = blocks[can].fillColor;
    let oldMinSpeed = blocks[can].minSpeed;
    let oldMaxSpeed = blocks[can].maxSpeed;
    blocks[can].color = "#FF0000";
    blocks[can].fillColor = "#FF0000";
    blocks[can].minAngle = angle;
    blocks[can].maxAngle = angle;
    blocks[can].minSpeed = 25;
    blocks[can].maxSpeed = 30;
    blocks[can].shoot(20,20,20,2,blocks[can].color,blocks[can].fillColor,0);
    if (can == 1 || can == 2 || can == 5 || can == 6) {
        blocks[can].minAngle = 180;
        blocks[can].maxAngle = 180;
    }
    blocks[can].minSpeed = oldMinSpeed;
    blocks[can].maxSpeed = oldMaxSpeed;

    blocks[can].positionX += 10;
    setTimeout(() => {
        blocks[can].positionX -= 10;
    }, 100)

    playerSprite.tint = "#C2C2FF"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
        blocks[can].color = oldColor
        blocks[can].fillColor = oldFillColor;
    }, 70)
}
function LowquarterBeat(){
    playerSprite.tint = "#ADFFBB"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 70)
}
function HighquarterBeat(){
    playerSprite.tint = "#C2C2FF"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 70)
}
function HighestquarterBeat(){
    playerSprite.tint = "#F4CDDB"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 70)
}