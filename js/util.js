'use strict'

//minimum is inclusive//
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function drawNum() {
    var randIdx = getRandomInt(0, gNums.length)
    var num = gNums[randIdx]
    gNums.splice(randIdx, 1)
    return num
}

function resetNums() {
    gNums = []
    for (var i = 1; i < 100; i++) {
        gNums.push(i)
    }
}

function countInRow(board, rowIdx, symbol) {
    var count = 0
    for (var j = 0; j < board[rowIdx].length; j++) {
        const cell = board[rowIdx][j]
        if (cell === symbol) count++
    }
    return count
}

function countInCol(board, colIdx, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        const cell = board[i][colIdx]
        if (cell === symbol) count++
    }
    return count
}

function countInMainDiagonal(board, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        const cell = board[i][i]
        if (cell === symbol) count++
    }
    return count
}

function countInSecondaryDiagonal(board, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        const cell = board[i][board.length - 1 - i]
        if (cell === symbol) count++
    }
    return count
}

function createBoard() {
    const board = []
    for (var i = 0; i < BOARD_SIZE; i++) {
        board[i] = []
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = ''
        }
    }
    
    return board
}

function playSound() {
    const sound = new Audio('sound/buzzer-or-wrong-answer-20582.mp3')
    // console.log(sound)
    sound.play()
}

var timerInterval
const startTimer = () => {
    const startingTime = Date.now()
    timerInterval = setInterval(() => {
        const timePastInSec = (Date.now() - startingTime) / 1000
        document.querySelector('.timer').textContent = timePastInSec.toFixed(3)
    }, 10)
}

const resetTimer = () => {
    return clearInterval(timerInterval)
}
// .. add a integer on the top of the code and just do :    game.food count--
function checkVictory() {
    return gGame.foodsCount === 0
}

function gameOver2() {
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    showModal()
}

function showModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
}

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hide')
}

function getEmptyPos() {
    const emptyPoss = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const currCell = gBoard[i][j]
            if (currCell !== WALL) {
                emptyPoss.push({ i, j })
            }
        }
    }

    const randIdx = getRandomInt(0, emptyPoss.length)
    return emptyPoss[randIdx]
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 3; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD


            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = SUPERFOOD
    board[1][8] = SUPERFOOD
    board[8][1] = SUPERFOOD
    board[8][8] = SUPERFOOD
    return board
}

function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function renderCountGamerNegs() {
    var negsCount = 0;
    for (var i = gGamerPos.i - 1; i <= gGamerPos.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = gGamerPos.j - 1; j <= gGamerPos.j + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (i === gGamerPos.i && j === gGamerPos.j) continue;
            const currCell = gBoard[i][j]
            if (currCell.gameElement === BALL) negsCount++;
        }
    }
    const elNgsCount = document.querySelector('.negs-count span')
    elNgsCount.innerText = negsCount
}

function onHandleKey(event) {
    const i = gGamerPos.i
    const j = gGamerPos.j

    switch (event.key) {
        case 'ArrowLeft':
            onMoveTo(i, j - 1)
            break
        case 'ArrowRight':
            onMoveTo(i, j + 1)
            break
        case 'ArrowUp':
            onMoveTo(i - 1, j)
            break
        case 'ArrowDown':
            onMoveTo(i + 1, j)
            break
    }
}