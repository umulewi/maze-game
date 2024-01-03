document.addEventListener('DOMContentLoaded', function () {
    const maze = document.getElementById('maze');
    let playerPosition = { row: 0, col: 0 };

    // Define your maze layout (0 for empty cell, 1 for wall)
    const mazeLayout = [
        [0, 0, 1, 0, 0],
        [1, 0, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [1, 1, 0, 0, 0],
        [0, 1, 1, 1, 0]
    ];

    function renderMaze() {
        maze.innerHTML = '';

        for (let row = 0; row < mazeLayout.length; row++) {
            for (let col = 0; col < mazeLayout[row].length; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');

                if (mazeLayout[row][col] === 1) {
                    cell.classList.add('wall');
                }

                maze.appendChild(cell);
            }
        }

        updatePlayerPosition();
    }

    function updatePlayerPosition() {
        const playerCell = maze.children[playerPosition.row * mazeLayout[0].length + playerPosition.col];
        playerCell.classList.add('player');
    }

    function movePlayer(direction) {
        const newPosition = { ...playerPosition };

        switch (direction) {
            case 'up':
                newPosition.row = Math.max(0, playerPosition.row - 1);
                break;
            case 'down':
                newPosition.row = Math.min(mazeLayout.length - 1, playerPosition.row + 1);
                break;
            case 'left':
                newPosition.col = Math.max(0, playerPosition.col - 1);
                break;
            case 'right':
                newPosition.col = Math.min(mazeLayout[0].length - 1, playerPosition.col + 1);
                break;
        }

        if (mazeLayout[newPosition.row][newPosition.col] !== 1) {
            const playerCell = maze.children[playerPosition.row * mazeLayout[0].length + playerPosition.col];
            playerCell.classList.remove('player');

            playerPosition = newPosition;
            updatePlayerPosition();
        }

        checkWinCondition();
    }

    function checkWinCondition() {
        if (playerPosition.row === mazeLayout.length - 1 && playerPosition.col === mazeLayout[0].length - 1) {
            alert('Congratulations! You won!');
            // You can add more logic here, such as restarting the game.
        }
    }

    renderMaze();

    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'ArrowUp':
                movePlayer('up');
                break;
            case 'ArrowDown':
                movePlayer('down');
                break;
            case 'ArrowLeft':
                movePlayer('left');
                break;
            case 'ArrowRight':
                movePlayer('right');
                break;
        }
    });
});
