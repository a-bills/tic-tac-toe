//gameboard object

//player objects

//gameController object

//display function

//score function

const Gameboard = function () {

    const board = [];

    for (let i = 0; i < 9; i++) {
        board.push(Cell(i));
    }

    const getBoard = () => board;


    return {getBoard};
}

function Cell(i) {
    let value = 0;
    const position = i;

    const updateValue = (player) => {
        value = player;
    };

    const getValue = () => value;

    const getPosition = () => position;

    return {
        updateValue,
        getValue,
        getPosition
    };
}

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


*/

const gameController = function () {


    return {};
}

