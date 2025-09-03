import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

import app from './src/app.js';

const PORT = process.env.PORT;

app.listen(PORT, () => {

    console.log(chalk.hex('#7852A9').bold(`👽 Loading environment for ${process.env.ENV} 👽`));

    chalkAnimation.rainbow(`🚀 Server listening on ${PORT} 🚀`);
});


