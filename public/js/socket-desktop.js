//Establecer conexión
let socket = io();

let searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario.')
};

let desktop = searchParams.get('escritorio');

let label = $('small');

$('h1').text(`Escritorio: ${desktop}`);

$('button').on('click', function() {
    socket.emit('readTicket', { desktop }, function(resp) {
        if (resp === "No hay tickets") {
            label.text("No hay tickets");
            alert("No hay tickets");
            return;
        }
        label.text(`Ticket: ${resp.number}`);
    });
});