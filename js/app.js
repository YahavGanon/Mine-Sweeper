'use strict'
var boardSize = 4
var gBoard
var numberOfClicks 
const MINE = '<img class="bomb" src="img/bomb.png">'
var timerInterval

const gCell = {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false

}
// gGame = {
//     isOn: false,
//     shownCount: 0,
//     markedCount: 0
//     // secsPassed: 0
//    }

const onInit = () => {
    resetTimer
    numberOfClicks = 0
    gBoard = setMinesNegsCount(createBoard())
    renderBoard(gBoard)



}

const createBoard = () => {
    const board = []
    for (var i = 0; i < boardSize; i++) {
        board.push([])
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = { ...gCell }
        }
    }
    // board[generateRandomNumber()][generateRandomNumber()].isMine = true
    // board[generateRandomNumber()][generateRandomNumber()].isMine = true

    // console.log(board)
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
            // if(numberOfClicks === 1){
            strHTML += `<div class="hideCell"></div></td>`
            // }else{
            //     strHTML += `</td>`
            // }

        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}


const onCellClicked = (td1) => {
    // console.log(td1.innerHTML)
    const divElemnt = td1.querySelector('.hideCell')
    const bomb = td1.querySelector('.bomb')
    const matches = document.querySelectorAll(".bomb");
    if (bomb) {
        // console.log(matches)
        matches.forEach(matches => matches.classList.remove("hideCell"))
        gameOver()
    }
    else {
        numberOfClicks++
    }
    if (numberOfClicks === 1) {
        startTimer()
        const boardWithNoMines = createBoard()
        const boardWithMines = generateMines(boardWithNoMines)
        gBoard = setMinesNegsCount(boardWithMines)
        renderBoard(gBoard)
    }

    // console.log(divElemnt)
    if (divElemnt) {
        divElemnt.classList.remove('hideCell')
    }

    // console.log(td1.innerHTML)
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

const generateMines = (gBoard) => {
    console.log(gBoard)
    gBoard[generateRandomNumber()][generateRandomNumber()].isMine = true
    gBoard[generateRandomNumber()][generateRandomNumber()].isMine = true
    return gBoard
}

const gameOver = () => {
    resetTimer()
    // numberOfClicks = 0
    // onInit()
}






// document.addEventListener('contextmenu', event => {
//     event.preventDefault();
// });

