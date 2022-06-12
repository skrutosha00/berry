import { animateOnce, changeBalance, randInt, setBalanceField } from "./functions.js";

setBalanceField()
let balance = document.querySelector('.balance')
let wrapper = document.querySelector('.wrapper')
let warning = document.querySelector('.warning')
let volumeCont = document.querySelector('.volume_cont')

let cfData = {
    hammer: 1,
    axe: 2,
    hammer_2: 3,
    gun: 4,
    pers: 5
}

let playing = true
let score = 0
let level = Number(localStorage.getItem('level_berry'))

let volume = false
let audio = new Audio()
audio.src = '../audio/game.mp3'

for (let avatar of document.querySelectorAll('.avatar')) {
    avatar.querySelector('.avatar_name').innerHTML = localStorage.getItem('name_berry') ?? 'Player'

    let avatarPic = document.createElement('img')
    avatarPic.src = '../png/avatar_' + (localStorage.getItem('avatar_berry') ?? 1) + '.png'
    avatar.appendChild(avatarPic)
}

document.querySelector('.level').innerHTML = 'Level ' + level

document.querySelector('.cf').innerHTML = cfData[localStorage.getItem('chosen_berry')].toFixed(2)

let chosenPic = document.createElement('img')
chosenPic.src = '../png/' + localStorage.getItem('chosen_berry') + '.png'
document.querySelector('.chosen').appendChild(chosenPic)

play()

document.querySelector('.again').onclick = () => {
    warning.style.left = '-50%'
    score = 0
    document.querySelector('.score').innerHTML = 0
    document.querySelector('.earned').innerHTML = 0
    document.querySelector('.time').innerHTML = 60

    play()
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

function getEnemy() {
    let enemy = document.createElement('div')
    enemy.classList.add('enemy', 'block')

    let enemyPic = document.createElement('img')
    enemyPic.src = '../png/enemy_' + randInt(1, 5) + '.png'

    let harm = document.createElement('div')
    harm.classList.add('harm', 'block', 'hidden')

    enemy.append(enemyPic, harm)
    wrapper.append(enemy)

    enemy.style.left = -enemy.offsetWidth + 'px'
    enemy.style.top = '35%'

    let enemyHealth = level + 2
    let distance = 0

    let enemyInterval = setInterval(() => {
        if (distance > window.innerWidth) {
            enemy.remove()
            clearInterval(enemyInterval)
        }

        let stepLength = randInt(window.innerWidth * 0.125, window.innerWidth * 0.25)
        enemy.style.transform = 'translate(' + (distance + enemy.offsetWidth + stepLength) + 'px, ' + randInt(-window.innerHeight * 0.2, window.innerHeight * 0.2) + 'px)'
        distance += stepLength
    }, 1000)

    enemy.onclick = () => {
        if (!playing) { return }

        if (volume) {
            let harmSound = new Audio()
            harmSound.src = '../audio/harm.mp3'
            harmSound.play()
        }

        harm.classList.remove('hidden')

        setTimeout(() => {
            harm.classList.add('hidden')
        }, 100);

        enemyHealth -= 1
        if (!enemyHealth) {
            enemy.remove()
            clearInterval(enemyInterval)

            score += 1
            document.querySelector('.score').innerHTML = score
            document.querySelector('.earned').innerHTML = Math.round(score * cfData[localStorage.getItem('chosen_berry')] * (1.25 + level * 0.25))
        }
    }
}

function play() {
    playing = true

    let timeLeft = 60

    let gameInterval = setInterval(() => {
        timeLeft -= 1
        document.querySelector('.time').innerHTML = timeLeft

        if (!timeLeft) {
            clearInterval(gameInterval)
            gameOver()
            return
        }

        getEnemy()
    }, 1000);
}

function gameOver() {
    playing = false

    let prize = Math.round(score * cfData[localStorage.getItem('chosen_berry')] * (1.25 + level * 0.25))

    warning.querySelector('.amount_enemy').innerHTML = score
    warning.querySelector('.amount_money').innerHTML = prize

    changeBalance(prize)
    animateOnce('.balance')

    warning.style.left = '50%'
}

