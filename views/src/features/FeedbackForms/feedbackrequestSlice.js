import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { feedBackAPI } from "../../api";

const initialState = {
  forms: [],
  loading: false,
  error: null,
};

export const fetchFeedbackForms = createAsyncThunk(
  "feedbackrequest/fetchFeedbackForms",
  async () => {
    const response = await axios.get(`${feedBackAPI}/getfeedbackrequestForms`);
    return response.data;
  }
);

const feedbackRequest = createSlice({
  name: "feedbackrequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbackForms.fulfilled, (state, action) => {
        state.forms = action.payload;
        state.loading = false;
      })
  },
});

export default feedbackRequest.reducer;
