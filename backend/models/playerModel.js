// In model we will define our schema
// This model will hepl us implement CRUD operations
const mongoose = require("mongoose");

const playerSchema = mongoose.Schema(
  {
    // Associating a user with the player
    user: {
      type: mongoose.Schema.Types.ObjectId, // We give this the type object id as this is the unique identifier for a player
      required: true,
      ref: 'User' // To tell which model does this ObjectID pertain to
    },
    name: {
      type: String,
      required: [true, "Please add a text value"],
    },
    position: {
      type: String,
      required: [true]
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Player', playerSchema) 