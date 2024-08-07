// Mostrar fecha y hora inicialmente
var fechaHora = new Date(localStorage.getItem('fechaHora'));

var fecha = fechaHora.toLocaleDateString().replace(",", "");
var hora = fechaHora.toLocaleTimeString();

var fechaHoraString = "Última actualización: " + fecha + " " + hora + " h";

document.getElementById("fechaHora").textContent = fechaHoraString;

// Actualizar fecha y hora con botón
function mostrarFechaHora() {
    var fechaHora = new Date();
    localStorage.setItem('fechaHora', fechaHora);

    var fecha = fechaHora.toLocaleDateString().replace(",", "");
    var hora = fechaHora.toLocaleTimeString();

    var fechaHoraString = "Última actualización: " + fecha + " " + hora + " h";

    document.getElementById("fechaHora").textContent = fechaHoraString;
}

// Redireccionar a dos páginas
function redirectToTwoPages() {
    window.open('https://www.argentina.gob.ar/interior/renaper/canales-renaper', '_blank');
    window.location.href = 'mesaAyuda.html';
}

// Giro de DNI
const cardContainer = document.getElementById('card-container');
let startX = 0;
let isDragging = false;
let angle = 0;
let isBack = false;

cardContainer.addEventListener('touchstart', startDrag);
cardContainer.addEventListener('touchmove', drag);
cardContainer.addEventListener('touchend', endDrag);

function startDrag(event) {
    isDragging = true;
    startX = getX(event);
}

function drag(event) {
    if (!isDragging) return;
    const currentX = getX(event);
    const deltaX = currentX - startX;
    if (Math.abs(deltaX) > 5) { 
        angle += deltaX > 0 ? 1 : -1; 
        startX = currentX;
        cardContainer.style.transform = `rotateY(${angle}deg)`;
    }
}

function endDrag() {
    isDragging = false;
    if (angle % 180 !== 0) { 
        isBack = !isBack;
        toggleCard();
        angle = Math.round(angle / 180) * 180; 
        cardContainer.style.transition = 'transform 0.7s ease'; 
        cardContainer.style.transform = `rotateY(${angle}deg)`;
    }
}

function getX(event) {
    return event.type.startsWith('touch') ? event.touches[0].clientX : event.clientX;
}

function toggleCard() {
    document.getElementById('card-front').style.display = isBack ? 'none' : 'block';
    document.getElementById('card-back').style.display = isBack ? 'block' : 'none';
    document.getElementById('card-back').style.transform = isBack ? 'rotateY(0deg)' : 'rotateY(180deg)';
}
