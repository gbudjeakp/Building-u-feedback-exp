import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { feedBackAPI } from "../../api";

export const  getRequestForms = createAsyncThunk(
    'feedback/getRequestForms',
    async (userData) =>{
        const req = await axios.post(`${feedBackAPI}/login`, userData)
        const res = await req.json()
        console.log(res.data.user)
        return res
    }
)

const feedbacRequest = createSlice({
    name: "feedbackrequest",
    initialState:[
        {
        forms: ["THis form 1", "This is form 2", "this is form 3", "form 4"],
        loading: false,
        error: null,
        }
    ]
});


export default feedbacRequest.reducer