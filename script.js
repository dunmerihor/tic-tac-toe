const Player = (name, sign, turn) => {
    const makeMove = (isCell, cellID) => {
        if (turn) {
            gameBoard.clickOnBoard(sign, cellID);
            turn = false;
        }
    }

    const changeTurn = () => turn = turn ? false : true;

    const getName = () => {return name};

    const getSign = () => {return sign};

    const getTurn = () => {return turn};

    return {
        makeMove,
        changeTurn,
        getName,
        getSign,
        getTurn
    }
}

const player1 = Player('Player 1', 'x', true);
const player2 = Player('Player 2', 'o', false);

const gameBoard = (function(player1, player2) {
    let gameBoardInfo = [[null, null,  null],  [null,  null,  null],  [null,  null,  null]];
    const gameWrapper = document.querySelector('div.game-wrapper');
    const cellList = document.querySelector('ul#cell-list');
    const winDisplay = document.querySelector('.win-display');

    const render = () => {
        cellList.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let cell = document.createElement('li');
                cell.setAttribute('row', `${i}`);
                cell.setAttribute('column', `${j}`);
                cell.classList.add('cell');
                cell.innerHTML = gameBoardInfo[i][j];
                cellList.appendChild(cell);
                if (gameBoardInfo[i][j] === null) {
                    cell.addEventListener('click', putSign);
                }
            }
        }
    };

    const clickOnBoard = (sign, cellRow, cellColumn) => {
        gameBoardInfo[cellRow][cellColumn] = sign;
        render();
    };

    const putSign = (event) => {
        const cell = event.target;
        const player = getCurrentPlayer();
        clickOnBoard(player.getSign(), cell.getAttribute('row'), cell.getAttribute('column'));
        if (checkWin(player.getSign())) {
            launchWinSequence(player);
        }
        player1.changeTurn();
        player2.changeTurn();
    };

    const getCurrentPlayer = () => {
        if (player1.getTurn()) {
            return player1;
        }
        else {
            return player2;
        }
    };

    const launchWinSequence = (player) => {
        if (checkWin(player.getSign()) === 'Tie!') {
            winDisplay.textContent = `Tie!`;
        }
        else {
            winDisplay.textContent = `${player.getName()} win!`;
            const cells = Array.from(document.querySelectorAll('.cell'));
            cells.forEach(cell => cell.removeEventListener('click', putSign));
        }
    };

    const reset = () => {
        gameBoardInfo = [[null, null,  null],  [null,  null,  null],  [null,  null,  null]];
        winDisplay.textContent = '';
        player1.changeTurn();
        player2.changeTurn();
        render();
    };

    const checkWin = (sign) => {
        let pressedCellNumber = 0;
        for (let i = 0; i < 3; i++) {
            let winCount = 0;
            for (let j = 0; j < 3; j++) {
                if (gameBoardInfo[i][j] === sign) {
                    winCount++;
                }
                if (gameBoardInfo[i][j] !== null) {
                    pressedCellNumber++;
                }
            }
            if (winCount === 3) {
                return true;
            }
        }
        if (pressedCellNumber === 9) {
            return 'Tie!';
        }
        for (let i = 0; i < 3; i++) {
            let winCount = 0;
            for (let j = 0; j < 3; j++) {
                if (gameBoardInfo[j][i] === sign) {
                    winCount++;
                }
            }
            if (winCount === 3) {
                return true;
            }
        }
        if (gameBoardInfo[0][0] === sign &&
            gameBoardInfo[1][1] === sign &&
            gameBoardInfo[2][2] === sign) {
                return true;
            }
        if (gameBoardInfo[0][2] === sign &&
            gameBoardInfo[1][1] === sign &&
            gameBoardInfo[2][0] === sign) {
                return true;
            }
        return false;
    };

    render();

    return {
        clickOnBoard,
        reset
    };
})(player1, player2);
