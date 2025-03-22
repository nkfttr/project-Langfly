let player = document.getElementById("player");
let tiro = document.getElementById("tiro")

let posX = 580, posY = 450; // posição inicial
let posTX = posX, posTY = posY;

document.addEventListener("keydown", (event) => {
    const step = 25, stepT = 10; // distância que ele anda

    if (event.key === "a" && posX >460) {
        posX -= step; // esquerda
    }
    if (event.key === "d" && posX < 680) {
        posX += step; // direita
    }

    if (event.key === "k") {
        let tiroInterval = setInterval(() => {
            if (posTY <= 250) {
                clearInterval(tiroInterval);
                return;
            }
            tiro.style.display = "block"
            posTY -= 10;
            // Move o tiro para cima
            tiro.style.top = posTY + "px";
        }, 10);
        setTimeout(() => {
            posTY = posY;
            posTX = posX;
            tiro.style.display = "none";
        }, 600);
    }
    player.style.left = posX + "px";
    player.style.top = posY + "px";
    tiro.style.top = posTY + "px";
})