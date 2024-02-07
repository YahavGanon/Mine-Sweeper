'use strict'
var boardSize = 4
var gBoard
var numberOfClicks = 0
const MINE = '<img src="img/bomb.png">'
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
    board[2][3].isMine = true
    board[3][2].isMine = true

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
            // if(cell.minesAroundCount === 0){
            //     strHTML += ' '
            // }
            if (cell.isMine === true) {
                strHTML += MINE
            } else {
                strHTML += cell.minesAroundCount
            }
            strHTML += `</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

const onCellClicked = (td1) => {
    numberOfClicks++
    if (numberOfClicks === 1) {
        startTimer()
    }
    if (gBoard.isMine) {
        console.log(gBoard)
    }

    // console.log(gBoard)
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







// document.addEventListener('contextmenu', event => {
//     event.preventDefault();
// });

