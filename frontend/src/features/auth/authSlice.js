/* Redux Slices:
A "slice" is a collection of Redux reducer logic and actions for a single feature in your app, typically defined together in a single file. The name comes from splitting up the root Redux state object into multiple "slices" of state. */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register user
// Takes in action type string and an async callback function (which takes in user from register page and thunkAPI)
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user) // Awaiting registration through axios (function in seperate authService file)
    } catch (error) {
        // Looking at all possible places for an error message
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk ('auth/logout', () => {
    authService.logout() 
})

// Login User
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
/* createSlice() accepts an object containing initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state. */
export const authSlice = createSlice({
    // Slice name, used in action types as prefix
    name: 'auth',
    // The initial state for the reducer
    initialState,
    // An object of "case reducers" (functions intended to handle a specific action type, equivalent to a single case statement in a switch). Key names will be used to generate actions.
    reducers: {
        // Resets the state to the default value
        reset: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    // Will contain async reducers
    extraReducers: (builder) => {
        // Handling pending, fulfilled(went well) and rejected(error) states of our register function
        // Doing it in extra reducers as its an async thunk function
        builder
            // addCase adds a case reducer to handle a single exact action type
            .addCase(register.pending, (state) => {
                state.isLoading = true // As its fetching the data in pending state
            }) 
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload // Response from backend
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.user = null
                state.message = action.payload // Will get payload from rejectWithValue function
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true // As its fetching the data in pending state
            }) 
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.user = null
                state.message = action.payload // Will get payload from rejectWithValue function
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            

    }
})
// Exporting reset action function
export const { reset } = authSlice.actions
export default authSlice.reducer





