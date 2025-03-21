let currentPhase = 0;
const phases = document.querySelectorAll('.phase');
const player = document.getElementById('player');

// Armazena as posições das fases
const phasePositions = Array.from(phases).map(phase => ({
    top: phase.offsetTop +20+ phase.offsetHeight / 2, //pega o horizontal da tela e posiciona no centro
    left: phase.offsetLeft -3 + phase.offsetWidth / 2 //pega o vertical da tela e posiciona no centro
}));


function updatePlayerPosition() {
    player.style.top = `${phasePositions[currentPhase].top}px`; //100px
    player.style.left = `${phasePositions[currentPhase].left}px`; //100px
}

updatePlayerPosition(); //posiciona o player no centro

document.addEventListener('keydown', (event) => {
    if (event.key === 'd' || event.key === 'D') { // movimentação
        if (currentPhase < phases.length - 1) {
            currentPhase++; // altera a posição no array phasePositions
            updatePlayerPosition(); //altera a posição do player
        }
    } else if (event.key === 'a' || event.key === 'A') { // movimentação
        if (currentPhase > 0) {
            currentPhase--;
            updatePlayerPosition();
        }
    }
    if(currentPhase == 1 && event.key === "k"){

        window.location.href = "fase1.html"
    }
});