import http from 'http';
import express from 'express';
import chalk from 'chalk';

import { Server } from 'socket.io';

import IOEVENTS from './public/io-events.js';
import dayjs from 'dayjs';
import { timeStamp } from 'console';

const PORT = 9876;

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

//TODO: configuration des dossiers statiques
app.use(express.static('public'));
app.use(express.static('web'));

//TODO: Connexion des clients

socketServer.on(IOEVENTS.CONNECTION, client => {
  console.log(`Client connecté: ${client.id}`);

  client.on(IOEVENTS.SEND, message => {
    const messageToBroadcast = {
      text: message.text,
      sender: client.id,
      timestamp: dayjs()
    }

    socketServer.emit(IOEVENTS.RECEIVE, messageToBroadcast);

    //IDEA: Ajouter en base de données le message
  

  })  

});

async function newUser(socket) {}

async function sendUserIdentities() {}

function randomAvatarImage() {
  const avatarNumber = Math.floor(Math.random() * 8 + 1);
  return `./images/avatar${avatarNumber}.png`;
}

httpServer.listen(PORT, () => {
  console.log(chalk.blue(`Server listening on ${PORT}`));
});
