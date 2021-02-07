const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFor = [];

        let data = require('../data/data.json');
        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFor = data.lastFor;
        } else {
            this.resetCount();
        }
    }

    nextTicket() {
        this.last += 1;

        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.writeFile();

        return `Ticket ${this.last}`;
    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    getLastFor() {
        return this.lastFor;
    }

    readTicket(desktop) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numberTicket = this.tickets[0].number;
        this.tickets.shift();

        let readTicket = new Ticket(numberTicket, desktop);
        this.lastFor.unshift(readTicket);

        if (this.lastFor.length > 4) {
            this.lastFor.splice(-1, 1);
        }

        this.writeFile();

        return readTicket;
    }

    resetCount() {
        this.last = 0;
        this.tickets = [];
        this.lastFor = [];
        this.writeFile();
    }

    writeFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFor: this.lastFor
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

}

module.exports = {
    TicketControl
}