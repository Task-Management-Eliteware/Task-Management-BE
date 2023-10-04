const { createTask } = require('./create');
const { deleteTask } = require('./delete');
const { getTask } = require('./get');
const { listTask } = require('./list');
const { updateTask, checkedTask } = require('./update');

module.exports = { createTask, deleteTask, getTask, listTask, updateTask, checkedTask };
