'use strict'
var boardSize = 4
var gBoard
const MINE = '<img src="img/bomb.png">'

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
    gBoard = placeNumbers(createBoard())
    renderBoard(gBoard)


}

const createBoard = () => {
    const board = []
    for (var i = 0; i < boardSize; i++) {
        board.push([])
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = {...gCell}
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
            if (cell.isMine === true) {
                strHTML += MINE
            }else{
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




}

const placeNumbers = (board) => {
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

const setMinesNegsCount = () => {
    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {

        }
    }

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


// document.addEventListener('contextmenu', event => {
//     event.preventDefault();
// });

