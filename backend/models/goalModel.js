// In model we will define our schema
// This model will hepl us implement CRUD operations
const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    // Associating a user with the goal
    user: {
      type: mongoose.Schema.Types.ObjectId, // We give this the type object id as this is the unique identifier for a goal
      required: true,
      ref: 'User' // To tell which model does this ObjectID pertain to
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Goal', goalSchema) 