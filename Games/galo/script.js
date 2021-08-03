const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellEllements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winingMessageElement = document.getElementById('winningMessage');
const winingMessageTextElement = document.querySelector('[data-wining-message-text]')
const restartButton = document.getElementById('restartButton')
let circleTurn 

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellEllements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once : true })
    })
    setBoardHoverClass()
}


function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
    }
    // placeMark
    // Check for win
    // Check for draw
    // Switch turns 
    swapTurns()
    setBoardHoverClass()


function endGame(draw) {
    if (draw) {
        winingMessageTextElement.innerText = "Empate!"
    } else {
        winingMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} GANHOU!`
    }
    winingMessageTextElement.classList.add('show')
}

function isDraw() {
    return [...cellEllements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellEllements[index].classList.contains(currentClass)
        })
    
    })
}