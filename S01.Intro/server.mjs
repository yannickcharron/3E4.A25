import { createServer } from 'node:http';

const myFirstServer = createServer((request, response) => {
    console.log(request.url);
    response.writeHead(200, 'Content-Type', 'text/html');
    response.end('<p><strong>Bonjour de mon serveur</strong></p>');
});

myFirstServer.listen(3000, () => {
    console.log(`Le serveur est en mode écoute sur http://127.0.0.1:3000`);
})