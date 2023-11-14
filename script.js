const CacheDOM = (function () {
    const cellNodes = [...document.querySelectorAll('.cell')];
    const xIcons = [...document.querySelectorAll('.player1')];
    const oIcons = [...document.querySelectorAll('.player2')];
    const newGameBtn = document.querySelector('#newGameBtn');
    const message = document.querySelector('#message');

    const getCellNodes = () => cellNodes;
    const getXIcons = () => xIcons;
    const getOIcons = () => oIcons;
    const getBtn = () => newGameBtn;
    const getMessageNode = () => message;

    return {
        getCellNodes,
        getXIcons,
        getOIcons,
        getBtn,
        getMessageNode,
    };
})();

const Gameboard = (function () {

    const domCache = CacheDOM;
    const xIcons = domCache.getXIcons();
    const oIcons = domCache.getOIcons();

    const board = [];

    for (let i = 0; i < 9; i++) {
        board.push(Cell(i));
    }

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

    const getBoard = () => board;

    const updateCell = function (event, currentPlayer) {
        const cell = event.target;
        const index = cell.getAttribute('id');
        const xIcon = xIcons.filter((icon) => cell.contains(icon));
        const oIcon = oIcons.filter((icon) => cell.contains(icon));

        if (currentPlayer === "Player One") {
            board[index].updateValue(1);
            xIcon[0].classList.add('display-icon');
        } else {
            board[index].updateValue(2);
            oIcon[0].classList.add('display-icon');
        }
    }

    const getCellPositions = function (player) {
        const cellPositions = board.reduce((cellPositions, cell) => {
            if (cell.getValue() === player) {
                cellPositions.push(cell.getPosition());
            }
            return cellPositions;
        }, []);

        return cellPositions;
    }

    return { getBoard, updateCell, getCellPositions };
})();

const gameController = (function (
    playerOne = "Player One",
    playerTwo = "Player Two"
) {
    const domCache = CacheDOM;
    const cellNodes = domCache.getCellNodes();
    const xIcons = domCache.getXIcons();
    const oIcons = domCache.getOIcons();
    const newGameBtn = domCache.getBtn();
    const message = domCache.getMessageNode();

    message.textContent = `${playerOne}'s Turn`;

    const gameboard = Gameboard;
    const board = gameboard.getBoard();

    let currentPlayer = playerOne;

    newGameBtn.addEventListener('click', startNewGame);

    function startNewGame() {
        cellNodes.forEach((cell) => {
            cell.classList.remove('display-icon');
            cell.setAttribute('data-used', false);
        });

        xIcons.forEach((icon) => {
            icon.classList.remove('display-icon');
        });

        oIcons.forEach((icon) => {
            icon.classList.remove('display-icon');
        });

        board.forEach((cell) => {
            cell.updateValue(0);
        });

        currentPlayer = playerOne;

        message.textContent = `${playerOne}'s Turn`;

        updateCellEvents('removeEventListener');
        updateCellEvents('addEventListener');
    }

    updateCellEvents('addEventListener');

    function updateCellEvents(eventMethod) {
        cellNodes.forEach((cellNode) => {
            cellNode[eventMethod]('click', cellEvents);
        })
    }

    function cellEvents(event) {
        const cellUsed = event.target.getAttribute('data-used');
        if (cellUsed === "false") {
            gameboard.updateCell(event, currentPlayer);
            changePlayers();
            checkScore();
            event.target.setAttribute('data-used', true);
        }
    }

    function changePlayers() {
        currentPlayer = (currentPlayer === playerOne) ?
            playerTwo : playerOne;
        message.textContent = `${currentPlayer}'s Turn`;
    }

    function checkScore() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const p1Cells = gameboard.getCellPositions(1);
        const p2Cells = gameboard.getCellPositions(2);

        const gameWon = winningCombos.some((combo) => {
            const playerOneWins = combo.every(position => {
                return p1Cells.includes(position);
            });

            const playerTwoWins = combo.every(position => {
                return p2Cells.includes(position);
            });

            if (playerOneWins) declareWinner(playerOne);

            if (playerTwoWins) declareWinner(playerTwo);

            return (playerOneWins || playerTwoWins);
        });

        if (gameWon) return;

        const gameTied = board.every((cell) => {
            return cell.getValue();
        });

        if (gameTied) announceTie();

        function declareWinner(player) {
            message.textContent = `${player} Wins!`;
            // console.log(`${player} Wins!`);
            updateCellEvents('removeEventListener');
        }

        function announceTie() {
            message.textContent = "It's a Tie!";
            // console.log("It's a Tie!");
            updateCellEvents('removeEventListener');
        }
    }



})();

