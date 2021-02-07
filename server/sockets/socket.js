const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {

        let nextTicket = ticketControl.nextTicket();
        callback(nextTicket);
    });

    client.emit('actualState', {
        actual: ticketControl.getLastTicket(),
        lastFor: ticketControl.getLastFor()
    });

    client.on('readTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                err: true,
                message: "El escritorio es necesario"
            })
        }
        let readTicket = ticketControl.readTicket(data.desktop);

        client.broadcast.emit('lastFor', {
            lastFor: ticketControl.getLastFor()
        });

        callback(readTicket);
    });

});