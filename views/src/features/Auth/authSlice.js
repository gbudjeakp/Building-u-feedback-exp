import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the authentication slice
const initialState = {
  user: null, // User object when authenticated
  isAuthenticated: false, // Authentication status
};

// Create the authentication slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set user and authentication status when logged in
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    // Action to clear user and authentication status when logged out
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Export the actions
export const { setUser, clearUser } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
