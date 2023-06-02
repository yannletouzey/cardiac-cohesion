const chrono = document.getElementById('chrono')
const ring = document.getElementById('ring')
const btn = document.getElementById('buttons__btn')
const btnSlider = document.getElementById('slider__range')
const btnSliderTwo = document.getElementById('slider__range-two')
const choiceTimeBeat = document.getElementById('choiceTimeBeat')
const container = document.querySelector('.container')
let minutes = btnSlider.value
let secondes = 0
let respireSeconde = btnSliderTwo.value
let timeout = 0
let chronoIsStop = true
const btnSliderTwoAll = document.querySelectorAll('.slider__span')

chrono.textContent = `${minutes}:00`

btnSlider.oninput = function() {
    chrono.textContent = `${this.value}:${addZero(secondes)}`;
    minutes = addZero(this.value)
}
btnSliderTwo.oninput = function() {
    respireSeconde = btnSliderTwo.value
    btnSliderTwoAll.forEach((b, i) => {
        b.dataset.number != btnSliderTwo.value ? b.classList.add('slider__opacity') : b.classList.remove('slider__opacity')
    })
}

ring.classList.add('hide')

const chronoStart = () => {
    if (chronoIsStop) {
        chronoIsStop = false
        time()
    }
}

const chronoStop = () => {
    if (!chronoIsStop) {
        minutes = btnSlider.value
        secondes = 0
        chrono.textContent = `${minutes}:${addZero(secondes)}`
        chronoIsStop = true
        if (ring.classList.contains('respire-55')) {
            ring.classList.remove('respire-55')
        } else if (ring.classList.contains('respire-46')) {
            ring.classList.remove('respire-46')
        } else if (ring.classList.contains('respire-64')) {
            ring.classList.remove('respire-64')
        }
        clearTimeout(timeout)
    }
}

const addZero = (nbr) => {
    nbr = parseInt(nbr)
    if (nbr < 10) {
        return "0" + nbr
    } else {
        return nbr
    }
}

const time = () => {
    if (chronoIsStop) return

    secondes = parseInt(secondes)
    minutes = parseInt(minutes)
    secondes--

    if (secondes < 0) {
        minutes--
        secondes = 59
    }

    chrono.textContent = `${minutes}:${addZero(secondes)}`
    
    if (minutes == 0 && secondes == 0) {
        chronoIsStop = true
        minutes = btnSlider.value
        secondes = 0
        chrono.textContent = `${minutes}:${addZero(secondes)}`
        clearTimeout(timeout)
        ring.classList.add('hide')
        container.classList.add('container__active')
        choiceTimeBeat.classList.remove('hide')
        chrono.classList.remove('chrono__stroke-text')

        if (ring.classList.contains('respire-55')) {
            ring.classList.remove('respire-55')
        } else if (ring.classList.contains('respire-46')) {
            ring.classList.remove('respire-46')
        } else if (ring.classList.contains('respire-64')) {
            ring.classList.remove('respire-64')
        }
        btn.setAttribute('value', "Start")
    } else {
        timeout = setTimeout(time, 1000)
        if (respireSeconde == 1) {
            ring.classList.add('respire-55')
        } else if (respireSeconde == 2) {
            ring.classList.add('respire-46')
        } else if (respireSeconde == 3) {
            ring.classList.add('respire-64')
        }
    }
}
btn.addEventListener('click', ()=>{
    choiceTimeBeat.classList.toggle('hide')
    chrono.classList.toggle('chrono__stroke-text')
    ring.classList.toggle('hide')
    container.classList.toggle('container__active')
    if (chronoIsStop) {
        chronoStart()
        btn.setAttribute('value', "Stop")
    } else {
        chronoStop()
        btn.setAttribute('value', "Start")
    }
})

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
        this.radius = Math.random() * 6 + 4
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2)
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2)
        this.vx = Math.random() * 1 - 0.5
        this.vy = Math.random() * 1 - 0.5
    }
    draw(context){
        // context.fillStyle = 'hsl('+ this.x * 0.5 +', 100%, 50%)'
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.fill()
        context.stroke()
    }
    update(){
        this.x+=this.vx
        if ((this.x + this.radius) > this.effect.width || (this.x - this.radius) < 0) {
            this.vx *= -1
        }
        this.y+=this.vy
        if ((this.y + this.radius) > this.effect.height || (this.y - this.radius) < 0) {
            this.vy *= -1
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