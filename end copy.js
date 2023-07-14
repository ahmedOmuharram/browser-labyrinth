function FinaleHardMode(){
    endScreenWidth = window.innerWidth;
    endScreenHeight = window.innerHeight;
    lives = 10;
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
        blocks[0].positionX = endScreenWidth - 70;
        blocks[0].positionY = innerHeight/2-25;
        for (let i = 1; i <= 6; i++) {
            blocks[i].positionX = endScreenWidth - 110;
        }
    }
    window.onblur = function(){
        isFocused = false;
        finale.pause();  
        endApp.ticker.stop();
    }  
    window.onfocus = function(){  
        isFocused = true;
        if (finale.currentTime < 112)
            finale.play();
        endApp.ticker.start();
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
    blocks.push(new Block(endScreenWidth - 70, innerHeight/2-25, 50, 50, 2, "#00FF00", "v", "#00FF00"))
    new Cannon(endScreenWidth - 110, Math.random() * (endScreenHeight - 100) + 50, 30, 30, 2, "#ff0081", "v", "#ff0081", 5, 20, 90, 270);
    new Cannon(endScreenWidth - 110, Math.random() * (endScreenHeight - 100) + 50, 30, 30, 2, "#8100ff", "v", "#8100ff", 5, 20, 90, 270);
    new Cannon(endScreenWidth - 110, Math.random() * (endScreenHeight - 100) + 50, 30, 30, 2, null, "v", null, 20, 30, 90, 270);
    new Cannon(endScreenWidth - 110, Math.random() * (endScreenHeight - 100) + 50, 30, 30, 2, null, "v", null, 40, 50, 90, 270);
    new Cannon(endScreenWidth - 110, Math.random() * (endScreenHeight - 100) + 50, 30, 30, 2, "#00ff81", "v", "#00ff81", 5, 20, 90, 270);
    new Cannon(endScreenWidth - 110, Math.random() * (endScreenHeight - 100) + 50, 30, 30, 2, "#81ff00", "v", "#81ff00", 5, 20, 90, 270);

    endApp.stage.addChild(playerSprite)
    if (isFocused)
        finale.play();
    endApp.ticker.add(endGameLoop);
    if (!isFocused)
        endApp.ticker.stop();
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

    if (playerSprite.x < playerSprite.width/2)
        playerSprite.x = playerSprite.width/2;
    if (playerSprite.x > innerWidth - 245)
        playerSprite.x = innerWidth - 245;
    if (playerSprite.y < playerSprite.height/2)
        playerSprite.y = playerSprite.height/2;
    if (playerSprite.y > innerHeight - playerSprite.height/2)
        playerSprite.y = innerHeight - playerSprite.height/2;

    if ((finale.currentTime/finale.duration * 100) >= 99) {
        finale.pause();
        document.getElementById("canvas").removeChild(endApp.view);
        endApp.destroy();
        document.getElementById("body").style.background = 'url("media/end.gif")';
        document.getElementById("body").style.backgroundSize = "100% 100%";
        document.getElementById("body").style.backgroundRepeat = "no-repeat";
        document.getElementById("body").style.height = "100vh";
        var message = document.createElement("div");
            message.innerText = "You have wiped the user's BIOS.";
            message.style.position = "fixed";
            message.style.top = "50%";
            message.style.left = "50%";
            message.style.transform = "translate(-50%, -50%)";
            message.style.fontSize = "30px";
            message.style.color = "white";
            message.style.textAlign = "center";
            message.style.fontFamily = "Levi Windows";
        setTimeout(() => {        
            document.getElementById("body").style.removeProperty("background");
            document.getElementById("body").style.backgroundColor = "#000000";
        }, 1010); 
        setTimeout(() => {        
            document.body.appendChild(message);
        }, 3000); 
        setTimeout(() => {      
            document.body.removeChild(message);
            message.innerText = "Thanks for playing\nMade by Ahmed Muharram and Youssef Saleh";
            document.body.appendChild(message);
        }, 10000); 
        setTimeout(() => {   
            document.body.removeChild(message);
            restart();
        }, 16000);
    }

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
        blocks[i].positionY = 30.0 * Math.sin((elapsed / 100.0 + i * 2)) + i * 100 + (blocks[0].positionY - 350);
    }
    if (lives < 0) {
        document.getElementById("canvas").removeChild(endApp.view);
        endApp.destroy();
        FinaleHardMode();
    }
}
function testBeat(){
    playerSprite.tint = "#00FF00"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 50)
}

function mainBeat(){
    blocks[0].positionY += 10;
    setTimeout(() => {
        blocks[0].positionY -= 10;
    }, 50)
    blocks[1].shoot(5,20,20,2,"#ff0081","#ff0081",0);
    blocks[2].shoot(5,20,20,2,"#8100ff","#8100ff",0);
    blocks[5].shoot(5,20,20,2,"#00ff81","#00ff81",0);
    blocks[6].shoot(5,20,20,2,"#81ff00","#81ff00",0);
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

    endApp.renderer.background.color = "#111111";
    setTimeout(() => {
        endApp.renderer.background.color = "#000000";
    }, 100)
}
function LoudmainBeat(){
    blocks[1].shoot(3,30,30,2,"#ff0081","#ff0081",0);
    blocks[2].shoot(3,30,30,2,"#8100ff","#8100ff",0);
    blocks[5].shoot(3,30,30,2,"#00ff81","#00ff81",0);
    blocks[6].shoot(3,30,30,2,"#81ff00","#81ff00",0);

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
    let can = quarterTimerBeats % 2 + 1;
    blocks[can].shoot(1, 10, 10, 2, blocks[can].color, blocks[can].fillColor,0)
    blocks[can+4].shoot(1, 10, 10, 2, blocks[can+4].color, blocks[can+4].fillColor,0)
    blocks[can].positionX += 10;
    blocks[can+4].positionX += 10;
    setTimeout(() => {
        blocks[can].positionX -= 10;
        blocks[can+4].positionX -= 10;
    }, 100)
    blocks[0].fillColor = "#FFFFFF"
    setTimeout(() => {
        blocks[0].fillColor = "#00FF00";
    }, 70)
}
function RBeat(){
    let oldMinSpeed = blocks[4].minSpeed;
    let oldMaxSpeed = blocks[4].maxSpeed;
    blocks[4].fillColor = "#ff0000"
    blocks[4].minSpeed = 5;
    blocks[4].maxSpeed = 50;
    let angle = Math.atan2(playerSprite.y - blocks[4].positionY, playerSprite.x - blocks[4].positionX) * (180 / Math.PI)
    blocks[4].minAngle = angle + 15;
    blocks[4].maxAngle = angle + 30;
    blocks[4].shoot(100,20,20,2,"#ff0000","#ff0000",0);
    blocks[4].minAngle = angle - 30;
    blocks[4].maxAngle = angle - 15;
    blocks[4].shoot(100,20,20,2,"#ff0000","#ff0000",0);

    blocks[4].minSpeed = oldMinSpeed;
    blocks[4].maxSpeed = oldMaxSpeed;

    blocks[4].positionX += 10;
    setTimeout(() => {
        blocks[4].positionX -= 10;
    }, 100)

    blocks[0].fillColor = "#FF0000"
}
function GBeat(){
    blocks[4].fillColor = "#00ff00"
    let angle = Math.atan2(playerSprite.y - blocks[4].positionY, playerSprite.x - blocks[4].positionX) * (180 / Math.PI)
    blocks[4].minAngle = angle;
    blocks[4].maxAngle = angle;
    blocks[4].shoot(50,20,20,2,"#00ff00","#00ff00",0);

    blocks[4].positionX += 10;
    setTimeout(() => {
        blocks[4].positionX -= 10;
    }, 100)

    blocks[0].fillColor = "#00FF00"
}
function BBeat(){
    blocks[4].fillColor = "#0000ff"
    let angle = Math.atan2(playerSprite.y - blocks[4].positionY, playerSprite.x - blocks[4].positionX) * (180 / Math.PI)
    blocks[4].minAngle = angle;
    blocks[4].maxAngle = angle;
    blocks[4].shoot(25,20,20,2,"#0000ff","#0000ff",0);

    blocks[4].positionX += 10;
    setTimeout(() => {
        blocks[4].positionX -= 10;
    }, 100)

    blocks[0].fillColor = "#0000FF"
}

function S1quarterBeat(){
    blocks[3].fillColor = "#ff0000"
    blocks[3].minAngle = 90;
    blocks[3].maxAngle = 270;
    blocks[3].shoot(20,20,20,2,"#ff0000","#ff0000",0);

    blocks[3].positionX += 10;
    setTimeout(() => {
        blocks[3].positionX -= 10;
    }, 100)

    playerSprite.tint = "#FF0000"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 70)
}
function S2quarterBeat(){
    let can = quarterTimerBeats % 6 + 1
    let angle = 225 - 90 * blocks[can].positionY/innerHeight;
    let oldColor = blocks[can].color;
    let oldFillColor = blocks[can].fillColor;
    blocks[can].color = "#ff0000";
    blocks[can].fillColor = "#ff0000";
    blocks[can].minAngle = angle;
    blocks[can].maxAngle = angle;
    blocks[can].shoot(20,20,20,2,blocks[can].color,blocks[can].fillColor,0);
    if (can == 1 || can == 2 || can == 5 || can == 6) {
        blocks[can].minAngle = 90;
        blocks[can].maxAngle = 270;
    }

    blocks[can].positionX += 10;
    setTimeout(() => {
        blocks[can].positionX -= 10;
    }, 100)

    playerSprite.tint = "#0000FF"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
        blocks[can].color = oldColor
        blocks[can].fillColor = oldFillColor;
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