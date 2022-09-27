const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
// Protect function basically check your http request header's authorization object for token
const { protect } = require("../middleware/authMiddleware");

// Route only defined as '/' as /api/goals already mentioned as default in server.js
// We are protecting the routes by forcing the request to go through authMiddleware first to verify tokens
router.route('/').get(protect, getGoals).post(protect, setGoal)

// When the route is hit by post request, createGoal function from GoalController file will be called
// As it it a protected route, an auth token must be sent with every request
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

module.exports = router;
