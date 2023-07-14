let endApp = null;
let text;
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
let isFocused = true;

function Finale(){
    document.getElementById("body").style.backgroundColor = "#000000";
    endScreenWidth = window.innerWidth;
    endScreenHeight = window.innerHeight;
    lives = 3;
    lost = false;
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
    zeroParticleGenerator = new Particles(zeroTexture, -12, -8, -12, 12, 0, -0.09, 0.09, 0.015, 0.03, 0.1, 0.2, "#00FF00");
    oneParticleGenerator = new Particles(oneTexture, -12, -8, -12, 12, 0, -0.09, 0.09, 0.015, 0.03, 0.1, 0.2, "#00FF00");
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
        blocks[0].height = endScreenHeight;
        for (let i = 1; i <= 6; i++) {
            if (i == 1 || i == 6) {
                blocks[i].positionX = endScreenWidth - 170;
                blocks[i].positionY = (i-1) * (endScreenHeight-100)/5 + 50 - 15;
            } else if (i == 2 || i == 5) {
                blocks[i].positionX = endScreenWidth - 110;
                blocks[i].positionY = (i-1) * (endScreenHeight-100)/5 + 50 - 15;
            } else {
                blocks[i].positionX = endScreenWidth - 200;
                blocks[i].positionY = (i-1) * (endScreenHeight-100)/5 + 50 - 15;
            }
        }

        var a = blocks[3].positionX - (endScreenWidth - 35);
        var b = blocks[3].positionY - (endScreenHeight/2);

        var radius = Math.sqrt(a * a + b * b);

        triangles.children.forEach(triangle => {
            triangle.clear();
            triangle.beginFill("#14CC14");
            triangle.moveTo(-25, (radius + 20));
            triangle.lineTo(25, (radius + 20));
            triangle.lineTo(0, (radius + 20) + 25*Math.sqrt(3));
            triangle.endFill();
            triangle.beginFill("#000000");
            triangle.moveTo(-12.5, (radius + 20));
            triangle.lineTo(12.5, (radius + 20));
            triangle.lineTo(0, (radius + 20) + 12.5*Math.sqrt(3));
            triangle.x = endScreenWidth - 45;
            triangle.y = innerHeight / 2;
        });

        circleGraphic.clear();
        circleGraphic.beginFill("#14CC14");
        circleGraphic.drawCircle(endScreenWidth - 45, innerHeight/2, radius + 10);
        circleGraphic.endFill();
        rectGraphic.clear();
        rectGraphic.beginFill("#000000");
        rectGraphic.drawRect(endScreenWidth - 55, 0, 20, innerHeight);
        rectGraphic.drawRect(endScreenWidth - 25, 0, 10, innerHeight);
        rectGraphic.drawRect(endScreenWidth - 10, 0, 5, innerHeight);
        rectGraphic.endFill();
        rectGraphic.beginFill("#00FF00");
        rectGraphic.drawRect(endScreenWidth - 80, 1 * (endScreenHeight-100)/5 + 50 - 15, 10, 30);
        rectGraphic.drawRect(endScreenWidth - 140, 35, 70, 30);
        rectGraphic.drawRect(endScreenWidth - 80, 4 * (endScreenHeight-100)/5 + 50 - 15, 10, 30);
        rectGraphic.drawRect(endScreenWidth - 140, 5 * (endScreenHeight-100)/5 + 50 - 15, 70, 30);
        rectGraphic.endFill();
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

    triangles = new PIXI.Container();
    triangles.rotationSpeed = 0.01;
    
    for (let i = 0; i < 8; i++) {
        let triangleGraphic = new PIXI.Graphics();
        triangleGraphic.beginFill("#14CC14");
        triangleGraphic.moveTo(-25, 210);
        triangleGraphic.lineTo(25, 210);
        triangleGraphic.lineTo(0, 210 + 25*Math.sqrt(3));
        triangleGraphic.endFill();
        triangleGraphic.beginFill("#000000");
        triangleGraphic.moveTo(-12.5, 210);
        triangleGraphic.lineTo(12.5, 210);
        triangleGraphic.lineTo(0, 210 + 12.5*Math.sqrt(3));
        triangleGraphic.endFill();
        triangleGraphic.pivot.x = 0;
        triangleGraphic.pivot.y = 0;
        triangleGraphic.x = endScreenWidth - 45;
        triangleGraphic.y = innerHeight / 2;
        triangleGraphic.rotation = i * Math.PI/4
        triangles.addChild(triangleGraphic);
    }
    
    
    endApp.stage.addChild(triangles);
    
    circleGraphic = new PIXI.Graphics();
    circleGraphic.beginFill("#14CC14");
    circleGraphic.drawCircle(endScreenWidth - 45, innerHeight/2, 200);
    circleGraphic.endFill();
    endApp.stage.addChild(circleGraphic);
    blocks = [];
    blocks.push(new Block(endScreenWidth - 70, 0, 70, innerHeight, 2, "#14CC14", "v", "#14CC14"));
    rectGraphic = new PIXI.Graphics();
    rectGraphic.beginFill("#000000");
    rectGraphic.drawRect(endScreenWidth - 55, 0, 20, innerHeight);
    rectGraphic.drawRect(endScreenWidth - 25, 0, 10, innerHeight);
    rectGraphic.drawRect(endScreenWidth - 10, 0, 5, innerHeight);
    rectGraphic.endFill();
    endApp.stage.addChild(rectGraphic);
    rectGraphic.beginFill("#00FF00");
    rectGraphic.drawRect(endScreenWidth - 80, 1 * (endScreenHeight-100)/5 + 50 - 15, 10, 30);
    rectGraphic.drawRect(endScreenWidth - 140, 50, 70, 30);
    rectGraphic.drawRect(endScreenWidth - 80, 4 * (endScreenHeight-100)/5 + 50 - 15, 10, 30);
    rectGraphic.drawRect(endScreenWidth - 140, 5 * (endScreenHeight-100)/5 + 50 - 15, 70, 30);
    rectGraphic.endFill();
    new Cannon(endScreenWidth - 170, 50, 30, 30, 2, "#008000", "v", "#008000", 10, 15, 90, 270);
    new Cannon(endScreenWidth - 110, 1 * (endScreenHeight-100)/5 + 50 - 15, 30, 30, 2, "#008000", "v", "#008000", 10, 15, 90, 270);
    new Cannon(endScreenWidth - 200, 2 * (endScreenHeight-100)/5 + 50 - 15, 30, 30, 2, "#FF0000", "v", "#000000", 25, 30, 90, 270);
    new Cannon(endScreenWidth - 200, 3 * (endScreenHeight-100)/5 + 50 - 15, 30, 30, 2, "#0000FF", "v", "#000000", 35, 40, 90, 270);
    new Cannon(endScreenWidth - 110, 4 * (endScreenHeight-100)/5 + 50 - 15, 30, 30, 2, "#008000", "v", "#008000", 10, 15, 90, 270);
    new Cannon(endScreenWidth - 170, 5 * (endScreenHeight-100)/5 + 50 - 15, 30, 30, 2, "#008000", "v", "#008000", 10, 15, 90, 270);
    text = new PIXI.Text("SEARCHING FOR VULNERABILITIES... STATUS: 0% COMPLETED", {
        fontFamily: 'Levi Windows',
        fontSize: 48,
        lineHeight: 28,
        letterSpacing: 0,
        fill: "#00ff00",
        align: "center",
    });
    text.anchor.set(0);
    text.resolution = 1;
    text.x = 10;
    text.y = 10;
    endApp.stage.addChild(text);
    endApp.stage.addChild(playerSprite)
    if (isFocused)
        finale.play();
    endApp.ticker.add(endGameLoop);
}

function endGameLoop(delta){
    triangles.children.forEach(triangle => {
        triangle.rotation += triangles.rotationSpeed;
    });
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
    if ((finale.currentTime/finale.duration * 100) < 49) {
        text.text = `// SEARCHING FOR VULNERABILITIES... STATUS: ${(finale.currentTime/finale.duration * 100).toFixed(2)}% COMPLETED`;
    } else if ((finale.currentTime/finale.duration * 100) < 65){
        text.text = `// ACCESSING USER DATA... STATUS: ${(finale.currentTime/finale.duration * 100).toFixed(2)}% COMPLETED`;
    } else {
        text.text = `// HACK IN PROGRESS... STATUS: ${(finale.currentTime/finale.duration * 100).toFixed(2)}% COMPLETED`;
    }
    if ((finale.currentTime/finale.duration * 100) >= 98) {
        text.style.fill = "#ff0000"
        text.text = "// HACKED"
    }
    if ((finale.currentTime/finale.duration * 100) >= 99) {
        finale.pause();
        document.getElementById("canvas").removeChild(endApp.view);
        endApp.destroy();
        document.getElementById("body").style.background = 'url("media/end.gif")';
        document.getElementById("body").style.backgroundSize = "100% 100%";
        document.getElementById("body").style.backgroundRepeat = "no-repeat";
        document.getElementById("body").style.height = "100vh";
        var message = document.createElement("div");
            message.innerText = "You have successfully corrupted the user's PC.\nBut... was there an alternative?";
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
            // document.getElementById("body").style.backgroundColor = "#008080";
            // document.getElementById("welcome").style.display = "flex";    
        }, 16000); 
    }

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
            HighquarterBeat();
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
                blocks[0].color = "#14CC14"
                blocks[0].fillColor = "#14CC14"
            }
        }
        if (quarterTimerBeats == 448) {
            for (let i = 1; i < 7; i++) {
                if (i != 3) {
                    blocks[i].minAngle = 180;
                    blocks[i].maxAngle = 180;
                    blocks[i].minSpeed = 60;
                    blocks[i].maxSpeed = 70;
                }
            }
        }
    }

    playerSprite.x += playerSprite.xSpeed * delta;
    playerSprite.y += playerSprite.ySpeed * delta;

    if (playerSprite.x < playerSprite.width/2)
        playerSprite.x = playerSprite.width/2;
    if (playerSprite.x > innerWidth - playerSprite.width/2)
        playerSprite.x = innerWidth - playerSprite.width/2;
    if (playerSprite.y < playerSprite.height/2)
        playerSprite.y = playerSprite.height/2;
    if (playerSprite.y > innerHeight - playerSprite.height/2)
        playerSprite.y = innerHeight - playerSprite.height/2;

    blocks.forEach(block => {
        block.drawBlock(delta);
    });
    zeroParticleGenerator.renderParticles(delta);
    oneParticleGenerator.renderParticles(delta);
    for (let i = 7; i < blocks.length; i++) {
        if (isColliding(playerSprite, blocks[i].graphic)) {
            zeroParticleGenerator.minSpeedX = blocks[i].speedX - 2;
            oneParticleGenerator.minSpeedX = blocks[i].speedX - 2;
            zeroParticleGenerator.maxSpeedX = blocks[i].speedX + 2;
            oneParticleGenerator.maxSpeedX = blocks[i].speedX + 2;
            zeroParticleGenerator.minSpeedY = blocks[i].speedY - 2;
            oneParticleGenerator.minSpeedY = blocks[i].speedY - 2;
            zeroParticleGenerator.maxSpeedY = blocks[i].speedY + 2;
            oneParticleGenerator.maxSpeedY = blocks[i].speedY + 2;
            endApp.stage.removeChild(blocks[i].graphic);
            blocks.splice(blocks.indexOf(blocks[i]), 1);
            zeroParticleGenerator.createParticles(Math.random() * 10, playerSprite.x, playerSprite.y);
            oneParticleGenerator.createParticles(Math.random() * 10, playerSprite.x, playerSprite.y);
            endApp.renderer.background.color = "#550000";
            setTimeout(() => {
                endApp.renderer.background.color = "#000000";
            }, 120)
            lives--;
        }
    }
    if (lives < 0 && !lost) {
        lost = true;
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
        blocks[1].shoot(1,20,20,2,"#008000","#008000",0);
        blocks[2].shoot(1,20,20,2,"#008000","#008000",0);
        blocks[5].shoot(1,20,20,2,"#008000","#008000",0);
        blocks[6].shoot(1,20,20,2,"#008000","#008000",0);
        triangles.rotationSpeed = 0.05;
        setTimeout(() => {
            triangles.rotationSpeed = 0.01;
        }, 200);
        for (let i = 1; i < 7; i++) {
            if (i != 3 && i != 4) {
                for (let j = 0; j <= 100; j++) {
                    setTimeout(() => {
                      blocks[i].positionX += Math.sin((j / 100) * Math.PI);       
                    }, j);
                }
                setTimeout(() => {
                    for (let j = 0; j <= 100; j++) {
                        setTimeout(() => {
                          blocks[i].positionX -= Math.sin((j / 100) * Math.PI);       
                        }, j);
                    }
                })
            }
        }
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
        blocks[1].shoot(2,30,30,2,"#008000","#008000",0);
        blocks[2].shoot(2,30,30,2,"#008000","#008000",0);
        blocks[5].shoot(2,30,30,2,"#008000","#008000",0);
        blocks[6].shoot(2,30,30,2,"#008000","#008000",0);
        triangles.rotationSpeed = 0.1;
        setTimeout(() => {
            triangles.rotationSpeed = 0.01;
        }, 200);

        for (let i = 1; i < 7; i++) {
            if (i != 3 && i != 4) {
                for (let j = 0; j <= 100; j++) {
                    setTimeout(() => {
                      blocks[i].positionX += Math.sin((j / 100) * Math.PI);       
                    }, j);
                }
                setTimeout(() => {
                    for (let j = 0; j <= 100; j++) {
                        setTimeout(() => {
                          blocks[i].positionX -= Math.sin((j / 100) * Math.PI);       
                        }, j);
                    }
                })
            }
        }
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
    // let can = quarterTimerBeats % 6 + 1;
    // blocks[can].shoot(1, 10, 10, 2, blocks[can].color, blocks[can].fillColor,0)
    // blocks[can].positionX += 10;
    // setTimeout(() => {
    //     blocks[can].positionX -= 10;
    // }, 100)
    // blocks[0].fillColor = "#FFFFFF"
    // setTimeout(() => {
    //      blocks[0].fillColor = "#85FF85";
    // }, 70)
}
function RBeat(){
    let oldMinSpeed = blocks[4].minSpeed;
    let oldMaxSpeed = blocks[4].maxSpeed;
    blocks[4].color = "#FF0000"
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

    var a = blocks[3].positionX - (endScreenWidth - 35);
    var b = blocks[3].positionY - (endScreenHeight/2);

    var radius = Math.sqrt(a * a + b * b);
    triangles.children.forEach(triangle => {
        triangle.clear();
        triangle.beginFill("#FF0000");
        triangle.moveTo(-25, (radius + 20));
        triangle.lineTo(25, (radius + 20));
        triangle.lineTo(0, (radius + 20) + 25*Math.sqrt(3));
        triangle.endFill();
        triangle.beginFill("#000000");
        triangle.moveTo(-12.5, (radius + 20));
        triangle.lineTo(12.5, (radius + 20));
        triangle.lineTo(0, (radius + 20) + 12.5*Math.sqrt(3));
        triangle.x = endScreenWidth - 45;
        triangle.y = innerHeight / 2;
        setTimeout(() => {
                triangle.clear();
                triangle.beginFill("#14CC14");
                triangle.moveTo(-25, (radius + 20));
                triangle.lineTo(25, (radius + 20));
                triangle.lineTo(0, (radius + 20) + 25*Math.sqrt(3));
                triangle.endFill();
                triangle.beginFill("#000000");
                triangle.moveTo(-12.5, (radius + 20));
                triangle.lineTo(12.5, (radius + 20));
                triangle.lineTo(0, (radius + 20) + 12.5*Math.sqrt(3));
                triangle.x = endScreenWidth - 45;
                triangle.y = innerHeight / 2; 
          }, 200);
    });

    for (let j = 0; j <= 100; j++) {
        setTimeout(() => {
          blocks[4].positionX += Math.sin((j / 100) * Math.PI);       
        }, j);
    }
    setTimeout(() => {
        for (let j = 0; j <= 100; j++) {
            setTimeout(() => {
              blocks[4].positionX -= Math.sin((j / 100) * Math.PI);       
            }, j);
        }
    })

    blocks[0].color = "#FF0000"
    blocks[0].fillColor = "#FF0000"
}
function GBeat(){
    blocks[4].color = "#14CC14"
    blocks[4].fillColor = "#14CC14"
    let angle = Math.atan2(playerSprite.y - blocks[4].positionY, playerSprite.x - blocks[4].positionX) * (180 / Math.PI)
    let line = new PIXI.Graphics().lineStyle(2, "#282828").moveTo(blocks[4].positionX + blocks[4].width/2, blocks[4].positionY + blocks[4].height/2).lineTo(blocks[4].positionX + blocks[4].width/2 + Math.cos(angle / (180 / Math.PI)) * 2203, blocks[4].positionY + blocks[4].height/2 + Math.sin(angle / (180 / Math.PI)) * 2203);
    endApp.stage.addChild(line);
    setTimeout(() => {
        endApp.stage.removeChild(line);
    }, 500)
    blocks[4].minAngle = angle;
    blocks[4].maxAngle = angle;

    blocks[4].shoot(50,20,20,2,"#14CC14","#14CC14",0);

    var a = blocks[3].positionX - (endScreenWidth - 35);
    var b = blocks[3].positionY - (endScreenHeight/2);

    var radius = Math.sqrt(a * a + b * b);
    triangles.children.forEach(triangle => {
        triangle.clear();
        triangle.beginFill("#00FF00");
        triangle.moveTo(-25, (radius + 20));
        triangle.lineTo(25, (radius + 20));
        triangle.lineTo(0, (radius + 20) + 25*Math.sqrt(3));
        triangle.endFill();
        triangle.beginFill("#000000");
        triangle.moveTo(-12.5, (radius + 20));
        triangle.lineTo(12.5, (radius + 20));
        triangle.lineTo(0, (radius + 20) + 12.5*Math.sqrt(3));
        triangle.x = endScreenWidth - 45;
        triangle.y = innerHeight / 2;
        setTimeout(() => {
                triangle.clear();
                triangle.beginFill("#14CC14");
                triangle.moveTo(-25, (radius + 20));
                triangle.lineTo(25, (radius + 20));
                triangle.lineTo(0, (radius + 20) + 25*Math.sqrt(3));
                triangle.endFill();
                triangle.beginFill("#000000");
                triangle.moveTo(-12.5, (radius + 20));
                triangle.lineTo(12.5, (radius + 20));
                triangle.lineTo(0, (radius + 20) + 12.5*Math.sqrt(3));
                triangle.x = endScreenWidth - 45;
                triangle.y = innerHeight / 2; 
          }, 200);
    });

    for (let j = 0; j <= 100; j++) {
        setTimeout(() => {
          blocks[4].positionX += Math.sin((j / 100) * Math.PI);       
        }, j);
    }
    setTimeout(() => {
        for (let j = 0; j <= 100; j++) {
            setTimeout(() => {
              blocks[4].positionX -= Math.sin((j / 100) * Math.PI);       
            }, j);
        }
    })

    blocks[0].color = "#14CC14"
    blocks[0].fillColor = "#14CC14"
}
function BBeat(){
    blocks[4].color = "#0000FF"
    blocks[4].fillColor = "#0000FF"
    let angle = Math.atan2(playerSprite.y - blocks[4].positionY, playerSprite.x - blocks[4].positionX) * (180 / Math.PI)
    let line = new PIXI.Graphics().lineStyle(2, "#282828").moveTo(blocks[4].positionX + blocks[4].width/2, blocks[4].positionY + blocks[4].height/2).lineTo(blocks[4].positionX + blocks[4].width/2 + Math.cos(angle / (180 / Math.PI)) * 2203, blocks[4].positionY + blocks[4].height/2 + Math.sin(angle / (180 / Math.PI)) * 2203);
    endApp.stage.addChild(line);
    setTimeout(() => {
        endApp.stage.removeChild(line);
    }, 500)
    blocks[4].minAngle = angle;
    blocks[4].maxAngle = angle;
    blocks[4].shoot(25,20,20,2,"#0000FF","#0000FF",0);

    var a = blocks[3].positionX - (endScreenWidth - 35);
    var b = blocks[3].positionY - (endScreenHeight/2);

    var radius = Math.sqrt(a * a + b * b);
    triangles.children.forEach(triangle => {
        triangle.clear();
        triangle.beginFill("#0000FF");
        triangle.moveTo(-25, (radius + 20));
        triangle.lineTo(25, (radius + 20));
        triangle.lineTo(0, (radius + 20) + 25*Math.sqrt(3));
        triangle.endFill();
        triangle.beginFill("#000000");
        triangle.moveTo(-12.5, (radius + 20));
        triangle.lineTo(12.5, (radius + 20));
        triangle.lineTo(0, (radius + 20) + 12.5*Math.sqrt(3));
        triangle.x = endScreenWidth - 45;
        triangle.y = innerHeight / 2;
        setTimeout(() => {
                triangle.clear();
                triangle.beginFill("#14CC14");
                triangle.moveTo(-25, (radius + 20));
                triangle.lineTo(25, (radius + 20));
                triangle.lineTo(0, (radius + 20) + 25*Math.sqrt(3));
                triangle.endFill();
                triangle.beginFill("#000000");
                triangle.moveTo(-12.5, (radius + 20));
                triangle.lineTo(12.5, (radius + 20));
                triangle.lineTo(0, (radius + 20) + 12.5*Math.sqrt(3));
                triangle.x = endScreenWidth - 45;
                triangle.y = innerHeight / 2; 
          }, 200);
    });
    for (let j = 0; j <= 100; j++) {
        setTimeout(() => {
          blocks[4].positionX += Math.sin((j / 100) * Math.PI);       
        }, j);
    }
    setTimeout(() => {
        for (let j = 0; j <= 100; j++) {
            setTimeout(() => {
              blocks[4].positionX -= Math.sin((j / 100) * Math.PI);       
            }, j);
        }
    })

    blocks[0].color = "#0000FF"
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

    var a = blocks[3].positionX - (endScreenWidth - 35);
    var b = blocks[3].positionY - (endScreenHeight/2);

    var radius = Math.sqrt(a * a + b * b);
    triangles.children.forEach(triangle => {
        triangle.clear();
        triangle.beginFill("#FF0000");
        triangle.moveTo(-25, (radius + 20));
        triangle.lineTo(25, (radius + 20));
        triangle.lineTo(0, (radius + 20) + 25*Math.sqrt(3));
        triangle.endFill();
        triangle.beginFill("#000000");
        triangle.moveTo(-12.5, (radius + 20));
        triangle.lineTo(12.5, (radius + 20));
        triangle.lineTo(0, (radius + 20) + 12.5*Math.sqrt(3));
        triangle.x = endScreenWidth - 45;
        triangle.y = innerHeight / 2;
        setTimeout(() => {
                triangle.clear();
                triangle.beginFill("#14CC14");
                triangle.moveTo(-25, (radius + 20));
                triangle.lineTo(25, (radius + 20));
                triangle.lineTo(0, (radius + 20) + 25*Math.sqrt(3));
                triangle.endFill();
                triangle.beginFill("#000000");
                triangle.moveTo(-12.5, (radius + 20));
                triangle.lineTo(12.5, (radius + 20));
                triangle.lineTo(0, (radius + 20) + 12.5*Math.sqrt(3));
                triangle.x = endScreenWidth - 45;
                triangle.y = innerHeight / 2; 
          }, 200);
    });
    for (let j = 0; j <= 100; j++) {
        setTimeout(() => {
          blocks[3].positionX += Math.sin((j / 100) * Math.PI);       
        }, j);
    }
    setTimeout(() => {
        for (let j = 0; j <= 100; j++) {
            setTimeout(() => {
              blocks[3].positionX -= Math.sin((j / 100) * Math.PI);       
            }, j);
        }
    })

    playerSprite.tint = "#F4CDDB"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 70)
}
function S2quarterBeat(){
    let can = quarterTimerBeats % 6 + 1
    let angle = Math.atan2(playerSprite.y - blocks[can].positionY, playerSprite.x - blocks[can].positionX) * (180 / Math.PI)
    // let angle = 225 - 90 * blocks[can].positionY/innerHeight;
    let oldColor = blocks[can].color;
    let oldFillColor = blocks[can].fillColor;
    let oldMinSpeed = blocks[can].minSpeed;
    let oldMaxSpeed = blocks[can].maxSpeed;
    let line = new PIXI.Graphics().lineStyle(2, "#282828").moveTo(blocks[can].positionX + blocks[can].width/2, blocks[can].positionY + blocks[can].height/2).lineTo(blocks[can].positionX + blocks[can].width/2 + Math.cos(angle / (180 / Math.PI)) * 2203, blocks[can].positionY + blocks[can].height/2 + Math.sin(angle / (180 / Math.PI)) * 2203);
    endApp.stage.addChild(line);
    setTimeout(() => {
        endApp.stage.removeChild(line);
    }, 800)
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

    var a = blocks[3].positionX - (endScreenWidth - 35);
    var b = blocks[3].positionY - (endScreenHeight/2);

    var radius = Math.sqrt(a * a + b * b);
    triangles.children.forEach(triangle => {
        triangle.clear();
        triangle.beginFill("#FF0000");
        triangle.moveTo(-25, (radius + 20));
        triangle.lineTo(25, (radius + 20));
        triangle.lineTo(0, (radius + 20) + 25*Math.sqrt(3));
        triangle.endFill();
        triangle.beginFill("#000000");
        triangle.moveTo(-12.5, (radius + 20));
        triangle.lineTo(12.5, (radius + 20));
        triangle.lineTo(0, (radius + 20) + 12.5*Math.sqrt(3));
        triangle.x = endScreenWidth - 45;
        triangle.y = innerHeight / 2;
        setTimeout(() => {
                triangle.clear();
                triangle.beginFill("#14CC14");
                triangle.moveTo(-25, (radius + 20));
                triangle.lineTo(25, (radius + 20));
                triangle.lineTo(0, (radius + 20) + 25*Math.sqrt(3));
                triangle.endFill();
                triangle.beginFill("#000000");
                triangle.moveTo(-12.5, (radius + 20));
                triangle.lineTo(12.5, (radius + 20));
                triangle.lineTo(0, (radius + 20) + 12.5*Math.sqrt(3));
                triangle.x = endScreenWidth - 45;
                triangle.y = innerHeight / 2; 
          }, 200);
    });

    for (let j = 0; j <= 100; j++) {
        setTimeout(() => {
          blocks[can].positionX += Math.sin((j / 100) * Math.PI);       
        }, j);
    }
    setTimeout(() => {
        for (let j = 0; j <= 100; j++) {
            setTimeout(() => {
              blocks[can].positionX -= Math.sin((j / 100) * Math.PI);       
            }, j);
        }
    })
    playerSprite.tint = "#C2C2FF"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
        blocks[can].color = oldColor
        blocks[can].fillColor = oldFillColor;
    }, 70)
}
function LowquarterBeat(){
    for (let i = 1; i <= 6; i++) {
        if(i != 3 && i != 4) {
            let angle = 210 - 60 * blocks[i].positionY/innerHeight;
            let oldMinSpeed = blocks[i].minSpeed;
            let oldMaxSpeed = blocks[i].maxSpeed;
            let oldMinAngle = blocks[i].minAngle;
            let oldMaxAngle = blocks[i].maxAngle;
            blocks[i].minAngle = angle;
            blocks[i].maxAngle = angle;
            blocks[i].minSpeed = 5;
            blocks[i].maxSpeed = 5;
            blocks[i].shoot(1,20,20,2,blocks[i].color,blocks[i].fillColor,0);
    
            blocks[i].minSpeed = oldMinSpeed;
            blocks[i].maxSpeed = oldMaxSpeed;
            blocks[i].minAngle = oldMinAngle;
            blocks[i].maxAngle = oldMaxAngle;
            for (let j = 0; j <= 100; j++) {
                setTimeout(() => {
                  blocks[i].positionX += Math.sin((j / 100) * Math.PI);       
                }, j);
            }
            setTimeout(() => {
                for (let j = 0; j <= 100; j++) {
                    setTimeout(() => {
                      blocks[i].positionX -= Math.sin((j / 100) * Math.PI);       
                    }, j);
                }
            })
        }
    }
    playerSprite.tint = "#ADFFBB"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 70)
}
function HighquarterBeat(){
    for (let i = 1; i <= 6; i++) {
        if(i != 3 && i != 4) {
            let angle = 195 - 30 * blocks[i].positionY/innerHeight;
            let oldMinSpeed = blocks[i].minSpeed;
            let oldMaxSpeed = blocks[i].maxSpeed;
            let oldMinAngle = blocks[i].minAngle;
            let oldMaxAngle = blocks[i].maxAngle;
            blocks[i].minAngle = angle;
            blocks[i].maxAngle = angle;
            blocks[i].minSpeed = 20;
            blocks[i].maxSpeed = 20;
            blocks[i].shoot(1,20,20,2,blocks[i].color,blocks[i].fillColor,0);
    
            blocks[i].minSpeed = oldMinSpeed;
            blocks[i].maxSpeed = oldMaxSpeed;
            blocks[i].minAngle = oldMinAngle;
            blocks[i].maxAngle = oldMaxAngle;
            for (let j = 0; j <= 100; j++) {
                setTimeout(() => {
                  blocks[i].positionX += Math.sin((j / 100) * Math.PI);       
                }, j);
            }
            setTimeout(() => {
                for (let j = 0; j <= 100; j++) {
                    setTimeout(() => {
                      blocks[i].positionX -= Math.sin((j / 100) * Math.PI);       
                    }, j);
                }
            })
        }
    }
    playerSprite.tint = "#C2C2FF"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 70)
}
function HighestquarterBeat(){
    for (let i = 1; i <= 6; i++) {
        if(i != 3 && i != 4 ){
            let angle = 200 - 40 * blocks[i].positionY/innerHeight;
            let oldMinSpeed = blocks[i].minSpeed;
            let oldMaxSpeed = blocks[i].maxSpeed;
            let oldMinAngle = blocks[i].minAngle;
            let oldMaxAngle = blocks[i].maxAngle;
            blocks[i].minAngle = angle;
            blocks[i].maxAngle = angle;
            blocks[i].minSpeed = 30;
            blocks[i].maxSpeed = 30;
            blocks[i].shoot(1,20,20,2,blocks[i].color,blocks[i].fillColor,0);
    
            blocks[i].minSpeed = oldMinSpeed;
            blocks[i].maxSpeed = oldMaxSpeed;
            blocks[i].minAngle = oldMinAngle;
            blocks[i].maxAngle = oldMaxAngle;
            for (let j = 0; j <= 100; j++) {
                setTimeout(() => {
                  blocks[i].positionX += Math.sin((j / 100) * Math.PI);       
                }, j);
            }
            setTimeout(() => {
                for (let j = 0; j <= 100; j++) {
                    setTimeout(() => {
                      blocks[i].positionX -= Math.sin((j / 100) * Math.PI);       
                    }, j);
                }
            })
        }
    }
    playerSprite.tint = "#F4CDDB"
    setTimeout(() => {
        playerSprite.tint = "#FFFFFF"
    }, 70)
}