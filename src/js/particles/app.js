import Effect from "./Effect"

export const particles = () => {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    
    gradient.addColorStop(0, "#fab7a3")
    gradient.addColorStop(0.33, "#f893b9")
    gradient.addColorStop(0.66, "#84d9f8")
    gradient.addColorStop(1, "#6ff8d8")

    ctx.strokeStyle = 'white'
    ctx.lineWidth = 0.7
    ctx.fillStyle = gradient
    ctx.strokeLine = 2

    
    const effect = new Effect(canvas)
    function animate() {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        effect.handleParticle(ctx)
        requestAnimationFrame(animate)
        
    }
    animate()
}