class Particles{
    constructor(texture, minSpeedX, maxSpeedX, minSpeedY, maxSpeedY, gravity, minRotation, maxRotation, minAlphaDecrease, maxAlphaDecrease,
        minScale, maxScale, color){
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
        this.minScale = minScale;
        this.maxScale = maxScale;
        this.color = color;
        this.particles = [];
    }
    createParticles(number, x, y){
        for (let i = 0; i < number; i++){
            let newParticle = new PIXI.Sprite(this.texture);
            newParticle.x = x;
            newParticle.y = y;
            newParticle.anchor.set(0.5);
            newParticle.speedX = (Math.random() * (this.maxSpeedX - this.minSpeedX)) + this.minSpeedX;
            newParticle.speedY = (Math.random() * (this.maxSpeedY - this.minSpeedY)) + this.minSpeedY;
            newParticle.gravity = this.gravity;
            newParticle.speedRotation = (Math.random() * (this.maxRotation - this.minRotation)) + this.minRotation;
            newParticle.speedAlpha = (Math.random() * (this.maxAlphaDecrease - this.minAlphaDecrease)) + this.minAlphaDecrease;
            newParticle.scale.set((Math.random() * (this.maxScale - this.minScale)) + this.minScale);
            newParticle.tint = this.color;
            this.particles.push(newParticle);
            app.stage.addChild(newParticle);
        }
    }
    renderParticles(delta){
        this.particles.forEach(particle => {
            particle.speedY += particle.gravity * delta * 0.5;
            particle.x += particle.speedX * delta;
            particle.y += particle.speedY * delta;
            particle.rotation += particle.speedRotation * delta;
            particle.alpha -= particle.speedAlpha * delta;
            if (particle.alpha <= 0)
                app.stage.removeChild(particle);
        });
    }
}

window.Particles = Particles;