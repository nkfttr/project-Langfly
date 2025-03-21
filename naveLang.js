const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const nave = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 80,
    width: 50,
    height: 50,
    speed: 10
};

const tiros = [];
const teclas = {};

window.addEventListener("keydown", (e) => teclas[e.code] = true);
window.addEventListener("keyup", (e) => teclas[e.code] = false);

function moverNave() {
    if (teclas["ArrowLeft"] && nave.x > 0) {
        nave.x -= nave.speed;
    }
    if (teclas["ArrowRight"] && nave.x < canvas.width - nave.width) {
        nave.x += nave.speed;
    }
}

function atirar() {
    if (teclas["Space"]) {
        tiros.push({ x: nave.x + nave.width / 2 - 5, y: nave.y, width: 10, height: 20, speed: 7 });
        teclas["Space"] = false;
    }
}

function atualizarTiros() {
    for (let i = 0; i < tiros.length; i++) {
        tiros[i].y -= tiros[i].speed;
        if (tiros[i].y < 0) {
            tiros.splice(i, 1);
            i--;
        }
    }
}

function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a nave
    ctx.fillStyle = "white";
    ctx.fillRect(nave.x, nave.y, nave.width, nave.height);

    // Desenha os tiros
    ctx.fillStyle = "red";
    for (const tiro of tiros) {
        ctx.fillRect(tiro.x, tiro.y, tiro.width, tiro.height);
    }
}

function loop() {
    moverNave();
    atirar();
    atualizarTiros();
    desenhar();
    requestAnimationFrame(loop);
}

loop();