import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { userAPI } from "../../api";

export const  loginUser = createAsyncThunk(
    'users/loginUser',
    async (userData) =>{
        const req = await axios.post(`${userAPI}/login`, userData)
        const res = await req.json()
        console.log(res.data.user)
        return res
    }
)

const userSlice = createSlice({
    name: "user",
    initialState:{
        isAuthenticated: false,
        currentUser: null,
        accessToken: null,
    }
});


export default userSlice.reducer