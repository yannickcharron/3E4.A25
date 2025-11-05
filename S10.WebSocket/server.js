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
  //console.log(client);

  newClient(client);

  client.on(IOEVENTS.SEND, message => {
    const messageToBroadcast = {
      text: message.text,
      sender: client.data,
      timestamp: dayjs()
    }

    socketServer.emit(IOEVENTS.RECEIVE, messageToBroadcast);

    //IDEA: Ajouter en base de données le message
  })  

  client.on(IOEVENTS.CHANGE_USERNAME, username => {
    client.data.username = username;
    sendUserIdentities();
  });

  client.on(IOEVENTS.DISCONNECT, reason => {
    sendUserIdentities();
    //IDEA: Message de déconnexion à tous les utilisateurs
  })

});

function newClient(client) {

  client.data.id = client.id;
  client.data.username = 'Anonyme';
  client.data.avatar = randomAvatarImage();

  sendUserIdentities();
}

async function sendUserIdentities() {
  const clients = await socketServer.fetchSockets();
  const clientsDatas = clients.map(c => c.data);

  socketServer.emit(IOEVENTS.REFRESH_USERS, clientsDatas);

}

function randomAvatarImage() {
  const avatarNumber = Math.floor(Math.random() * 8 + 1);
  return `./images/avatar${avatarNumber}.png`;
}

httpServer.listen(PORT, () => {
  console.log(chalk.blue(`Server listening on ${PORT}`));
});
