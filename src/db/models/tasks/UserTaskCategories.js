const mongoose = require('mongoose');
const { collections } = require('../../../shared');

const modelName = collections.UserTaskCategories;

const schema = new mongoose.Schema(
  {
    categoryType: {
      type: String,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.users,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const UserTaskCategories = mongoose.model(modelName, schema);

module.exports = { UserTaskCategories };
