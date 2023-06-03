import { particles } from "./particles/app"

particles()
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
const sliderSpan = document.querySelectorAll('.slider__span')
let activeAudio = false
const choiceAudio = document.getElementById('checkbox__audio')
choiceAudio.addEventListener('change', () => {
    if (choiceAudio.checked) {
        activeAudio = true
    } else {
        activeAudio = false
    }
})
let stateAudio = false
const playAudio = () => {
    stateAudio = true
    const audio = document.querySelector('#audioIn');
    audio.play();
}
const pauseAudio = () => {
    stateAudio = false
    const audio = document.querySelector('#audioIn');
    audio.currentTime = 0;
    audio.pause();
}

chrono.textContent = `${minutes}:00`

btnSlider.oninput = function() {
    chrono.textContent = `${this.value}:${addZero(secondes)}`;
    minutes = addZero(this.value)
}
btnSliderTwo.oninput = function() {
    respireSeconde = btnSliderTwo.value
    sliderSpan.forEach((b, i) => {
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
        pauseAudio()
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
        if (activeAudio) {
            pauseAudio()
        }
    } else {
        timeout = setTimeout(time, 1000)
        if (activeAudio) {
            playAudio()
        }
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
    if (activeAudio) {
        if (stateAudio) {
            stateAudio = false
        } else {
            stateAudio = true
        }
    }
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

