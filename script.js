// Initialize game variables
let grid = [];
let mines = 10;
let gameOver = false;

// Create the game grid
for (let i = 0; i < 10; i++) {
    grid[i] = [];
    for (let j = 0; j < 10; j++) {
        grid[i][j] = {
            mine: false,
            revealed: false,
            flagged: false
        };
    }
}

// Randomly place mines on the grid
for (let i = 0; i < mines; i++) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    grid[x][y].mine = true;
}

// Create the game grid HTML elements
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => {
            revealCell(i, j);
        });
        document.querySelector('.game-grid').appendChild(cell);
    }
}

// Reveal a cell on the grid
function revealCell(x, y) {
    if (grid[x][y].revealed || grid[x][y].flagged) {
        return;
    }
    grid[x][y].revealed = true;
    let cell = document.querySelectorAll('.cell')[x * 10 + y];
    if (grid[x][y].mine) {
        cell.style.background = 'red';
        gameOver = true;
        alert('Game Over!');
    } else {
        let adjacentMines = countAdjacentMines(x, y);
        if (adjacentMines > 0) {
            cell.textContent = adjacentMines;
        } else {
            revealAdjacentCells(x, y);
        }
    }
}

// Count the number of adjacent mines
function countAdjacentMines(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue;
            }
            let adjacentX = x + i;
            let adjacentY = y + j;
            if (adjacentX >= 0 && adjacentX < 10 && adjacentY >= 0 && adjacentY < 10) {
                if (grid[adjacentX][adjacentY].mine) {
                    count++;
                }
            }
        }
    }
    return count;
}

// Reveal all adjacent cells
function revealAdjacentCells(x, y) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue;
            }
            let adjacentX = x + i;
            let adjacentY = y + j;
            if (adjacentX >= 0 && adjacentX < 10 && adjacentY >= 0 && adjacentY < 10) {
                revealCell(adjacentX, adjacentY);
            }
        }
    }
}
