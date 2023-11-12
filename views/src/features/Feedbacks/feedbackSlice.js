import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getJwtToken from "../../Utility/getJwtToken";
import axios from "axios";

const initialState = {
  feedbackRequests: [],
  loading: "idle",
  error: null,
};

const createAsyncThunkWithJwt = (type, url, method = "get") => createAsyncThunk(type, async (id, thunkAPI) => {
  const jwtToken = getJwtToken();
  try {
    const response = await axios({
      method,
      url: id ? `${url}${id}` : url,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const fetchFeedbackRequests = createAsyncThunkWithJwt("feedback/fetchAll", "http://localhost:5001/api/feedback/getfeedbackrequestForms");

const createFeedbackRequest = createAsyncThunkWithJwt("feedback/create", "http://localhost:5001/api/feedbackrequests", "post");

const addFeedback = createAsyncThunkWithJwt(`feedback/add", "http://localhost:5001/api/feedback/add`, "post");

const assignFeedbackRequest = createAsyncThunkWithJwt("feedback/assign", "http://localhost:5001/api/feedback/assignFeedBackToMentor/");

const getAssignedFeedbackRequests = createAsyncThunkWithJwt("feedback/getAssign", "http://localhost:5001/api/feedback/getAssignedFeedBacks");

const markComplete = createAsyncThunkWithJwt("feedback/markComplete", "http://localhost:5001/api/feedback/markFeedBackRequestComplete/", "get");

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbackRequests.fulfilled, (state, action) => {
        state.feedbackRequests = action.payload;
        state.loading = "succeeded";
      })
      .addCase(createFeedbackRequest.fulfilled, (state, action) => {
        state.feedbackRequests.push(action.payload);
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        const { requestId, feedback } = action.payload;
        const request = state.feedbackRequests.find((req) => req.id === requestId);
        if (request) {
          request.feedback.push(feedback);
        }
      })
      .addCase(assignFeedbackRequest.fulfilled, (state, action) => {
        const { requestId, mentorId } = action.payload;
        const request = state.feedbackRequests.find((req) => req.id === requestId);
        if (request) {
          request.mentorId = mentorId;
        }
      })
      .addCase(getAssignedFeedbackRequests.fulfilled, (state, action) => {
        state.feedbackRequests = action.payload;
        state.loading = "succeeded";
      })
      .addCase(getAssignedFeedbackRequests.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getAssignedFeedbackRequests.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Error fetching assigned feedback requests.";
      })
      .addCase(fetchFeedbackRequests.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchFeedbackRequests.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Error fetching feedback requests.";
      });
  },
});

export {
  fetchFeedbackRequests,
  createFeedbackRequest,
  addFeedback,
  assignFeedbackRequest,
  getAssignedFeedbackRequests,
  markComplete,
};

export default feedbackSlice.reducer;
