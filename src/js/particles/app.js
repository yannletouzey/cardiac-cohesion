export const particles = () => {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight


    ctx.strokeStyle = 'white'

    ctx.lineWidth = 0.2
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    // gradient.addColorStop(0, "white")
    // gradient.addColorStop(0.5, "lightgrey")
    // gradient.addColorStop(1, "grey")
    ctx.fillStyle = 'lightgrey'
    ctx.strokeLine = 2
    class Particle {
        constructor(effect){
            this.effect = effect
            this.radius = Math.random() * 2 + 1
            this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2)
            this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2)
            this.velocityX = Math.random() * 1 - 0.5
            this.velocityY = Math.random() * 1 - 0.5
        }
        draw(context){
            // context.fillStyle = 'hsl('+ this.x * 0.5 +', 100%, 50%)'
            context.beginPath()
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
            context.fill()
            context.stroke()
        }
        update(){
            this.x+=this.velocityX
            if ((this.x + this.radius) > this.effect.width || (this.x - this.radius) < 0) {
                this.velocityX *= -1
            }
            this.y+=this.velocityY
            if ((this.y + this.radius) > this.effect.height || (this.y - this.radius) < 0) {
                this.velocityY *= -1
            }
        }
    }
    class Effect {
        constructor(canvas){
            this.canvas = canvas
            this.width = this.canvas.width
            this.height = this.canvas.height
            this.particles = []
            this.numberOfParticles = 200
            this.createParticle()
        }
        createParticle(){
            for (let index = 0; index < this.numberOfParticles; index++) {
                this.particles.push(new Particle(this))
            }
        }
        handleParticle(context){
            this.particles.forEach(p => {
                p.draw(context)
                p.update()
            })
            this.connectParticle(context)
        }
        connectParticle(context){
            const maxDistance = 80
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = 0; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x
                    const dy = this.particles[i].y - this.particles[j].y
                    const distance = Math.hypot(dx, dy)
                    if (distance < maxDistance) {
                        context.beginPath()
                        context.moveTo(this.particles[i].x, this.particles[i].y)
                        context.lineTo(this.particles[j].x, this.particles[j].y)
                        context.stroke()
                    }
                }
            }
        }
    }
    const effect = new Effect(canvas)
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        effect.handleParticle(ctx)
        requestAnimationFrame(animate)
    }
    animate()
}