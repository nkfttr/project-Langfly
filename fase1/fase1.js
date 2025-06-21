// Configuração do jogo
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const ctxText = canvas.getContext("2d");
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const restartButton = document.getElementById('restartButton');
const backButton = document.getElementById('backButton');
const wordPt = document.getElementById('ptWord');


//geração do objeto do desenho da nave
const imgNave = new Image();
imgNave.src = "../imgs/flyIng.png";

const imgExplosion = new Image();
imgExplosion.src= "../imgs/sprites/tirospr1.png";

// Variáveis do jogo
let score = 0;
let gameActive = true;
let animationId;
// Nave do jogador
const ship = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 50,
    width: 30,
    height: 30,
    speed: 5,
    color: '#00BFFF', //nao mais utilizada por causa da geração da imagem
    dx: 0,  // direção x
    bullets: [],
    shoot() {
        this.bullets.push({
            x: this.x + this.width / 2 - 2.5,
            y: this.y,
            width: 5,
            height: 10,
            color: '#FF0'
        });
    }
};

const textsPt = ["Ela", "Cavalo", "Ele", "Zebra"];
const textsIng = ["She", "Horse", "He", "Zebra"];


// blocos inimigos
let blocks = [];
let starsArray = [];

let ptIndex = 0;
let randomIngTextAtual = "";

// função para iniciar o jogo
function init() {
    ship.x = canvas.width / 2 - 15;
    ship.y = canvas.height - 50;
    ship.bullets = [];
    blocks = [];
    score = 0;
    gameActive = true;

    //Iniciar randomização de palavras ptWord
    novaRodada();

    // Criar blocos iniciais
    createBlocks();

    // Atualizar pontuação
    updateScore();

    // Esconder tela de game over
    gameOverElement.style.display = 'none';

    // Iniciar loop do jogo
    gameLoop();



}

function novaRodada() {
    ptIndex = Math.floor(Math.random() * textsPt.length);
    randomIngTextAtual = textsIng[ptIndex];
    wordPt.textContent = textsPt[ptIndex];
}

// função para criar blocos
function createBlocks() {
    while (blocks.length < 3) {
        const size = 80;

        const texto = (blocks.length === 0)
            ? randomIngTextAtual
            : textsIng[Math.floor(Math.random() * textsIng.length)];

        blocks.push({
            x: Math.random() * (canvas.width - size),
            y: -size,
            width: size,
            height: size,
            color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
            speed: Math.random() * 2 + 1,
            text: texto
        });
    }

    // embaralhar os blocos para que o correto não fique sempre no index 0
    blocks.sort(() => Math.random() - 0.5);
}

function createExplosion(x, y){
    ctx.drawImage(imgExplosion, x, y, 120, 120);
}

function drawRoundedRect(ctx, x, y, width, height, radius, color) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}


// Função para desenhar a nave
function drawShip() {

    if (imgNave.complete){
        ctx.drawImage(imgNave, ship.x, ship.y, ship.width, ship.height);
    }
    else{
        ctx.fillStyle = ship.color;
        ctx.beginPath();
        ctx.moveTo(ship.x + ship.width / 2, ship.y);
        ctx.lineTo(ship.x + ship.width, ship.y + ship.height);
        ctx.lineTo(ship.x, ship.y + ship.height);
        ctx.closePath();
        ctx.fill();
    }

}

// Função para desenhar os projéteis
function drawBullets() {
    ship.bullets.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

// Função para desenhar os blocos
function drawBlocks() {
    blocks.forEach(block => {
        // Sombra e estilo
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;

        // Desenhar bloco com cantos arredondados
        drawRoundedRect(ctx, block.x, block.y, block.width, block.height, 12, block.color);

        // Resetar sombra para não afetar o texto
        ctx.shadowColor = "transparent";

        // Texto centralizado
        ctxText.fillStyle = "white";
        ctxText.font = "bold 18px 'Arial'";
        ctxText.textAlign = "center";
        ctxText.textBaseline = "middle";
        ctxText.fillText(block.text, block.x + block.width / 2, block.y + block.height / 2);
    });
}


// Função para atualizar a posição da nave
function updateShip() {
    if (keys.ArrowLeft) {
        ship.dx = -ship.speed;
    } else if (keys.ArrowRight) {
        ship.dx = ship.speed;
    } else {
        ship.dx = 0;
    }

    // Atualizar posição
    ship.x += ship.dx;

    // Limitar ao canvas
    if (ship.x < 0) {
        ship.x = 0;
    } else if (ship.x + ship.width > canvas.width) {
        ship.x = canvas.width - ship.width;
    }
}

// Variável para controlar o disparo
let shootCooldown = 0;

// Função para atualizar os projéteis
function updateBullets() {
    // Cooldown de tiro
    if (shootCooldown > 0) {
        shootCooldown--;
    }

    // Verificar se o jogador está atirando
    if (keys.Space && shootCooldown === 0) {
        ship.shoot();
        shootCooldown = 15; // Delay entre tiros
    }

    // Mover projéteis
    for (let i = ship.bullets.length - 1; i >= 0; i--) {
        ship.bullets[i].y -= 5;

        // Remover projéteis fora da tela
        if (ship.bullets[i].y < 0) {
            ship.bullets.splice(i, 1);
        }
    }
}

// Função para atualizar os blocos
function updateBlocks() {

    for (let i = blocks.length - 1; i >= 0; i--) {
        blocks[i].y += blocks[i].speed;

        // Verificar colisão com projéteis
        for (let j = ship.bullets.length - 1; j >= 0; j--) {
            if (
                ship.bullets[j].x < blocks[i].x + blocks[i].width &&
                ship.bullets[j].x + ship.bullets[j].width > blocks[i].x &&
                ship.bullets[j].y < blocks[i].y + blocks[i].height &&
                ship.bullets[j].y + ship.bullets[j].height > blocks[i].y
            ) {
                // Colisão detectada
                ship.bullets.splice(j, 1);

                const blockX = blocks[i].x;
                const blockY = blocks[i].y;

                if (blocks[i].text === randomIngTextAtual) {
                    starsArray.push("⭐");
                }
                blocks.splice(i, 1);
                createExplosion(blockX, blockY);
                score += 10;
                updateScore();
                createBlocks(); // Criar novo bloco
                break;
            }
        }

        // Verificar se bloco saiu da tela
        if (blocks[i] && blocks[i].y > canvas.height) {
            blocks.splice(i, 1);

            createBlocks(); // Criar novo bloco
        }

        // Verificar colisão com a nave
        if (
            blocks[i] &&
            ship.x < blocks[i].x + blocks[i].width &&
            ship.x + ship.width > blocks[i].x &&
            ship.y < blocks[i].y + blocks[i].height &&
            ship.y + ship.height > blocks[i].y
        ) {
            // Game over
            gameOver();
        }
    }
}

//Gera textos aleatorios para os blocos

function checkWord(){
        return ingIndex === ptIndex;
}

backButton.addEventListener('keydown', function(event){
    if(event.code === "Space" || event.code ==="Spacebar"){
        event.preventDefault();
    }
});

// Função para atualizar a pontuação
function updateScore() {
    scoreStars();
    scoreElement.textContent = `${starsArray}`;
}

//Adiciona estrelas ao inves de numeros na pontuação
function scoreStars(){
    //limpa o array antes de adicionar novas estrelas à exibição, para nao adicionar mais deuma

    //traduz a numeração da pontuação para somente um digito, limitando a somente 3 estrelas
    let starCount = Math.min(3, Math.floor(score / 100));
    //adiciona ao array uma estrela a cada centena
    if(score > 99 && starsArray.length <= 2) {

        for (let i = 1; i <= starCount; i++) {
            starsArray.push("⭐")
        }
    }
}

// Função de game over
function gameOver() {
    gameActive = false;
    finalScoreElement.textContent = score;
    gameOverElement.style.display = 'block';
    cancelAnimationFrame(animationId);
}

// Loop principal do jogo

function gameLoop() {
    if (!gameActive) return;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualizar elementos
    updateShip();
    updateBullets();
    updateBlocks();

    // Desenhar elementos
    drawShip();
    drawBullets();
    drawBlocks();

    // Continuar o loop
    animationId = requestAnimationFrame(gameLoop);
}
// cntroles
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    Space: false
};
// Event listeners para controles
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') keys.ArrowLeft = true;
    if (e.code === 'ArrowRight') keys.ArrowRight = true;
    if (e.code === 'Space') keys.Space = true;
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft') keys.ArrowLeft = false;
    if (e.code === 'ArrowRight') keys.ArrowRight = false;
    if (e.code === 'Space') keys.Space = false;
});


// Event listener para reiniciar o jogo
restartButton.addEventListener('click', init);
// Iniciar o jogo
init();