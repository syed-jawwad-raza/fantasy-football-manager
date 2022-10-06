// Helps handle errors in async functions without using try-catch blocks
const asyncHandler = require("express-async-handler");
const Player = require("../models/playerModel");
const User = require("../models/userModel");

// @desc   GET Players
// @route  GET /api/players
// @access Private
const getPlayers = asyncHandler(async (req, res) => {
  // Getting data from our MongoDB database asynchronously through Mongoose
  const players = await Player.find({ user: req.user.id });
  res.status(200).json(players);
});

// @desc   Add Player
// @route  POST /api/players
// @access Private
const addPlayer = asyncHandler(async (req, res) => {
  const { name, position } = req.body
  // Checking if title is being sent in body
  if (!name) {
    res.status(400);
    throw new Error("Bad Request! Pls add some text");
  }
  // Creating a player in database using data from post request using the mongoose player model.
  const player = await Player.create({
    name: name,
    position: req.body.position,
    // Saving the user id (which we got from the token sent with the post request) with the player
    // So we can get the players for each user later by id
    user: req.user.id,
  });
  res.status(200).json(player);
});

// @desc   Update Player
// @route  PUT /api/players/:id
// @access Private
const updatePlayer = asyncHandler(async (req, res) => {
  // Mongoose has methods for everything
  const player = await Player.findById(req.params.id);
  console.log(player);
  if (!player) { 
    res.status(400);
    throw Error("Player not found");
  } 

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Make sure the logged in user matches the player user
  if (player.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  // findByIdAndUpdate will take in the id, the updated player and any options
  // new: option creates the player if it doesn't already exist.
  const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedPlayer);
});

// @desc   Delete Player
// @route  DELETE /api/players/:id
// @access Private
const deletePlayer = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) {
    throw new Error("Player doesn't exist");
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Make sure the logged in user matches the player user
  if (player.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");S
  }

  await player.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPlayers,
  addPlayer,
  updatePlayer,
  deletePlayer,
};
