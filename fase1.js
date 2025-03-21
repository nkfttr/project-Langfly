let player = document.getElementById("player");
let tiro = document.getElementById("tiro")

let posX = 580, posY = 450; // Posição inicial
let posTX = posX, posTY = posY;

document.addEventListener("keydown", (event) => {
    const step = 25, stepT = 10; // Distância que ele anda

    if (event.key === "a" && posX >460) {
        posX -= step; // Esquerda
    }
    if (event.key === "d" && posX < 680) {
        posX += step; // Direita
    }

    if (event.key === "k") {
        tiro.style.display = "block"
        let tiroInterval = setInterval(() => {
            if (posTY <= 250) {
                clearInterval(tiroInterval);
                return;
            }
            posTY -= 10; // Move o tiro para cima
            tiro.style.top = posTY + "px";
        }, 50);
        setTimeout(() => {
            tiro.style.display = "none";
            posTY = posY;
            posTX = posX;
        }, 2000);
    }
    player.style.left = posX + "px";
    player.style.top = posY + "px";
    tiro.style.top = posTY + "px";
})