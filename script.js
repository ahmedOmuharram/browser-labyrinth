let app = new PIXI.Application({ width: 1280, height: 720 });
document.body.appendChild(app.view);

// Create the sprite and add it to the stage
let sprite = PIXI.Sprite.from('media/sprite.png');
app.stage.addChild(sprite);

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta;
  sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
});