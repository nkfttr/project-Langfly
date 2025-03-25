let player = document.getElementById("player");

let posX = 580, posY = 450; // Posição inicial do jogador

document.addEventListener("keydown", (event) => {
    const step = 25; // Distância que o jogador anda

    if (event.key === "a" && posX > 560) {
        posX -= step; // Esquerda
    }
    if (event.key === "d" && posX < 800) {
        posX += step; // Direita
    }
    if (event.key === "k") {
        dispararTiro();
    }

    player.style.left = posX + "px";
    player.style.top = posY + "px";
});

function dispararTiro() {
    let tiro = document.createElement("div");
    tiro.classList.add("tiro");
    document.body.appendChild(tiro);

    let tiroX = posX; // Centraliza o tiro no meio do player
    let tiroY = posY-30;

    tiro.style.left = tiroX + "px";
    tiro.style.top = tiroY + "px";

    let tiroInterval = setInterval(() => {
        if (tiroY <= 0) {
            clearInterval(tiroInterval);
            tiro.remove();
            return;
        }

        tiroY -= 10;
        tiro.style.top = tiroY + "px";

        let blocos = document.querySelectorAll(".bloco"); // Atualiza a lista de blocos
        for (let i = 0; i < blocos.length; i++) {
            if (colisao(tiro, blocos[i])) {
                clearInterval(tiroInterval);
                tiro.remove();
                blocos[i].style.display = "none"; // Remove o bloco ao colidir
                break; // Sai do loop para evitar acessar um elemento removido
            }
        }
    }, 10);
}

// Função para checar colisão entre o tiro e o bloco
function colisao(tiro, bloco) {
    let tiroRect = tiro.getBoundingClientRect();
    let blocoRect = bloco.getBoundingClientRect();

    return (
        tiroRect.left < blocoRect.right &&
        tiroRect.right > blocoRect.left &&
        tiroRect.top < blocoRect.bottom &&
        tiroRect.bottom > blocoRect.top
    );
}
