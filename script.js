//gameboard object

//player objects

//gameController object

//display function

//score function

/* 
 const winningCombos = [123, 456, 789, 147, 258, 369, 159, 357]
 horizontal: 123, 456, 789
 vertical: 147, 258, 369
 diagonal: 159, 357

 need to check if all cells have been selected for game ending tie

 have a gameboard array containing cells

 each cell has a private variable and methods to update / retrieve that variable

 after each turn, loop over gameboard and check cell values for a winning combo

 for (let i=0; i<gameboardArr.length; i++) {
    const cellValue = gameboardArr[i].getValue();
    const playerOneCells = [];
    const playerTwoCells = [];
    if (cellValue === 1) {
        playerOneCells.push(i);
    }
 }

 Or Array.filter for cells with specific value instead of using that loop

*/

const InitializeDOM = (function () {
    const cellNodes = [...document.querySelectorAll('.cell')];
    const xIcons = [...document.querySelectorAll('.player1')];
    const oIcons = [...document.querySelectorAll('.player2')];

    const getCellNodes = () => cellNodes;
    const getXIcons = () => xIcons;
    const getOIcons = () => oIcons;

    return { getCellNodes, getXIcons, getOIcons };
})();

const Gameboard = (function () {

    const domCache = InitializeDOM;
    const xIcons = domCache.getXIcons();
    const oIcons = domCache.getOIcons();

    const board = [];

    for (let i = 0; i < 9; i++) {
        board.push(Cell(i));
    }

    const getBoard = () => board;

    const updateCell = function (event, currentPlayer) {
        const index = event.target.getAttribute('id');
        console.log(event.target);
        const xIcon = xIcons.filter((icon) => event.target.contains(icon));
        const oIcon = oIcons.filter((icon) => event.target.contains(icon));

        if (currentPlayer === "Player One") {
            board[index].updateValue(1);
            xIcon[0].classList.add('display-icon');
        } else {
            board[index].updateValue(2);
            oIcon[0].classList.add('display-icon');   
        }
    }

    return { getBoard, updateCell };
})();

function Cell(i) {
    let value = 0;
    const position = i;

    const updateValue = (player) => {
        value = player;
    };

    const getValue = () => value;

    const getPosition = () => position;

    return { updateValue, getValue, getPosition };
}

const gameController = (function (
    playerOne = "Player One",
    playerTwo = "Player Two"
) {
    const domCache = InitializeDOM;
    const cellNodes = domCache.getCellNodes();

    const gameboard = Gameboard;

    let currentPlayer = playerOne;

    const changePlayers = function () {
        currentPlayer = (currentPlayer === playerOne) ?
            playerTwo : playerOne;
    }

    cellNodes.forEach((cellNode) => {
        cellNode.addEventListener('click', (event) => {
            gameboard.updateCell(event, currentPlayer);
            changePlayers();
            //checkScore();
        });
    });

    return {};
})();

