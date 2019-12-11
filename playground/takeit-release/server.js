import express from 'express';
import http from 'http';
import createGame from './public/game.js';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static('public'));

const game = createGame();

game.movePlayer({playerId: 'player1', keyPressed: 'ArrowDown'})


console.log(game.state)

sockets.on('connection', (socket) => {
    const playerId = socket.id;
    console.log('player conectado como'+ playerId)

    socket.emit('init', game.state)
})
server.listen(3000 , () => {
    console.log('ouvindoem 3000')
})