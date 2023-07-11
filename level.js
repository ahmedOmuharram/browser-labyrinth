var cannon;
let lostAfterCrash;
let cannonNumber = 0;
let cannonAudio = new Audio("media/cannon.ogg");
let errorAudio = new Audio("media/error.ogg");
cannonAudio.loop = false;
cannonAudio.volume = 0.4;
errorAudio.loop = false;
errorAudio.volume = 0.7;

class Level{
    constructor(name, index) {
        this.name = name;
        this.index = index;
        this.blocks = [];
        this.characteristics = [];
    }

    addBlock(x, y, width, height, thickness, color, fillColor, borders) {
        let block = new Block(x, y, width, height, thickness, color, 'v', fillColor);
        this.blocks.push(block);
        blocks.push(block);
        for (let i = 0; i < borders.length; i++) {
            switch (borders[i]) {
                case 't':    
                    topBorder.blocks.push(block);
                    break;

                case 'b':    
                    bottomBorder.blocks.push(block);
                    break;

                case 'l':
                    leftBorder.blocks.push(block);  
                    break;

                case 'r':
                    rightBorder.blocks.push(block);   
                    break;     
            }
        }
        return block
    }

    generate() {
        blocks = []
        fetch('levelData.json')
        .then(response => response.json())
        .then(data => {
            var levelName = this.name;
            var jsonData = Array.isArray(data) ? data : [data];
            jsonData.forEach(obj => {
                console.log(obj)
                obj[levelName].forEach(block => {
                    var x = eval(block.x);
                    var y = eval(block.y);
                    var width = eval(block.width);
                    var height = eval(block.height);
                    block = this.addBlock(x, y, width, height, block.thickness, block.color, block.fillColor, block.borders);
                    levelBlocks.push(block);
                    this.blocks.push(block);       
                });
            });
            if (currentLevel == 9 || currentLevel == 10)
                eval(`playLevel.InitiateLevel${currentLevel}();`);
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    Level0(delta){
        if (animationStarted)
            elapsed += delta;
        if (elapsed > 50)
            elapsed = 50;
        bottomBorder.positionY = 20 + Math.sin(elapsed/(100/Math.PI)) * 690;
        rightBorder.positionX = 10 + Math.sin(elapsed/(100/Math.PI)) * 1260;
        if (elapsed >= 50) {
            setLevel(1);
            mainMusic.play();
        }
    }

    Level1(delta){

    }

    Level2(delta){
        
    }

    Level3(delta){
        for (let i = 0; i < 6; i++) {
            if (levelBlocks[i]) {
                levelBlocks[i].positionX += 5 * delta;
            }
        }
        for (let i = 6; i < 12; i++) {
            if (levelBlocks[i]) {
                levelBlocks[i].positionX -= 5 * delta;
            }
        }
    }

    Level4(delta){
        elapsed += delta;
        for (let i = 0; i < 52; i++) {
            if (levelBlocks[i]) {
                if (i < 16) {
                    levelBlocks[i].positionX = i * 20.0 * Math.cos((elapsed * i/100.0))
                    levelBlocks[i].positionY = i * 20.0 * Math.sin((elapsed * i/100.0))
                } else if (i < 32) {
                    levelBlocks[i].positionX = screenWidth + (i - 16) * 20.0 * Math.cos((elapsed * (i - 16)/100.0))
                    levelBlocks[i].positionY = screenHeight + (i - 16) * 20.0 * Math.sin((elapsed * (i - 16)/100.0))
                } else if (i < 52) {
                    levelBlocks[i].positionX = screenWidth/2 + (i - 32) * 12.0 * Math.cos((elapsed * (i - 32)/100.0))
                    levelBlocks[i].positionY = screenHeight/2 + (i - 32) * 12.0 * Math.sin((elapsed * (i - 32)/100.0))
                }
            } 
        }
        if (isColliding(playerSprite, rightBorder.graphic)) {
            isOnGround = false;
        }
        leftBorder.graphic.interactive = false;
        bottomBorder.graphic.interactive = false;
    }

    Level5(delta){

    }

    Level6(delta){
        for (let i = 0; i < 7; i++) {
            if (levelBlocks[i]) {
                if (i == 0) {
                    elapsed += delta;
                    levelBlocks[i].positionY = Math.sin(elapsed/50.0) * 400.0 + Math.cos(elapsed/14.0) * 0.8;
                    levelBlocks[i].positionX = Math.cos(elapsed/50.0) * 400.0 + Math.sin(elapsed/14.0) * 0.8 + screenWidth/2 - 200;
                } else if (i % 2 == 0) {
                    levelBlocks[i].height = Math.min(5 * leftBorder.height, 3 * bottomBorder.width/4) - 20;
                } else {
                    levelBlocks[i].positionY = - Math.min(leftBorder.height, 2.5 * bottomBorder.width/4) + 30 + bottomBorder.positionY - topBorder.positionY
                    levelBlocks[i].height = Math.min(5 * leftBorder.height, 2.8 * bottomBorder.width/4) - 20;
                }
            }
        }
    }

    Level7(delta){
        if (levelBlocks[4]) {
            levelBlocks[4].positionX = Math.max(playerSprite.x - 100, 400)
        }
        if (levelBlocks[10]) {
            if (playerSprite.y > 100)
                levelBlocks[10].positionX += 0.2 * delta;
            else
                levelBlocks[10].positionX += 3.5 * delta;
        }
    }

    Level8(delta){
        if (levelBlocks[0]) {
            levelBlocks[0].positionY = Math.max(playerSprite.y + 10, 0)
            levelBlocks[0].positionX = Math.max(playerSprite.x - 100, 400)
        }

        if (levelBlocks[1]) {
            levelBlocks[1].positionY = Math.min(playerSprite.y - 100, 100)
            levelBlocks[1].positionX = Math.min(playerSprite.x + 100, 1200)
            if (levelBlocks[1].height > leftBorder.height){
                levelBlocks[1].height = leftBorder.height
            }
        }

        if (levelBlocks[2]) {
            levelBlocks[2].positionX = Math.min(playerSprite.x + 100, 1000)
        }

        if (levelBlocks[4]) {
            levelBlocks[4].positionY -= 0.7 * delta;
        }
    }

    InitiateLevel9(){
        cannon = new Cannon(630, 350, 20, 20, 2, "#ff0081", "v", "#ff0081", 10, 20, -90, 90);
        cannonInterval = 0;
        spinDirection = 1;
    }
    Level9(delta){
        if (elapsed > 200) {
            spinDirection = -1; 
            document.getElementById("body").style.backgroundColor = "#0000ff";
            document.getElementById("top-text").innerText = "STOP: c000021a {Fatal System Error}";
            document.getElementById("top-text").style.textShadow = "5px 5px #0000ff";
            document.getElementsByClassName("taskbar")[0].style.display = "none";
            document.getElementById("grid-container").style.display = "none";
            document.getElementById("grid-container-bottom").style.display = "none";
            backgroundScreen.fillColor = "#0000ff";
            document.getElementById("top-text").style.color = "#c8c8c8";
            for (let i = 0; i < levelBlocks.length; i++) { 
                levelBlocks[i].color = "#0000ff";
            }
            cannonAudio.volume = 0;
            errorAudio.play(); 
            mainMusic.pause();
            cannon.color = "#0000ff";
            cannon.fillColor = "#0000ff";
            zeroParticleGenerator.color = "#c8c8c8";
            oneParticleGenerator.color = "#c8c8c8";
            app.renderer.backgroundColor = "#0000ff";
            lostAfterCrash = true;
            folderSprite.texture = PIXI.Texture.from('media/ram.png')
            folderSprite.positionY += 10
        }
        errorAudio.addEventListener('ended', () => cannonAudio.volume = 0.4);
        elapsed += spinDirection * delta;
        cannonInterval += delta;
        for (let i = 0; i < 64; i++) {
            if (levelBlocks[i+4]) {
                var spiralIndex = Math.floor(i / 16);
                var rotationAngle = spiralIndex * (Math.PI / 2);
                
                var basePositionX = (i % 16) * -50.0 * Math.cos((elapsed / 100.0));
                var basePositionY = (i % 16) * 50.0 * Math.sin((elapsed / 100.0));
                
                var rotatedPositionX = basePositionX * Math.cos(rotationAngle) - basePositionY * Math.sin(rotationAngle);
                var rotatedPositionY = basePositionX * Math.sin(rotationAngle) + basePositionY * Math.cos(rotationAngle);

                levelBlocks[i+4].positionX = rotatedPositionX + screenWidth/2 - 25;
                levelBlocks[i+4].positionY = rotatedPositionY + screenHeight/2 - 25;
            }
            
        }
        if (cannonInterval > 100) {
            if (levelBlocks[68]) {
                let angle = Math.atan2(playerSprite.y - levelBlocks[68].positionY, playerSprite.x - levelBlocks[68].positionX) * (180 / Math.PI)
                levelBlocks[68].minAngle = angle-22.5;
                levelBlocks[68].maxAngle = angle+22.5;
                if (spinDirection == 1 && elapsed < 199) {
                    levelBlocks[68].shoot(100,20,20,2,"#ff0081","#ff0081",0);
                    cannonAudio.play();
                } else {
                    levelBlocks[68].shoot(100,20,20,2,"#c8c8c8","#c8c8c8",0);
                    cannonAudio.play();
                    setTimeout(() => {
                        levelBlocks[68].positionX += 2;
                        levelBlocks[68].color = "#ff0000";
                        levelBlocks[68].fillColor = "#ff0000";
                    }, 50);
                    setTimeout(() => {
                        levelBlocks[68].positionY += 2;
                        levelBlocks[68].color = "#00ff00";
                        levelBlocks[68].fillColor = "#00ff00";
                    }, 100);
                    setTimeout(() => {
                        levelBlocks[68].positionX += 1;
                        levelBlocks[68].positionY += 1;
                        levelBlocks[68].color = "#0000ff";
                        levelBlocks[68].fillColor = "#0000ff";
                    }, 150);
                    setTimeout(() => {
                        levelBlocks[68].positionY -= 3;
                        levelBlocks[68].color = "#ff0000";
                        levelBlocks[68].fillColor = "#ff0000";
                    }, 200);
                    setTimeout(() => {
                        levelBlocks[68].positionX -= 3;
                        levelBlocks[68].color = "#0000ff";
                        levelBlocks[68].fillColor = "#0000ff";
                    }, 250);
                }
            }
            cannonInterval -= 100;
        }
    }

    InitiateLevel10(){
        new Cannon(screenWidth/2, 0, 20, 60, 2, "#c8c8c8", "v", "#c8c8c8", 15, 20, -90, 90);
        new Cannon(screenWidth/2, screenHeight - 60, 20, 60, 2, "#c8c8c8", "v", "#c8c8c8", 15, 20, -90, 90);
        new Cannon(0, screenHeight/2, 60, 20, 2, "#c8c8c8", "v", "#c8c8c8", 15, 20, -90, 90);
        new Cannon(screenWidth - 60, screenHeight/2, 60, 20, 2, "#c8c8c8", "v", "#c8c8c8", 15, 20, -90, 90);
        cannonInterval = 0;
    }

    Level10(delta){
        folderSprite.height = 0;
        backgroundScreen.color = "#000000";
        backgroundScreen.fillColor = "#000000";
        topBorder.color = "#00ff00"; 
        topBorder.fillColor = "#00ff00";
        bottomBorder.color = "#005a00"
        bottomBorder.fillColor = "#005a00";
        leftBorder.color = "#005a00";
        leftBorder.fillColor = "#005a00";
        rightBorder.color = "#005a00";
        rightBorder.fillColor = "#005a00";
        document.getElementsByClassName("taskbar")[0].style.display = "none";
        document.getElementById("top-text").style.color = "#00ff00";
        document.getElementById("top-text").innerText = "MEMORY_MANAGEMENT";
        playerSprite.tint = "#00ff00";
        folderSprite.tint = "#00ff00";
        document.getElementById("body").style.removeProperty("background-color")
        document.getElementById("body").style.backgroundImage = 'url("media/moving-glitch.gif")';
        document.getElementById("body").style.backgroundRepeat = "no-repeat";
        document.getElementById("body").style.backgroundSize = "cover";
        document.getElementById("grid-container").style.display = "none";
        document.getElementById("grid-container-bottom").style.display = "none";
        app.renderer.backgroundColor = "#000000";

        if (topBorder.rechanging) {
            document.getElementById("main").style.borderTop = "5px dashed #000000";
        } else {
            document.getElementById("main").style.borderTopColor = "#ff0000";
        }
        if (bottomBorder.rechanging) {
            document.getElementById("main").style.borderBottom = "5px dashed #000000";
        } else {
            document.getElementById("main").style.borderBottomColor = "#ff0000";
        }
        if (leftBorder.rechanging) {
            document.getElementById("main").style.borderLeft = "5px dashed #000000";
        } else {
            document.getElementById("main").style.borderLeftColor = "#ff0000";
        }
        if (rightBorder.rechanging) {
            document.getElementById("main").style.borderRight = "5px dashed #000000";
        } else {
            document.getElementById("main").style.borderRightColor = "#ff0000";
        }    

        bottomBorder.graphic.interactive = false;
        topBorder.graphic.interactive = false;
        leftBorder.graphic.interactive = false;
        rightBorder.graphic.interactive = false;

        elapsed += delta; 
        cannonInterval += delta;
        if (cannonInterval > 50) {
            setTimeout(() => {
                levelBlocks[cannonNumber].positionX += 2;
                levelBlocks[cannonNumber].color = "#ff0000";
                levelBlocks[cannonNumber].fillColor = "#ff0000";
            }, 50);
            setTimeout(() => {
                levelBlocks[cannonNumber].positionY += 2;
                levelBlocks[cannonNumber].color = "#00ff00";
                levelBlocks[cannonNumber].fillColor = "#00ff00";
            }, 100);
            setTimeout(() => {
                levelBlocks[cannonNumber].positionX += 1;
                levelBlocks[cannonNumber].positionY += 1;
                levelBlocks[cannonNumber].color = "#0000ff";
                levelBlocks[cannonNumber].fillColor = "#0000ff";
            }, 150);
            setTimeout(() => {
                levelBlocks[cannonNumber].positionY -= 3;
                levelBlocks[cannonNumber].color = "#ff0000";
                levelBlocks[cannonNumber].fillColor = "#ff0000";
            }, 200);
            setTimeout(() => {
                levelBlocks[cannonNumber].positionX -= 3;
                levelBlocks[cannonNumber].color = "#c8c8c8";
                levelBlocks[cannonNumber].fillColor = "#c8c8c8";
                if (levelBlocks[cannonNumber]) {
                    let angle = Math.atan2(playerSprite.y - levelBlocks[cannonNumber].positionY, playerSprite.x - levelBlocks[cannonNumber].positionX) * (180 / Math.PI)
                    levelBlocks[cannonNumber].minAngle = angle;
                    levelBlocks[cannonNumber].maxAngle = angle;
                    levelBlocks[cannonNumber].shoot(100,20,20,2,"#ff0000","#ff0000",0);
                    cannonAudio.play();
                } 
            }, 250);
            cannonInterval -= 50;
            cannonNumber++;
            if (cannonNumber > 3) {
                cannonNumber = 0;
            }
        }
        
        topBorder.positionY = Math.sin(elapsed/(1000/Math.PI)) * 690;
        leftBorder.positionX = Math.sin(elapsed/(1000/Math.PI)) * 1260;
        bottomBorder.positionY = 705 - Math.sin(elapsed/(1000/Math.PI)) * 690;
        if (rightBorder.height < 150) {
            rightBorder.height = 0;
        }
        if (rightBorder.height == 0 && playerSprite.x >= rightBorder.positionX) {
            document.getElementById("main").style.display = "none";
            app.ticker.stop();
            app.destroy();
            setTimeout(() => {
                console.log("test");
                document.getElementById("top-text").style.display = "none";
                document.getElementById("body").style.backgroundColor = "#008080";
                document.getElementById("body").style.removeProperty("background-image");
                document.getElementById("body").style.removeProperty("background-repeat");
                document.getElementById("body").style.removeProperty("background-size");
                Finale();
            }, 5000)
            
        }
        rightBorder.positionX = 1270 - Math.sin(elapsed/(1000/Math.PI)) * 1260;
    }
}

function setLevel(level) {
    currentLevel = level;
    lost = false;
    won = false;
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
    playLevel = new Level(currentLevel.toString(), 0);
    levelBlocks = [];
    lostAfterCrash = false;
    cannonNumber = 0;
    playLevel.generate();
    if (currentLevel < 10) { 
        mainMusic.play();
        folderSprite.height = 70;
    }
    if (currentLevel == 10) {
        mainMusic.pause();
    }
    if (currentLevel != 10) {
        document.getElementById("body").style.backgroundColor = "#008080";
        app.renderer.backgroundColor = "#008080";
        document.getElementsByClassName("taskbar")[0].style.display = "block";
        document.getElementById("top-text").style.removeProperty("background-color");
        document.getElementById("body").style.removeProperty("background-image");
        document.getElementById("body").style.removeProperty("background-repeat");
        document.getElementById("body").style.removeProperty("background-size");
        document.getElementById("grid-container").style.display = "grid";
        document.getElementById("grid-container-bottom").style.display = "grid";
        playerSprite.tint = "#ffffff";
        folderSprite.tint = "#ffffff";
        zeroParticleGenerator.color = "#00ff00";
        oneParticleGenerator.color = "#00ff00"
        document.getElementById("top-text").style.color = "#ffffff";
        document.getElementById("top-text").innerText = "Browser's Labyrinth";
        document.getElementsByClassName("taskbar")[0].style.backgroundColor = "#c8c8c8";
        for (let i = 0; i < document.getElementsByClassName("level-button").length; i++) {
            document.getElementsByClassName("level-button")[i].style.backgroundColor = "#c8c8c8";         
        }
        document.getElementsByClassName("start-button")[0].style.backgroundColor = "#c8c8c8";
    }
    document.getElementById("top-text").style.textShadow = "5px 5px #000";
    blocks.push(topBorder, bottomBorder, leftBorder, rightBorder)
    app.stage.addChild(folderSprite)
    folderSprite.texture = PIXI.Texture.from('media/folder.png')
    playerSprite.x = screenWidth / 2 - 600;
    playerSprite.y = 640;
    playerSprite.ySpeed = 0;
    playerSprite.height = 40;
    app.stage.addChild(playerSprite);
    document.getElementsByClassName("taskbar")[0].getElementsByClassName("level-button")[currentLevel-1].style.display = "inline-block"
}
window.Level = Level;
