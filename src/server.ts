// const dotenv = require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
// const app = require('./app');
// const { createDBConnection } = require('./db');

import app, { routes } from './app';
import * as http from 'http';

const server: http.Server = http.createServer(app);
const PORT = process.env.SERVICE_PORT;

// if (!PORT || Number.isNaN(PORT)) {
//   console.error('Invalid Port.', { PORT: PORT });
//   process.exit(1);
// }

// const server = app.listen(PORT, () => {
// console.log('task-service started. 😀', {
//   service: 'task-service',
//   PORT,
// });

//   createDBConnection();
// });

// process.on('unhandledRejection', (err) => {
//   console.error('Unhandled Rejection. 💥 😭. Shutting Down.');
//   console.error('Error', err);
//   server.close(() => {
//     process.exit(1);
//   });
// });

// process.on('uncaughtException', (err) => {
//   console.error('Uncaught Exception. 💥 😭. Shutting Down.');
//   console.error('Error', err);
//   server.close(() => {
//     process.exit(1);
//   });
// });

app.listen(PORT, () => {
  console.log('task-service started. 😀', {
    service: 'task-service',
    PORT
  });
});
