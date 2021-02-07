//Establecer conexión
let socket = io();

let labelTicket1 = $('#lblTicket1');
let labelTicket2 = $('#lblTicket2');
let labelTicket3 = $('#lblTicket3');
let labelTicket4 = $('#lblTicket4');

let labelDesktop1 = $('#lblEscritorio1');
let labelDesktop2 = $('#lblEscritorio2');
let labelDesktop3 = $('#lblEscritorio3');
let labelDesktop4 = $('#lblEscritorio4');

let labelTickets = [labelTicket1, labelTicket2, labelTicket3, labelTicket4];
let labelDesktops = [labelDesktop1, labelDesktop2, labelDesktop3, labelDesktop4];

socket.on('actualState', function(response) {
    updateHTML(response.lastFor);
});

socket.on('lastFor', function(response) {
    let audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    updateHTML(response.lastFor);
});

function updateHTML(lastFor) {
    for (var i = 0; i < lastFor.length; i++) {
        console.log(i)
        labelTickets[i].text(`Ticket ${lastFor[i].number}`);
        labelDesktops[i].text(`Escritorio ${lastFor[i].desktop}`);
    }
}