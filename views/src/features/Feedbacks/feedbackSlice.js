import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { feedBackAPI } from "../../api";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    submissions: [],
    submitting: false,
    submissionError: null,
  },
});

export default feedbackSlice.reducer;
