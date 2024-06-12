import { Server } from 'http';
import app from './app';

// getting-started.js
import mongoose from 'mongoose';
import config from './app/config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('MongoDB Database Connected Successfully');

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

process.on('unhandledRejection', () => {
  console.log('unhandledRejection is detected, shutting down...........');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('uncaughtException');
  process.exit(1);
});
