// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from "../../API/index"


const initialState = {
  user: null,
  isAuthenticated: false,
  loading: 'idle',
  error: null,
};

// Async thunk to handle the logout request
export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {

  try {
    await axios.post(
      `${baseUrl}/api/users/logout`,
      {
        withCredentials: true
      }
    );

    // Clear user and set isAuthenticated to false upon successful logout
    thunkAPI.dispatch(clearUser());
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = 'succeeded';
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload || 'Error during logout.';
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
