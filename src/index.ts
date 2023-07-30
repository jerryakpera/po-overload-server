import config from '@src/config';
import { connectDB } from './database';
import { createServer } from '@src/app';

const { port, dbConnStr } = config;

const startServer = async () => {
  connectDB(dbConnStr || '')
    .then(async () => {
      const app = await createServer();
      app.listen(port, () => {
        console.log(`Server live on port: ${port}`);
      });
    })
    .catch(console.log);
};

startServer();
