class Particles{
    constructor(texture, minSpeedX, maxSpeedX, minSpeedY, maxSpeedY, gravity, minRotation, maxRotation, minAlphaDecrease, maxAlphaDecrease){
        this.texture = texture;
        this.minSpeedX = minSpeedX;
        this.maxSpeedX = maxSpeedX;
        this.minSpeedY = minSpeedY;
        this.maxSpeedY = maxSpeedY;
        this.gravity = gravity;
        this.minRotation = minRotation;
        this.maxRotation = maxRotation;
        this.minAlphaDecrease = minAlphaDecrease;
        this.maxAlphaDecrease = maxAlphaDecrease;
        this.particles = [];
    }
    createParticles(number, x, y){
        for (let i = 0; i < number; i++){
            let newParticle = new PIXI.Sprite(this.texture);
            newParticle.x = x;
            newParticle.y = y;
            newParticle.speedX = Math.floor(Math.random() * (this.maxSpeedX - this.minSpeedX)) + this.minSpeedX;
            newParticle.speedY = Math.floor(Math.random() * (this.maxSpeedY - this.minSpeedY)) + this.minSpeedY;
            newParticle.gravity = this.gravity;
            newParticle.speedRotation = Math.floor(Math.random() * (this.maxRotation - this.minRotation)) + this.minRotation;
            newParticle.speedAlpha = Math.floor(Math.random() * (this.maxAlphaDecrease - this.minAlphaDecrease)) + this.minAlphaDecrease;
            this.particles.push(newParticle);
            app.stage.addChild(newParticle);
        }
    }
    renderParticles(){
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.y += particle.gravity;
            particle.rotation += particle.speedRotation;
            particle.alpha -= particle.speedAlpha;
            if (particle.alpha <= 0)
                app.stage.removeChild(particle);
        });
    }
}