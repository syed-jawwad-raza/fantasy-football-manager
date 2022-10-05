import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
    goals: [],
    // Following 3 can be added to any redux slice
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new goal
export const createGoal = createAsyncThunk('goal/create', async(goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token // Using getState method of thunkAPI (Another RTK perk)
        return await goalService.createGoal(goalData, token) // As createGoal is a protected route we'll need to send a token
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)       
    }
})

// Get all goals for current user
// Passing in underscore as placeholder as we dont have a fist argument for async function
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => { 
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getGoals(token) // We only need a token to get goals
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete goal
export const deleteGoal = createAsyncThunk('goal/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateGoal = createAsyncThunk('goal/update')

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers : {
        reset: (state) => initialState // We can remove goals too as we reset as we don't need them them to persist unlike user
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload) // Pushing the new goal we just created which was sent back by API
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload // We are getting all goals from the API
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id) // We are getting all goals except the one just deleted
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer


