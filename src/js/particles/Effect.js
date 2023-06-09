import Particle from "./Particle"

export default class Effect {

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

        const maxDistance = 100
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = 0; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x
                const dy = this.particles[i].y - this.particles[j].y
                const distance = Math.hypot(dx, dy)
                if (distance < maxDistance) {
                    context.save()
                    const opacity = 1 - (distance / maxDistance)
                    context.globalAlpha = opacity
                    context.beginPath()
                    context.moveTo(this.particles[i].x, this.particles[i].y)
                    context.lineTo(this.particles[j].x, this.particles[j].y)
                    context.stroke()
                    context.restore()
                }
            }
        }
    }
}