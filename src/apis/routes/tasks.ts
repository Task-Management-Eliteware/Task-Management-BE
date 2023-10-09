// const express = require('express');
// const { task } = require('../controllers');
// const { verifyToken, createTask, updateTask, deleteTask, checkedTask } = require('../middleware');
// const routes = express.Router();

// routes.use(verifyToken);
// routes.route('/tasks').post([createTask.validate()], task.createTask);
// routes.route('/tasks').get(task.listTask);
// routes.route('/tasks/:taskId').get(task.getTask);
// routes.route('/tasks/:taskId').put([updateTask.validate()], task.updateTask);
// routes.route('/tasks/check/:taskId').put([checkedTask.validate()], task.checkedTask);
// routes.route('/tasks/:taskId').delete([deleteTask.validate()], task.deleteTask);

// module.exports = routes;

import { testCreate } from 'apis/test';
import express, { Request, Response, IRouterHandler } from 'express';
const routes = express.Router();

const createTask = (req: Request, res: Response) => {
  res.status(200).json({ data: 'hello' });
};

routes.route('/tasks').post(testCreate);

export default routes;
