// 게임 캔버스 설정
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 캔버스 크기 설정
canvas.width = 800;
canvas.height = 600;

// 플레이어 객체
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 7,
    dx: 0
};

// 돌 배열
const rocks = [];
const rockSpeed = 3;

// 키 입력 감지
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    }
}

// 플레이어 이동
function movePlayer() {
    if (rightPressed && player.x < canvas.width - player.width) {
        player.x += player.speed;
    } else if (leftPressed && player.x > 0) {
        player.x -= player.speed;
    }
}

// 돌 생성 및 이동
function createRocks() {
    if (Math.random() < 0.02) {
        const rockWidth = Math.random() * 40 + 20; // 20~60px
        const rockX = Math.random() * (canvas.width - rockWidth);
        rocks.push({
            x: rockX,
            y: 0,
            width: rockWidth,
            height: 20,
            speed: rockSpeed
        });
    }
}

function moveRocks() {
    for (let i = 0; i < rocks.length; i++) {
        rocks[i].y += rocks[i].speed;
        if (rocks[i].y > canvas.height) {
            rocks.splice(i, 1);
            i--;
        }
    }
}

// 충돌 감지
function detectCollisions() {
    for (let i = 0; i < rocks.length; i++) {
        if (player.x < rocks[i].x + rocks[i].width &&
            player.x + player.width > rocks[i].x &&
            player.y < rocks[i].y + rocks[i].height &&
            player.y + player.height > rocks[i].y) {
            gameOver();
        }
    }
}

// 게임 오버 처리
function gameOver() {
    alert('게임 오버!');
    document.location.reload();
}

// 게임 루프
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePlayer();
    createRocks();
    moveRocks();
    detectCollisions();
    
    // 플레이어 그리기
    ctx.fillStyle = '#ff6347'; // 플레이어 색상 (Tomato)
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // 돌 그리기
    ctx.fillStyle = '#8B4513'; // 돌 색상 (SaddleBrown)
    for (let i = 0; i < rocks.length; i++) {
        ctx.fillRect(rocks[i].x, rocks[i].y, rocks[i].width, rocks[i].height);
    }

    requestAnimationFrame(gameLoop); // 게임 루프 계속 실행
}

// 게임 시작
gameLoop();
