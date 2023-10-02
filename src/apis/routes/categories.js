const express = require('express');
const { task, categories } = require('../controllers');
const { verifyToken, createCategory, updateTask, deleteTask } = require('../middleware');
const routes = express.Router();

routes.use(verifyToken);
routes.route('/categories').post([createCategory.validate()], categories.createCategory);
routes.route('/categories').get(categories.listCategory);
routes.route('/categories/:categoriesId').get(task.getTask);
routes.route('/categories/:categoriesId').put([updateTask.validate()], task.updateTask);
routes.route('/categories/:categoriesId').delete([deleteTask.validate()], task.deleteTask);

module.exports = routes;
