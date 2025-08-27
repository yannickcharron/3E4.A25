import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

import app from './src/app.js';

const PORT = 3000;

app.listen(PORT, () => {

    console.log(chalk.hex('#7852A9').bold('Bonjour avec Chalk'));

    chalkAnimation.rainbow(`🚀 Serveur en écoute sur le port ${PORT} 🚀`);
});


