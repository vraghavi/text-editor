const http = require('http');
const webSocket = require('ws');
const express = require('express');

const port = 3001;


const app = express()

const server = app.listen(port, () => { console.log(`Server listening on port ${port}`) });

const wss = new webSocket.Server({ server: server });

let lastMessage = '';

wss.on('connection', (ws) => {
    console.log(lastMessage);
    ws.send(lastMessage);
    console.log('A new client Connected!');

    console.log(wss.clients.size);

    ws.on('message', (message) => {
        console.log('received %s', message);
        lastMessage = message.toString();
        wss.clients.forEach((c) => c.send(message.toString()));
    });
});

app.get("/api", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.json({ message: "Hello from server!!" });
})