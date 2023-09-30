const dotenv = require('dotenv').config();
const app = require('./app');
const { createDBConnection } = require('./db');

const PORT = process.env.SERVICE_PORT;

if (!PORT || Number.isNaN(PORT)) {
  console.error('Invalid Port.', { PORT: PORT });
  process.exit(1);
}

const server = app.listen(PORT, () => {
  console.log('task-service started. 😀', {
    service: 'task-service',
    PORT,
  });

  createDBConnection();
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection. 💥 😭. Shutting Down.');
  console.error('Error', err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception. 💥 😭. Shutting Down.');
  console.error('Error', err);
  server.close(() => {
    process.exit(1);
  });
});
