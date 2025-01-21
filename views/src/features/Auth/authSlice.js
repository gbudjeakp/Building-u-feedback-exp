import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
  user: null,
  isAuthenticated: false,
  loading: 'idle',
  error: null,
};


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
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
