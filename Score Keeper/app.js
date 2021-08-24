const p1 = {
    score: 0,
    button: document.querySelector('#p1button'),
    display: document.querySelector('#p1display'),
    name: document.querySelector('#p1Name')
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2button'),
    display: document.querySelector('#p2display'),
    name: document.querySelector('#p2Name')

}

const resetButton = document.querySelector('#reset');
const startButton = document.querySelector('#start');
const msg = document.querySelector('#message');

let p1Name = "Player 1";
let p2Name = "Player 2";

const playTo = document.querySelector('#playTo')

let endScore = 3;
let isGameOver = false;

playTo.addEventListener('change', function () {
    endScore = parseInt(this.value);
    reset();
})

p1.button.addEventListener('click', function () {
    update(p1, p2);
})

p2.button.addEventListener('click', function () {
    update(p2, p1);
})

p1.name.addEventListener('input', function () {
    p1Name = p1.name.value;
    p1.button.innerText = `+1 ${p1Name}`;
})

p2.name.addEventListener('input', function () {
    p2Name = p2.name.value;
    p2.button.innerText = `+1 ${p2Name}`;
})

resetButton.addEventListener('click', reset)

function reset() {
    isGameOver = false;
    msg.classList.remove('show');
    msg.classList.add('hidden');
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = p.score;
        p.display.classList.remove('text-success', 'text-danger');
        p.button.removeAttribute('disabled');
    }
}

function update(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        player.display.textContent = player.score;
        if (player.score >= endScore && player.score > opponent.score + 1) {
            isGameOver = true;
            msg.innerText = `${player.name.value} is the Winner!`;
            msg.classList.add('show');
            player.display.classList.add('text-success');
            opponent.display.classList.add('text-danger');
            player.button.setAttribute('disabled', '');
            opponent.button.setAttribute('disabled', '');

        }
    }
}
