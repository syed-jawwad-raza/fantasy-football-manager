const express = require("express");
const router = express.Router();
const {
  getPlayers,
  addPlayer,
  updatePlayer,
  deletePlayer,
} = require("../controllers/playerController");
// Protect function basically check your http request header's authorization object for token
const { protect } = require("../middleware/authMiddleware");

// Route only defined as '/' as /api/players already mentioned as default in server.js
// We are protecting the routes by forcing the request to go through authMiddleware first to verify tokens
router.route('/').get(protect, getPlayers).post(protect, addPlayer)

// When the route is hit by post request, createPlayer function from playerController file will be called
// As it it a protected route, an auth token must be sent with every request
router.route('/:id').delete(protect, deletePlayer).put(protect, updatePlayer)

module.exports = router;
