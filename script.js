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
    let gameBoardInfo = ['', '',  '',  '',  '',  '',  '',  '',  ''];
    const gameWrapper = document.querySelector('div.game-wrapper');
    const cellList = document.querySelector('ul#cell-list');

    const render = () => {
        cellList.innerHTML = '';
        for (let i = 0; i < gameBoardInfo.length; i++) {
            let cell = document.createElement('li');
            cell.id = `${i}`;
            cell.classList.add('cell');
            cell.innerHTML = gameBoardInfo[i];
            cellList.appendChild(cell);
            if (gameBoardInfo[i] === '') {
                cell.addEventListener('click', putSign);
            }
        }
    };

    const clickOnBoard = (sign, cellID) => {
        gameBoardInfo[cellID] = sign;
        render();
    }

    const putSign = (event) => {
        if (player1.getTurn() === true) {
            clickOnBoard(player1.getSign(), event.target.id);
            player1.changeTurn();
            player2.changeTurn();
        }
        else {
            clickOnBoard(player2.getSign(), event.target.id);
            player1.changeTurn();
            player2.changeTurn();
        }
    }

    render();

    return {
        clickOnBoard,
    };
})(player1, player2);
