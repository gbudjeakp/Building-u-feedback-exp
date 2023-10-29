// feedbackSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an initial state
const initialState = {
  feedbackRequests: [],
  loading: "idle",
  error: null,
};

// Define an async thunk to fetch all feedback requests
 const fetchFeedbackRequests = createAsyncThunk(
  "feedback/fetchAll",
  async () => {
    const response = await axios.get("http://localhost:5001/api/feedbackrequests");
    return response.data;
  }
);

// Define an async thunk to create a feedback request
 const createFeedbackRequest = createAsyncThunk(
  "feedback/create",
  async (feedbackData) => {
    const response = await axios.post("http://localhost:5001/api/feedbackrequests", feedbackData);
    return response.data;
  }
);

// Define an async thunk to add feedback to a request
 const addFeedback = createAsyncThunk(
  "feedback/add",
  async (feedbackData) => {
    const response = await axios.post("http://localhost:5001/api/feedback/add", feedbackData);
    return response.data;
  }
);

// Define an async thunk to assign a feedback request to a mentor
 const assignFeedbackRequest = createAsyncThunk(
  "feedback/assign",
  async (assignmentData) => {
    const response = await axios.post("http://localhost:5001/api/feedback/assign", assignmentData);
    return response.data;
  }
);

// Create a feedback slice
const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetch feedback requests
    builder.addCase(fetchFeedbackRequests.fulfilled, (state, action) => {
      state.feedbackRequests = action.payload;
      state.loading = "succeeded";
    });

    // Handle create feedback request
    builder.addCase(createFeedbackRequest.fulfilled, (state, action) => {
      state.feedbackRequests.push(action.payload);
    });

    // Handle add feedback
    builder.addCase(addFeedback.fulfilled, (state, action) => {
      // Update the feedback request with the new feedback
      const { requestId, feedback } = action.payload;
      const request = state.feedbackRequests.find((req) => req.id === requestId);
      if (request) {
        request.feedback.push(feedback);
      }
    });

    // Handle assign feedback request
    builder.addCase(assignFeedbackRequest.fulfilled, (state, action) => {
      // Update the assigned mentor of the feedback request
      const { requestId, mentorId } = action.payload;
      const request = state.feedbackRequests.find((req) => req.id === requestId);
      if (request) {
        request.mentorId = mentorId;
      }
    });

    // Handle loading and error states
    builder.addCase(fetchFeedbackRequests.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(fetchFeedbackRequests.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });
  },
});

// Export async thunks
export { fetchFeedbackRequests, createFeedbackRequest, addFeedback, assignFeedbackRequest };

// Export the reducer
export default feedbackSlice.reducer;
