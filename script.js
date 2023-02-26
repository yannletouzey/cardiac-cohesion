const slider = document.getElementById("btn-slider");
const chrono = document.getElementById('chrono')
const ring = document.getElementById('ring')
const btn_start = document.getElementById('btn-start')
const btn_stop = document.getElementById('btn-stop')
const btn_slider = document.getElementById('btn-slider')
const label_slider = document.getElementById('label-btn-slider')
const checkboxs = document.getElementById('checkboxs')
const labelCheckbox = document.getElementById('label-checkbox')
const form = document.getElementById('form')
const body = document.querySelector('body')

let respireSeconde;

btn_start.addEventListener("click", () => {
    if (document.getElementById('oneRadio').checked) {
        respireSeconde = document.getElementById('oneRadio').value
    } else if (document.getElementById('twoRadio').checked) {
        respireSeconde = document.getElementById('twoRadio').value
    } else if (document.getElementById('threeRadio').checked) {
        respireSeconde = document.getElementById('threeRadio').value
    }
});

let minutes = slider.value
let secondes = 0

chrono.textContent = `${minutes}:00`

slider.oninput = function() {
    chrono.textContent = `${this.value}:${addZero(secondes)}`;
    minutes = addZero(this.value)
}

let timeout
let chronoIsStop = true

btn_start.classList.remove('startHideBtn')
btn_stop.classList.add('stopHideBtn')
form.classList.remove('formHide')
checkboxs.classList.remove('checkboxHide')
labelCheckbox.classList.remove('labelCheckboxHide')
ring.classList.add('ringHide')
body.classList.add('paused')

const chronoStart = () => {
    if (chronoIsStop) {
        chronoIsStop = false
        btn_start.classList.add('startHideBtn')
        btn_stop.classList.remove('stopHideBtn')
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
        btn_start.classList.remove('startHideBtn')
        checkboxs.classList.remove('checkboxHide')
        btn_slider.classList.remove('sliderHideBtn')
        label_slider.classList.remove('labelSliderHide')
        labelCheckbox.classList.remove('labelCheckboxHide')
        form.classList.remove('formHide')
        btn_stop.classList.add('stopHideBtn')
        ring.classList.add('ringHide')
        body.classList.add('paused')


        minutes = slider.value
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

        minutes = slider.value
        secondes = 0
        chrono.textContent = `${minutes}:${addZero(secondes)}`
        console.log(respireSeconde);
        clearTimeout(timeout)
        btn_stop.classList.add('stopHideBtn')
        ring.classList.add('ringHide')
        body.classList.add('paused')
        btn_start.classList.remove('startHideBtn')
        btn_slider.classList.remove('sliderHideBtn')
        label_slider.classList.remove('labelSliderHide')
        labelCheckbox.classList.remove('labelCheckboxHide')
        form.classList.remove('formHide')

        // respireSeconde = 0
        if (ring.classList.contains('respire-55')) {
            ring.classList.remove('respire-55')
        } else if (ring.classList.contains('respire-46')) {
            ring.classList.remove('respire-46')
        } else if (ring.classList.contains('respire-64')) {
            ring.classList.remove('respire-64')
        }
        checkboxs.classList.remove('checkboxHide')
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
btn_start.addEventListener('click', chronoStart)
btn_stop.addEventListener('click', chronoStop)