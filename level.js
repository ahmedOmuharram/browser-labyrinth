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
    }).catch(error => {
        console.error('Error:', error);
    });
  }
  Level0(delta){
    if (levelBlocks[0]) {
        levelBlocks[0].height = Math.min(leftBorder.height, 3 * bottomBorder.width/4) - 20;
    }
   }
  Level1(delta){
    
  }
  Level2(delta){
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
  Level3(delta){

  }
  Level4(delta){
    if (levelBlocks[4]) {
        levelBlocks[4].positionX = Math.max(playerSprite.x - 100, 400)
    }
  }

  Level5(delta){
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

      /*"6": [
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "r"
        }, 
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "l"
        },
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "r"
        },
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "l"
        }, 
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "r"
        },
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "l"
        },
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "r"
        }, 
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "l"
        },
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "r"
        },
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "l"
        }, 
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "r"
        },
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "l"
        },
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "r"
        }, 
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "l"
        },
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "r"
        },
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "l"
        }, 
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "r"
        },
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "l"
        },
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "r"
        }, 
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "l"
        },
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "r"
        },
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "l"
        }, 
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "r"
        },
        {
            "x": "0",
            "y": "0",
            "width": "50",
            "height": "50",
            "thickness": 2,
            "color": "#ff0081",
            "fillColor": "#ff0081",
            "borders": "l"
        }
    ]*/

  /*Level6(delta){
    elapsed += delta;
    for (let i = 0; i < 24; i++) {
        if (levelBlocks[i]) {
            levelBlocks[i].positionX = screenWidth/2 + i * 20.0 * Math.cos((elapsed * i/100.0))
            levelBlocks[i].positionY = screenHeight/2  + i * 20.0 * Math.sin((elapsed * i/100.0))
        }  
    }
  }*/

    Level6(delta){
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
}

window.Level = Level;
