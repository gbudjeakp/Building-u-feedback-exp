import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { feedBackAPI } from "../../api";

const initialState =
    {
    forms: ["THis form 1", "This is form 2", "this is form 3", "form 4"],
    loading: false,
    error: null,
    }

const feedbackRequest = createSlice({
    name: "feedbackrequest",
    initialState,
    reducers: {
        submitFeedbackRequest(state, action){
            state.forms.push(action.payload)
        }
    }

});

export const { submitFeedbackRequest } = feedbackRequest.actions;
export default feedbackRequest.reducer