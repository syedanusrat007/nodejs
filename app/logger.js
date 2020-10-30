const EventEmitter = require('events');

class Logger extends EventEmitter {

    log(msg) {

        console.log(msg);
        this.emit('messageLogged', { id: 1, name: 'hdg' });
    }
}


module.exports = Logger;
