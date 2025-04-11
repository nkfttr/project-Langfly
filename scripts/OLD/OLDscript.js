const piece = document.getElementById('piece');
let posX = 50; 
let posY = 50;

document.addEventListener('keydown', (event) => {
    const speed = 2; // Velocidade de movimento

    switch(event.key) {
        case 'w': 
            posY = Math.max(0, posY - speed);
            break;
        case 'a': 
            posX = Math.max(0, posX - speed);
            break;
        case 's': 
            posY = Math.min(100, posY + speed);
            break;
        case 'd': 
            posX = Math.min(100, posX + speed);
            break;
    }
    document.getElementById("coords").innerText = "X = " + posX;
    document.getElementById("coordsY").innerText = "Y = " + posY;

    piece.style.top = `${posY}%`;
    piece.style.left = `${posX}%`;
});