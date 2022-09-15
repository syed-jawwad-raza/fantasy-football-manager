const asyncHandler = require('express-async-handler')

// @desc GET Goals
// @route GET /api/goals
// @access Private
const getGoals = (req, res) => {
    res.status(200).json({message: `Get goals`});
}

// @desc Create Goal
// @route POST /api/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {
    // Checking if title is being sent in body
    if (!req.body.title) {
        res.status(400)
        throw new Error('Bad Request! Pls add a goal title')
    } else {
        const goal = req.body;
        res.status(200).json({message: `Create goal`, Goal: `${goal.title}`}); 
    }
})

// @desc Update Goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update goal ${req.params.id}`});
})

// @desc Delete Goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`});
})

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
}