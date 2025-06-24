document.addEventListener('DOMContentLoaded', function () {
    const player = document.getElementById('player');
    const coords = document.getElementById('coords');
    const coordsY = document.getElementById('coordsY');

    const caminhoCurvo = [
        { x: 522, y: 477 }, // ponto inicial
        { x: 529, y: 400 },
        { x: 564, y: 394 },
        { x: 570, y: 429 },
        { x: 615, y: 425 }, // fase 1
        { x: 620, y: 484 },
        { x: 692, y: 491 },
        { x: 692, y: 513 },
        { x: 729, y: 508 },
        { x: 797, y: 505 }, // fase 2
        { x: 794, y: 447 },
        { x: 747, y: 447 },
        { x: 742, y: 392 }
    ];

    // Coordenadas do mouse (debug)
    const svg = document.querySelector('svg');
    svg.addEventListener('mousemove', function(event) {
        const pt = svg.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;
        const localPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
        console.log(`SVG coords → X: ${Math.round(localPoint.x)}, Y: ${Math.round(localPoint.y)}`);
    });

    let posIndex = 0;
    let animando = false;

    // 🦋 Movimento com ease-in-out entre pontos
    function moverParaPontoSuavemente(destino) {
        if (animando) return;
        animando = true;

        const duracao = 300;
        const inicio = performance.now();

        const posInicial = {
            x: parseFloat(player.getAttribute("x")),
            y: parseFloat(player.getAttribute("y"))
        };

        function animar(tempoAgora) {
            const t = Math.min((tempoAgora - inicio) / duracao, 1);
            const ease = t * t * (3 - 2 * t); // easeInOut

            const x = posInicial.x + ((destino.x - 40) - posInicial.x) * ease;
            const y = posInicial.y + ((destino.y - 40) - posInicial.y) * ease;

            player.setAttribute("x", x);
            player.setAttribute("y", y);

            if (coords && coordsY) {
                coords.textContent = `X: ${Math.round(x + 40)}`;
                coordsY.textContent = `Y: ${Math.round(y + 40)}`;
            }

            if (t < 1) {
                requestAnimationFrame(animar);
            } else {
                animando = false;
            }
        }

        requestAnimationFrame(animar);
    }

    // Posição inicial
    moverParaPontoSuavemente(caminhoCurvo[posIndex]);

    document.addEventListener('keydown', (event) => {
        if ((event.key === 'd' || event.key === 'D') && posIndex < caminhoCurvo.length - 1) {
            posIndex++;
            moverParaPontoSuavemente(caminhoCurvo[posIndex]);
        } else if ((event.key === 'a' || event.key === 'A') && posIndex > 0) {
            posIndex--;
            moverParaPontoSuavemente(caminhoCurvo[posIndex]);
        }

        if (posIndex === 4 && event.key === 'k') {//1
            window.location.href = "../fase1/fase1.html";
        }
    });
});
