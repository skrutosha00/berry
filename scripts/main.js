import { setBalanceField } from './functions.js'

for (let i = 0; i < 3; i++) {
    let level = document.createElement('a')
    level.href = './game.html'
    level.classList.add('level')

    level.onclick = () => {
        localStorage.setItem('level_berry', i + 1)
    }

    let levelNum = document.createElement('div')
    levelNum.innerHTML = 'Level ' + (i + 1)
    level.appendChild(levelNum)

    let levelCf = document.createElement('div')
    levelCf.innerHTML = 'x' + (1.25 + (i + 1) * 0.25)
    level.appendChild(levelCf)

    document.querySelector('.level_cont').appendChild(level)
}

let avatarPic = document.createElement('img')
avatarPic.src = '../png/avatar_' + (localStorage.getItem('avatar_berry') ?? 1) + '.png'
document.querySelector('.avatar').appendChild(avatarPic)

document.querySelector('.avatar_name').innerHTML = localStorage.getItem('name_berry') ?? 'Player'

setBalanceField()