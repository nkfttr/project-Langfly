document.addEventListener('DOMContentLoaded', function() {
    // ELEMENTOS
    const player = document.getElementById('player');
    const phaseElements = document.querySelectorAll('.phase');

    // INDICE INICIAL DA FASE NO ARRAY
    let currentPhase = 0;

    // POSIÇOES NAS FASES SVG
    const phasePositions = Array.from(phaseElements).map(phase => {
        // VERIFICA O ELEMNTO, NO CASO TEXT
        if (phase.tagName === 'text') {
            return {
                x: parseFloat(phase.getAttribute('x')),
                y: parseFloat(phase.getAttribute('y'))
            };
        }
    });

    // ATUAIZAÇÃO DA POSIÇÃO DO PLAYER
    function updatePlayerPosition() {
        // Atualiza a posição para a fase atual
        const targetPos = phasePositions[currentPhase];
        // VERIFICA A TAG DO JOGADOR, SENDO UM CIRCULO
        if (player.tagName === 'circle') {
            // POSIÇÕES DO JOGADOR EM RELAÇÃO ÀS FASES
            player.setAttribute('cx', targetPos.x+20);
            player.setAttribute('cy', targetPos.y-5);
        }

        // ATUALIZAÇÃO DE COORDENADAS
        coords.textContent = `X: ${Math.round(targetPos.x)}`;
        coordsY.textContent = `Y: ${Math.round(targetPos.y)}`;
    }

    // POSICÃO DO JOGADOR
    updatePlayerPosition();

    document.addEventListener('keydown', (event) => {
        // DIREITA
        if (event.key === 'd' || event.key === 'D') {
            //MOVE O PLAYER NO ARRAY
            if (currentPhase < phaseElements.length - 1) {
                currentPhase++;
                updatePlayerPosition();
            }
        }
        // ESQUERDA
        else if (event.key === 'a' || event.key === 'A') {
            //MOVE O PLAYER NO ARRAY
            if (currentPhase > 0) {
                currentPhase--;
                updatePlayerPosition();
            }
        }

        // MUDA PRA FASE1
        if (currentPhase === 1 && event.key === 'k') {
            window.location.href = "..//testes/fase1Teste.html";
        }
    });
});