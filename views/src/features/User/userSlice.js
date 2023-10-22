// ...
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userAPI } from "../../api";


export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${userAPI}/register`, userData);
        const data = response.data;
        console.log(data)
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${userAPI}/login`, userData);
        const data = response.data;
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  const userSlice = createSlice({
    name: "user",
    initialState: {
      isAuthenticated: false,
      currentUser: null,
      accessToken: null,
      registrationStatus: "idle",
      loginStatus: "idle",
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.registrationStatus = "loading";
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.registrationStatus = "fulfilled";
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.registrationStatus = "failed";
          state.error = action.payload;
        })
        .addCase(loginUser.pending, (state) => {
          state.loginStatus = "loading";
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loginStatus = "fulfilled";
          state.isAuthenticated = true;
          state.currentUser = action.payload.user;
          state.accessToken = action.payload.accessToken;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loginStatus = "failed";
          state.error = action.payload;
        });
    },
  });
  
  export const { setAuthenticated, setCurrentUser, setAccessToken } = userSlice.actions;

export default userSlice.reducer;