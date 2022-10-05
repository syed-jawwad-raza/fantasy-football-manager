/* configureStore(): wraps createStore to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes redux-thunk by default, and enables use of the Redux DevTools Extension */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice'
// configureStore requires that we pass in a reducer argument, can take multiple reducers
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer
  },
});
