// const slider = document.getElementById("btn-slider");
const chrono = document.getElementById('chrono')
const ring = document.getElementById('ring')
const btn = document.getElementById('btn')
const btn_slider = document.getElementById('btn-slider')
const label_slider = document.getElementById('label-btn-slider')
const checkboxs = document.getElementById('checkboxs')
const labelCheckbox = document.getElementById('label-checkbox')
const form = document.getElementById('form')
const body = document.querySelector('body')
const radio = document.querySelectorAll('.radio')

let minutes = btn_slider.value
let secondes = 0
let respireSeconde;
let timeout = 0
let chronoIsStop = true

btn.addEventListener("click", () => {
    radio.forEach(function(e) {
        if (e.checked) respireSeconde = e.value
    });
});


chrono.textContent = `${minutes}:00`

btn_slider.oninput = function() {
    chrono.textContent = `${this.value}:${addZero(secondes)}`;
    minutes = addZero(this.value)
}


form.classList.remove('formHide')
checkboxs.classList.remove('checkboxHide')
labelCheckbox.classList.remove('labelCheckboxHide')
ring.classList.add('ringHide')
body.classList.add('paused')

const chronoStart = () => {
    if (chronoIsStop) {
        chronoIsStop = false
        btn_slider.classList.add('sliderHideBtn')
        label_slider.classList.add('labelSliderHide')
        checkboxs.classList.add('checkboxHide')
        labelCheckbox.classList.add('labelCheckboxHide')
        form.classList.add('formHide')
        ring.classList.remove('ringHide')
        body.classList.remove('paused')
        time()
    }
}

const chronoStop = () => {
    if (!chronoIsStop) {
        checkboxs.classList.remove('checkboxHide')
        btn_slider.classList.remove('sliderHideBtn')
        label_slider.classList.remove('labelSliderHide')
        labelCheckbox.classList.remove('labelCheckboxHide')
        form.classList.remove('formHide')
        ring.classList.add('ringHide')
        body.classList.add('paused')

        minutes = btn_slider.value
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

        minutes = btn_slider.value
        secondes = 0
        chrono.textContent = `${minutes}:${addZero(secondes)}`
        console.log(respireSeconde);
        clearTimeout(timeout)
        ring.classList.add('ringHide')
        body.classList.add('paused')
        btn_slider.classList.remove('sliderHideBtn')
        label_slider.classList.remove('labelSliderHide')
        labelCheckbox.classList.remove('labelCheckboxHide')
        form.classList.remove('formHide')

        if (ring.classList.contains('respire-55')) {
            ring.classList.remove('respire-55')
        } else if (ring.classList.contains('respire-46')) {
            ring.classList.remove('respire-46')
        } else if (ring.classList.contains('respire-64')) {
            ring.classList.remove('respire-64')
        }
        checkboxs.classList.remove('checkboxHide')
        btn.setAttribute('value', "Start")
    } else {
        timeout = setTimeout(time, 1000)
        if (respireSeconde == 5) {
            ring.classList.add('respire-55')
        } else if (respireSeconde == 4) {
            ring.classList.add('respire-46')
        } else if (respireSeconde == 6) {
            ring.classList.add('respire-64')
        }
    }
}
btn.addEventListener('click', ()=>{
        if (chronoIsStop) {
            chronoStart()
            btn.setAttribute('value', "Stop")
        } else {
            chronoStop()
            btn.setAttribute('value', "Start")
        }
    }
)