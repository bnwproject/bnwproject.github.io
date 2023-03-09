// Set up canvas context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set up game board
const CELL_SIZE = 20;
const NUM_ROWS = canvas.height / CELL_SIZE;
const NUM_COLS = canvas.width / CELL_SIZE;
let gameBoard = [];

// Create the snake
let snake = {
  body: [{x: 5, y: 5}],
  direction: 'right'
};

// Set up game loop
function gameLoop() {
  // Move the snake
  moveSnake();

  // Detect collisions
  if (isCollision()) {
    // End the game
    alert('Game over!');
    clearInterval(intervalId);
    return;
  }

  // Draw the game board and the snake
  drawGameBoard();
  drawSnake();
}

// Move the snake
function moveSnake() {
  // Create new head position
  let newHead = {x: snake.body[0].x, y: snake.body[0].y};
  switch (snake.direction) {
    case 'up':
      newHead.y--;
      break;
    case 'down':
      newHead.y++;
      break;
    case 'left':
      newHead.x--;
      break;
    case 'right':
      newHead.x++;
      break;
  }

  // Add new head to the beginning of the snake's body
  snake.body.unshift(newHead);

  // Remove tail segment
  snake.body.pop();
}

// Detect collisions
function isCollision() {
  // Check for collision with game board boundaries
  if (snake.body[0].x < 0 ||
      snake.body[0].x >= NUM_COLS ||
      snake.body[0].y < 0 ||
      snake.body[0].y >= NUM_ROWS) {
    return true;
  }

  // Check for collision with snake's body
  for (let i = 1; i < snake.body.length; i++) {
    if (snake.body[0].x === snake.body[i].x &&
        snake.body[0].y === snake.body[i].y) {
      return true;
    }
  }

  return false;
}

// Draw the game board
function drawGameBoard() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw each cell on the game board
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      if (gameBoard[row][col] === 1) {
        // Draw filled cell
        ctx.fillStyle = 'black';
        ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      } else {
        // Draw empty cell
        ctx.strokeStyle = 'gray';
        ctx.strokeRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

// Draw the snake
function drawSnake() {
  for (let i = 0; i < snake.body.length; i++)
