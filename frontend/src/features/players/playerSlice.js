import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import playerService from "./playerService";

const initialState = {
    players: [],
    // Following 3 can be added to any redux slice
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Add new player
export const addPlayer = createAsyncThunk('player/create', async(playerData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token // Using getState method of thunkAPI (Another RTK perk)
        return await playerService.addPlayer(playerData, token) // As addPlayer is a protected route we'll need to send a token
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)       
    }
})

// Get all players for current user
// Passing in underscore as placeholder as we dont have a fist argument for async function
export const getplayers = createAsyncThunk('players/getAll', async (_, thunkAPI) => { 
    try {
        const token = thunkAPI.getState().auth.user.token
        return await playerService.getPlayers(token) // We only need a token to get players
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete player
export const deletePlayer = createAsyncThunk('player/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await playerService.deletePlayer(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updatePlayer = createAsyncThunk('player/update')

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers : {
        reset: (state) => initialState, // We can remove players too as we reset as we don't need them them to persist unlike user
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPlayer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addPlayer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.players.push(action.payload) // Pushing the new player we just created which was sent back by API
            })
            .addCase(addPlayer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getplayers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getplayers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.players = action.payload // We are getting all players from the API
            })
            .addCase(getplayers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deletePlayer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePlayer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.players = state.players.filter((player) => player._id !== action.payload.id) // We are getting all players except the one just deleted
            })
            .addCase(deletePlayer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = playerSlice.actions
export default playerSlice.reducer


