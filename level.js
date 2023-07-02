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

  refresh() {
    APPHTML.style.marginLeft = (window.innerWidth/2 - screenWidth/2) + "px";
    /*
    topBorder.positionX = window.innerWidth/2 - 640;
    topBorder.positionY = window.innerHeight/2 - 360;

    bottomBorder.positionX = window.innerWidth/2 - 640;
    bottomBorder.positionY = window.innerHeight/2 + 360;

    leftBorder.positionX = window.innerWidth/2 - 640;
    leftBorder.positionY = window.innerHeight/2 - 360;

    rightBorder.positionX = window.innerWidth/2 + 640;
    rightBorder.positionY = window.innerHeight/2 - 360;
    
    app.renderer.resize(screenWidth, screenHeight);
    */
    
  }

  generate() {
    fetch('levelData.json')
    .then(response => response.json())
    .then(data => {
        var levelName = this.name;
        var jsonData = Array.isArray(data) ? data : [data];
        jsonData.forEach(obj => {
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
}

window.Level = Level;
