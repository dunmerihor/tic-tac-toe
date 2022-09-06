const Player = (sign, turn) => {
    const makeMove = (isCell, cellID) => {
        if (turn) {
            gameBoard.clickOnBoard(sign, cellID);
            turn = false;
        }
    }

    const changeTurn = () => turn = turn ? false : true;

    const getSign = () => {return sign};

    const getTurn = () => {return turn};

    return {
        makeMove,
        changeTurn,
        getSign,
        getTurn
    }
}

const player1 = Player('x', true);
const player2 = Player('o', false);

const gameBoard = (function(player1, player2) {
    let gameBoardInfo = [[null, null,  null],  [null,  null,  null],  [null,  null,  null]];
    const gameWrapper = document.querySelector('div.game-wrapper');
    const cellList = document.querySelector('ul#cell-list');

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
    }

    const putSign = (event) => {
        const cell = event.target;
        if (player1.getTurn() === true) {
            clickOnBoard(player1.getSign(), cell.getAttribute('row'), cell.getAttribute('column'));
            if (checkWin(player1.getSign())) {
                const winDisplay = document.createElement('div');
                winDisplay.classList.add('win-display');
                winDisplay.textContent = 'Player 1 win!';
                gameWrapper.appendChild(winDisplay);
            }
            player1.changeTurn();
            player2.changeTurn();
        }
        else {
            clickOnBoard(player2.getSign(), cell.getAttribute('row'), cell.getAttribute('column'));
            if (checkWin(player2.getSign())) {
                const winDisplay = document.createElement('div');
                winDisplay.classList.add('win-display');
                winDisplay.textContent = 'Player 2 win!';
                gameWrapper.appendChild(winDisplay);
            }
            player1.changeTurn();
            player2.changeTurn();
        }
    }

    const checkWin = (sign) => {
        for (let i = 0; i < 3; i++) {
            let winCount = 0;
            for (let j = 0; j < 3; j++) {
                if (gameBoardInfo[i][j] === sign) {
                    winCount++;
                }
            }
            if (winCount === 3) {
                return true;
            }
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
    };
})(player1, player2);
