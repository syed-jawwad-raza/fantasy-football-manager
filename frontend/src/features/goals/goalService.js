import axios from "axios";
const API_URL = '/api/goals/'

// Create new Goal
const createGoal = async (goalData, token) => {
    // Setting up bearer token to be sent in request header for authorization
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, goalData, config) // Config is the 3rd parameter having the header

    return response.data;
}

// Get user Goals
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete goal
const deleteGoal = async (goalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + goalId , config)  
    return response.data
}

const goalService = {
    createGoal,
    getGoals,
    deleteGoal
}

export default goalService;