const { v4: uuidv4} = require('uuid');
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const { WebSocketServer } = require('ws');
const http = require('http');

// Spinning the http server and the WebSocket server.
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

const clients = {};

// A new client connection request received
wsServer.on('connection', function(connection) {
  // Generate a unique code for every user
  const userId = uuidv4();
  console.log(`Recieved a new connection.`);

  // Store the new connection and handle messages
  clients[userId] = connection;
  console.log(`${userId} connected.`);
  wsServer.on('message', function(message){
    console.log("received message")
    wsServer.broadcast(message);
  })
});

wsServer.broadcast = function broadcast(message){
    console.log(message);
    wsServer.clients.forEach(function each(client){
        client.send(msg);
    });
};

app.get("/api", (req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
    res.json({message:"Hello from server!!"});
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});