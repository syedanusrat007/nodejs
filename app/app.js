const { Socket } = require('dgram');
const http = require('http');

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.write('yusgrfy');
        res.end();
    }

    if (req.url === '/abc') {
        res.write(JSON.stringify([1, 2, 3, 4, 5, 6]));
        res.end();
    }
});

server.listen(3000);
console.log('Listening on port 3000....');
