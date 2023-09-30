const mongoose = require('mongoose');
const { collections } = require('../../../shared');

const modelName = collections.UserTasks;

const schema = new mongoose.Schema(
  {
    taskTitle: {
      type: String,
      required: true,
      index: true,
    },
    taskDescription: {
      type: String,
      // required: true,
    },
    taskCategory: {
      type: String,
      default: 'none',
    },
    taskPriorities: {
      type: String,
      default: 'low',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.users,
      index: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const UserTasks = mongoose.model(modelName, schema);

module.exports = { UserTasks };
