document.addEventListener('DOMContentLoaded', function () {
    const player = document.getElementById('player');
    const coords = document.getElementById('coords');
    const coordsY = document.getElementById('coordsY');

    // ✅ Caminho rosa da borboleta (com novo ponto inicial em x:600, y:435)
    const caminhoCurvo = [
        { x: 522, y: 477 },// ponto inicial
        { x: 529, y: 400 },
        { x: 564, y: 394 },
        { x: 570, y: 429 },
        { x: 615, y: 425 },// fase 1
        { x: 620, y: 484 },
        { x: 692, y: 491 },
        { x: 692, y: 513 },
        { x: 729, y: 508 },
        { x: 797, y: 505 },// fase 2
        { x: 500, y: 345 },
    ];

    const svg = document.querySelector('svg');
    svg.addEventListener('mousemove', function(event) {
        const pt = svg.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;
        const localPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
        console.log(`SVG coords → X: ${Math.round(localPoint.x)}, Y: ${Math.round(localPoint.y)}`);
    });

    let posIndex = 0; // começa em 600x435

    function moverParaPontoAtual() {
        const target = caminhoCurvo[posIndex];
        if (player.tagName === 'circle') {
            player.setAttribute('cx', target.x);
            player.setAttribute('cy', target.y);
        }

        if (coords && coordsY) {
            coords.textContent = `X: ${Math.round(target.x)}`;
            coordsY.textContent = `Y: ${Math.round(target.y)}`;
        }
    }

    moverParaPontoAtual();

    document.addEventListener('keydown', (event) => {
        if ((event.key === 'd' || event.key === 'D') && posIndex < caminhoCurvo.length - 1) {
            posIndex++;
            moverParaPontoAtual();
        } else if ((event.key === 'a' || event.key === 'A') && posIndex > 0) {
            posIndex--;
            moverParaPontoAtual();
        }

        // Exemplo: se chegar em um ponto específico, abrir fase1
        if (posIndex === 5 && event.key === 'k') {
            window.location.href = "../fase1/fase1.html";
        }
    });
});
