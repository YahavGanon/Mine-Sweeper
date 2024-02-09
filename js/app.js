'use strict'
var boardSize = 4
var gBoard
var numberOfClicks
const MINE = '<img class="bomb" src="img/bomb.png">'
var timerInterval
var gameModes = [16, 64, 144]
var selectedGameMode = 16
var numberOfMines = 3
var numOfStrikes
var counterFlags = 0
var counterReveals = 0
const elFlags = document.querySelector('.flags')
elFlags.innerText = '🚩 ' + counterFlags
const elHeart = document.querySelector('.hearts')
const gameModeContainer = document.querySelector('.game-mode')

const gCell = {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false
}

const onInit = () => {
    changeButton()
    resetTimer()
    restartFlags()
    restartStrikes()
    numberOfClicks = 0
    gBoard = setMinesNegsCount(createBoard())
    renderBoard(gBoard)
    initGameModes()

}

const gameModeChange = (mode) => {
    selectedGameMode = mode
    gBoard = setMinesNegsCount(createBoard())
    renderBoard(gBoard)
    numberOfClicks = 0
    console.log(mode)

}

const initGameModes = () => {
    const gameModeContainer = document.querySelector('.game-mode')
    for (let i = 0; i < gameModes.length; i++) {
        const button = document.createElement('button')
        button.textContent = gameModes[i]
        button.addEventListener('click', () => {
            changeButton()
            restartStrikes()
            resetTimer()
            restartFlags()
            gameModeChange(gameModes[i])
        })
        gameModeContainer.appendChild(button)
    }
}

const createBoard = () => {
    const board = []
    boardSize = Math.sqrt(selectedGameMode)
    for (var i = 0; i < boardSize; i++) {
        board.push([])
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = { ...gCell }
        }
    }
    return board
}

const renderBoard = (board) => {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`
            strHTML += `<td data-i=${i} data-j=${j} onclick="onCellClicked(this, ${i}, ${j})" class="${className}">`
            if (cell.isMine === true) {
                strHTML += MINE
            } else {
                if (cell.minesAroundCount === 0) {
                    strHTML += ' ';
                } else {
                    strHTML += cell.minesAroundCount
                }
            }

            strHTML += `<div class="hideCell"></div></td>`

        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

const onCellClicked = (td1, i, j) => {
    numberOfClicks++
    const cell = gBoard[i][j]
    checkVictory(cell)
    if (cell.isMarked) return
    if (cell.isShown) return

    const divElemnt = td1.querySelector('.hideCell')

    if (numberOfClicks === 1) {
        startTimer()
        generateMines(i, j)
        setMinesNegsCount(gBoard)
        revealCell(td1, i, j)
    } else {
        revealCell(td1, i, j)
    }
    if (divElemnt && (cell.isMine === false)) {
        divElemnt.classList.remove('hideCell')
    }
    if (divElemnt && cell.isMine && (numOfStrikes === 0)) {
        divElemnt.classList.remove('hideCell')
    }
}

const revealCell = (td1, i, j) => {
    const elHearts = document.querySelector('.hearts')
    const cell = gBoard[i][j]


    if (cell.isMine) {
        numOfStrikes--
        td1.innerHTML = MINE
    } else {
        if (cell.minesAroundCount > 0) {
            td1.innerHTML = cell.minesAroundCount
        } else {
            td1.minesAroundCount = ' '
        }
    }
    if (numOfStrikes === 2) {
        elHearts.innerText = '❤️❤️'
    }
    if (numOfStrikes === 1) {
        elHearts.innerText = '❤️'
    }
    if (numOfStrikes === 0) {
        elHearts.innerText = ''
        gameOver()
    }
    cell.isShown = true
}

const setMinesNegsCount = (board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j].isMine === true) {
                if (i > 0) {
                    if (board[i - 1][j].isMine !== true) {
                        board[i - 1][j].minesAroundCount += 1;
                    }
                    if (j > 0 && board[i - 1][j - 1].isMine !== true) {
                        board[i - 1][j - 1].minesAroundCount += 1;
                    }
                    if (j < board[0].length - 1 && board[i - 1][j + 1].isMine !== true) {
                        board[i - 1][j + 1].minesAroundCount += 1;
                    }
                }
                if (i < board.length - 1) {
                    if (board[i + 1][j].isMine !== true) {
                        board[i + 1][j].minesAroundCount += 1;
                    }
                    if (j > 0 && board[i + 1][j - 1].isMine !== true) {
                        board[i + 1][j - 1].minesAroundCount += 1;
                    }
                    if (j < board[0].length - 1 && board[i + 1][j + 1].isMine !== true) {
                        board[i + 1][j + 1].minesAroundCount += 1;
                    }
                }
                if (j > 0 && board[i][j - 1].isMine !== true) {
                    board[i][j - 1].minesAroundCount += 1;
                }
                if (j < board[0].length - 1 && board[i][j + 1].isMine !== true) {
                    board[i][j + 1].minesAroundCount += 1;
                }
            }
        }
    }
    return board;
}

const startTimer = () => {
    const startingTime = Date.now()
    timerInterval = setInterval(() => {
        const timePastInSec = (Date.now() - startingTime) / 1000
        document.querySelector('.timer').textContent = timePastInSec.toFixed(3)
    }, 50)
}

const resetTimer = () => {
    return clearInterval(timerInterval)
}

const renderCell = (cellI, cellJ, val) => {
    const elCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
    elCell.innerText = val
    return elCell
}

const generateRandomNumber = () => {
    return Math.floor(Math.random() * boardSize)
}

const generateMines = (iMatrixLocation, jMatrixLocation) => {
    let minesPlaced = 0
    if (selectedGameMode === 16) {
        numberOfMines = 3
    }
    if (selectedGameMode === 64) {
        numberOfMines = 14
    }
    if (selectedGameMode === 144) {
        numberOfMines = 32
    }
    while (minesPlaced < numberOfMines) {
        let i = generateRandomNumber()
        let j = generateRandomNumber()
        if (!gBoard[i][j].isMine && (i !== iMatrixLocation || j !== jMatrixLocation)) {
            gBoard[i][j].isMine = true

            minesPlaced++
        }
    }
}

const gameOver = () => {
    resetTimer()
    const buttonCondition = document.querySelector('.restatButton')
    buttonCondition.innerText = '😵'
}

const checkVictory = (td) => {
    if (td.isMine === false) {
        counterReveals++
        console.log(counterReveals)
    }
    if (counterReveals === (selectedGameMode - numberOfMines)) {
        console.log('You Won!')
        counterReveals = 0
        resetTimer()
    }
}

const rightClick = (event) => {
    const cell = event.target.closest("td")
    const i = cell.getAttribute("data-i")
    const j = cell.getAttribute("data-j")
    if (gBoard[i][j].isShown) return
    const isFlagged = gBoard[i][j].isMarked = !gBoard[i][j].isMarked
    if (isFlagged) {
        counterFlags++
        elFlags.innerText = '🚩 ' + counterFlags
        cell.innerHTML += `<span class="flag">🚩</span>`
    } else {
        counterFlags--
        elFlags.innerText = '🚩 ' + counterFlags
        cell.innerHTML = cell.innerHTML.replace(`<span class="flag">🚩</span>`, " ")
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.querySelector(".board")
    if (gameBoard) {
        gameBoard.addEventListener("contextmenu", event => {
            event.preventDefault()
            rightClick(event)
        })
    }
})

const restartFlags = () => {
    counterFlags = 0
    elFlags.innerText = '🚩 ' + counterFlags
}

const restartStrikes = () => {
    elHeart.innerText = '❤️❤️❤️'
    numOfStrikes = 3
    counterReveals = 0
}

const changeButton = () => {
    const buttonCondition = document.querySelector('.restatButton')
    buttonCondition.innerText = '😁'
}

