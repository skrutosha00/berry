let input = document.querySelector('input')

let volume = false
let audio = new Audio()
audio.src = '../audio/main.mp3'
audio.loop = true

if (!localStorage.getItem('balance_berry')) {
    localStorage.setItem('balance_berry', 5000)
}

if (!localStorage.getItem('hammer_berry')) {
    localStorage.setItem('hammer_berry', 1)
}

if (!localStorage.getItem('chosen_berry')) {
    localStorage.setItem('chosen_berry', 'hammer')
}

let volumeCont = document.querySelector('.volume_cont')

for (let i = 0; i < 6; i++) {
    let avatarCont = document.createElement('div')
    avatarCont.classList.add('avatar', 'block')

    if (localStorage.getItem('avatar_berry') == i + 1) {
        avatarCont.classList.add('chosen')
    }

    avatarCont.onclick = () => {
        for (let av of document.querySelectorAll('.avatar')) {
            av.classList.remove('chosen')
        }

        avatarCont.classList.add('chosen')
        localStorage.setItem('avatar_berry', i + 1)
    }

    let avatarPic = document.createElement('img')
    avatarPic.src = '../png/avatar_' + (i + 1) + '.png'

    avatarCont.appendChild(avatarPic)
    document.querySelector('.avatar_cont').appendChild(avatarCont)
}

input.value = localStorage.getItem('name_berry') ?? ''

input.onblur = () => {
    localStorage.setItem('name_berry', input.value)
}

volumeCont.onclick = () => {
    volume = !volume

    if (volume) {
        audio.play()
        volumeCont.querySelector('img').src = '../png/volume_off.png'
    } else {
        audio.pause()
        volumeCont.querySelector('img').src = '../png/volume_on.png'
    }
}