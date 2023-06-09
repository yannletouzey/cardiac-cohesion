export default class Particle {

    constructor(effect){

        this.effect = effect
        this.radius = Math.random() * 3 + 1
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2)
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2)
        this.velocityX = Math.random() * 1 - 0.5
        this.velocityY = Math.random() * 1 - 0.5

    }
    draw(context){

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