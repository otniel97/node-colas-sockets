//Establecer conexión
let socket = io();

let label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log("Conectado al servidor")
});

socket.on('disconnect', function() {
    console.log("Desconectado del servidor")
});

socket.on('actualState', function(response) {
    label.text(response.actual);
});

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
    });
});