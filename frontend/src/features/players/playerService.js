import axios from "axios";
const API_URL = '/api/players/'

// Add new player
const addPlayer = async (playerData, token) => {
    // Setting up bearer token to be sent in request header for authorization
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, playerData, config) // Config is the 3rd parameter having the header

    return response.data;
}

// Get user players
const getPlayers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete PLayer
const deletePlayer = async (playerId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + playerId , config)  
    return response.data
}

const playerService = {
    addPlayer,
    getPlayers,
    deletePlayer
}

export default playerService;