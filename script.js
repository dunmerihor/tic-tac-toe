const gameBoard = (function() {
    let gameBoardInfo = ['x', 'o',  'o',  'x',  'o',  'x',  'o',  'x',  'x'];
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
        }
    };
    
    const clickOnBoard = (element, cellID) => {
        gameBoardInfo[cellID] = element;
        render();
    }

    render();
})()