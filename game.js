// Game constants
const GRID_SIZE = 20;
const TILE_COUNT = 20;
const TILE_SIZE = 10;

// Game state
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gameSpeed = 150;
let gameLoop;

// DOM elements
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const startBtn = document.getElementById('start-btn');

// Initialize game
function init() {
    canvas.width = TILE_COUNT * TILE_SIZE;
    canvas.height = TILE_COUNT * TILE_SIZE;
    highScoreDisplay.textContent = highScore;
    startBtn.addEventListener('click', startGame);

    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
                if (direction !== 'down') nextDirection = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') nextDirection = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') nextDirection = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') nextDirection = 'right';
                break;
        }
    });
}

function startGame() {
    if (gameRunning) return;
    snake = [{x: 5, y: 10}, {x: 4, y: 10}, {x: 3, y: 10}];
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    scoreDisplay.textContent = score;
    generateFood();
    gameRunning = true;
    gameLoop = setInterval(gameTick, gameSpeed);
}

function generateFood() {
    let newFood;
    let validPosition = false;

    while (!validPosition) {
        newFood = {
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT)
        };
        validPosition = true;
        for (let segment of snake) {
            if (segment.x === newFood.x && segment.y === newFood.y) {
                validPosition = false;
                break;
            }
        }
    }
    food = newFood;
}

function gameTick() {
    direction = nextDirection;
    const head = {x: snake[0].x, y: snake[0].y};

    switch(direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }

    if (checkCollision(head)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        generateFood();
        if (score % 5 === 0 && gameSpeed > 50) {
            gameSpeed -= 10;
            clearInterval(gameLoop);
            gameLoop = setInterval(gameTick, gameSpeed);
        }
    } else {
        snake.pop();
    }

    draw();
}

function checkCollision(head) {
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    clearInterval(gameLoop);
    gameRunning = false;
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = highScore;
        localStorage.setItem('snakeHighScore', highScore);
    }
    gameSpeed = 150;
}

function draw() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        ctx.fillStyle = (i === 0) ? '#0f0' : '#0a0';
        ctx.fillRect(
            segment.x * TILE_SIZE,
            segment.y * TILE_SIZE,
            TILE_SIZE - 1,
            TILE_SIZE - 1
        );
    }

    ctx.fillStyle = '#f00';
    ctx.fillRect(
        food.x * TILE_SIZE,
        food.y * TILE_SIZE,
        TILE_SIZE - 1,
        TILE_SIZE - 1
    );

    ctx.strokeStyle = '#222';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < TILE_COUNT; i++) {
        ctx.beginPath();
        ctx.moveTo(i * TILE_SIZE, 0);
        ctx.lineTo(i * TILE_SIZE, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * TILE_SIZE);
        ctx.lineTo(canvas.width, i * TILE_SIZE);
        ctx.stroke();
    }
}

init();
draw();