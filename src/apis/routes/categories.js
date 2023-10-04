const express = require('express');
const { task, categories } = require('../controllers');
const { verifyToken, createCategory } = require('../middleware');
const routes = express.Router();

routes.use(verifyToken);
routes.route('/categories').post([createCategory.validate()], categories.createCategory);
routes.route('/categories').get(categories.listCategory);
routes.route('/categories/:categoriesId').get(categories.getCategory);
routes.route('/categories/:categoriesId').put(categories.createCategory);
routes.route('/categories/:categoriesId').delete(categories.deleteCategory);

module.exports = routes;
