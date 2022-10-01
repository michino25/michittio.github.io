let board;
let context;
let blockSize = 20;
let cols = 30;
let rows = 20;

let appleAudio;
let leverUpAudio;
let gameOverAudio;

let snakeX = 0;
let snakeY = 0;
let tail = [];

let foodX;
let foodY;

let score = 0;

let velocityX = 1;
let velocityY = 0;

let gameOver = false;

let scoreElement = document.querySelector('.game-card__desc div');

window.onload = () => {
    board = document.querySelector(".game-card__board");
    context = board.getContext("2d");

    appleAudio = new Audio('./sound/apple_sound.mp3');
    gameOverAudio = new Audio('./sound/game_over_sound.mp3');
    leverUpAudio = new Audio('./sound/lever_up_sound.mp3');

    board.width = cols * blockSize;
    board.height = rows * blockSize;

    document.addEventListener('keyup', changeDirection)

    board.addEventListener('click', () => {
        gameOver = false;
        score = 0;
    });
    
    document.addEventListener('keyup', function(e) {
        if (e.code == "Space" && gameOver == true) {
            gameOver = false;
            score = 0;
        }
    });

    foodPlace();

    // ------ change speed ------
    setInterval(update, 1000 / 8)
}

function update() {

    // Clear screen
    createRect(0, 0, board.width, board.height)

    if (gameOver) {

        // Game end screen

        createText(`Game Over`, board.width / 2, board.height / 2 - 25, 'center', 50);

        createText(`Score: ${score}`, board.width / 2, board.height / 2 + 25, 'center');

        createText(`Mouse click or press Space to Start Again`, (cols * blockSize) / 2, board.height - 50, 'center');

        return
    }

    // Write score
    // createText(`Score: ${score}`, 30, 40);
    scoreElement.innerHTML = `Score: ${score}`;

    // Create first food
    createRect(foodX, foodY, blockSize, blockSize, "red");

    // Did it eat
    if (snakeX == foodX && snakeY == foodY) {
        tail.push([foodX, foodY]);

        score += 10;

        if (score % 50 == 0) {
            leverUpAudio.volume = 0.1;
            leverUpAudio.play();
        } else {
            appleAudio.volume = 0.6;
            appleAudio.play();
        }

        foodPlace()
    }

    // Snake tail
    for (let i = tail.length - 1; i > 0; i--) {
        tail[i] = tail[i - 1];
    }

    if (tail.length) {
        tail[0] = [snakeX, snakeY];
    }

    // prevent kill self  // 
    if (tail.length >= 2)
        if (snakeX + (velocityX * blockSize) == tail[1][0] && snakeY + (velocityY * blockSize) == tail[1][1]) {
            velocityX = -velocityX;
            velocityY = -velocityY;
        }

    // Snake position
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // Dont have hit wall rule
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {

        if (snakeX < 0 )
            snakeX += cols * blockSize;
        
        if (snakeX >= cols * blockSize)
            snakeX -= cols * blockSize; 

        if (snakeY < 0 )
            snakeY += rows * blockSize; 

        if (snakeY >= rows * blockSize )
            snakeY -= rows * blockSize; 
    } 

    createRect(snakeX, snakeY, blockSize, blockSize, 'orange');

    for (let i = 0; i < tail.length; i++) { 
        createRect(tail[i][0], tail[i][1], blockSize, blockSize, 'lime');
    }

    // Hit the wall
    // if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
    //     gameOverEvent()
    // } 

    // Shot herself
    for (let i = 1; i < tail.length; i++) {
        if (snakeX == tail[i][0] && snakeY == tail[i][1]) {
            gameOverEvent()
        }
    }
}

function foodPlace() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
    if (e.code == "ArrowUp") {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown") {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft") {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight") {
        velocityX = 1;
        velocityY = 0;
    }
}

function gameOverEvent() {
    gameOver = true;
    gameOverAudio.volume = 0.5;
    gameOverAudio.play();
    tail = [];
    snakeX = 0;
    snakeY = 0;
    velocityX = 1;
    velocityY = 0;
}

function createRect(x, y, width, height, color = "rgba(0, 0, 0, 0.95)") {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function createText(text, x, y, textAlign = "start", fontSize = 20 ) {
    context.fillStyle = "white";
    context.font = `${fontSize}px 'Nunito', sans-serif`;
    context.textAlign = textAlign;
    context.fillText(text, x, y)
}
