const express = require('express');
const { task } = require('../controllers');
const { verifyToken, createTask } = require('../middleware');
const routes = express.Router();

routes.use(verifyToken);
routes.route('/tasks').post([createTask.validate()], task.createTask);
routes.route('/tasks').get([createTask.validate()], task.listTask);
routes.route('/tasks/:taskId').get([createTask.validate()], task.getTask);
routes.route('/tasks/:taskId').put([createTask.validate()], task.updateTask);
routes.route('/tasks/:taskId').delete([createTask.validate()], task.deleteTask);

module.exports = routes;
