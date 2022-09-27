// Helps handle errors in async functions without using try-catch blocks
const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc   GET Goals
// @route  GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  // Getting data from our MongoDB database asynchronously through Mongoose
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc   Set Goal
// @route  POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  // Checking if title is being sent in body
  if (!req.body.text) {
    res.status(400);
    throw new Error("Bad Request! Pls add some text");
  }
  // Creating a goal in database using data from post request using the mongoose goal model.
  const goal = await Goal.create({
    text: req.body.text,
    // Saving the user id (which we got from the token sent with the post request) with the goal
    // So we can get the goals for each user later by id
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// @desc   Update Goal
// @route  PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  // Mongoose has methods for everything
  const goal = await Goal.findById(req.params.id);
  console.log(goal);
  if (!goal) { 
    res.status(400);
    throw Error("Goal not found");
  } 

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  // findByIdAndUpdate will take in the id, the updated goal and any options
  // new: option creates the goal if it doesn't already exist.
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc   Delete Goal
// @route  DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    throw new Error("Goal doesn't exist");
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");S
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
