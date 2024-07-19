import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {baseUrl} from "../../API/index"

const initialState = {
  feedbackRequests: [],
  assignedFeedbackRequests: [],
  feedbacks: [],
  selectedFeedback: null,
  loading: "idle",
  error: null,
};

const createAsyncThunkWithJwt = (type, url, method = "get") =>
  createAsyncThunk(type, async (data, thunkAPI) => {
    try {
      let apiUrl = url;

      if (typeof data === "string") {
        apiUrl = `${url}${data}`;
      }

      if (typeof data === "object" && data.id) {
        apiUrl = `${url}${data.id}`;
      }


      const response = await axios({
        method,
        url: apiUrl,
        data: typeof data === "object" ? data : undefined,
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });

const createFeedbackRequest = createAsyncThunkWithJwt(
  "feedback/create",
  `${baseUrl}/api/feedback/submitfeedback`,
  "post"
);

const addFeedback = createAsyncThunkWithJwt(
  "feedback/add",
  `${baseUrl}/api/feedback/addFeedBack/`,
  "post"
);

const assignFeedbackRequest = createAsyncThunkWithJwt(
  "feedback/assign",
  `${baseUrl}/api/feedback/assignFeedBackToMentor/`,
  "post"
);

const getAssignedFeedbackRequests = createAsyncThunkWithJwt(
  "feedback/getAssign",
  `${baseUrl}/api/feedback/getAssignedFeedBacks`
);
const fetchFeedbackRequests = createAsyncThunkWithJwt(
  "feedback/fetchAll",
  `${baseUrl}/api/feedback/getfeedbackrequestForms`
);

const fetchInternFeedbackRequests = createAsyncThunkWithJwt(
  "feedback/fetchAll",
  `${baseUrl}/api/feedback/getUserFeedBackRequestForms`
);

const getSelectedFeedbackRequest = createAsyncThunk(
  "feedback/getSelectedRequest",
  `${baseUrl}/api/feedback/getfeedbackid/`
);

const markComplete = createAsyncThunkWithJwt(
  "feedback/markComplete",
  `${baseUrl}/api/feedback/markFeedBackRequestComplete/`,
  "get"
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // mentor's "FEEDBACK QUEUE" and intern's "MY FEEDBACK REQUESTS"
      .addCase(fetchFeedbackRequests.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data) {
          state.feedbackRequests = data.sort((a, b) => {
            return a.createdAt.localeCompare(b.createdAt);
          });
          state.loading = "succeeded";
        } else {
          state.loading = "failed";
          state.error = action.payload
            ? action.payload
            : "Error fetching feedback requests // data structure";
        }
      })
      .addCase(fetchFeedbackRequests.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchFeedbackRequests.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload
          ? action.payload
          : "Error fetching feedback requests";
      })
      // intern's "Request Feedback"
      .addCase(createFeedbackRequest.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data) {
          state.feedbackRequests = data;
          state.loading = "succeeded";
        } else {
          state.loading = "failed";
          state.error = action.payload
            ? action.payload
            : "Error creating feedback request // data structure";
        }
      })
      .addCase(createFeedbackRequest.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(createFeedbackRequest.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload
          ? action.payload
          : "Error creating feedback request";
      })
      // mentor's "MY ASSIGNED FEEDBACKS"
      //This is bad code. Will need to refactor 
      .addCase(assignFeedbackRequest.fulfilled, (state, action) => {
        const { msg, data } = action.payload;
        if (msg === "Feedback assigned to mentor") {
          const { id, whoisAssigned } = data;
          const feedbackIndex = state.feedbackRequests.findIndex(
            (feedback) => feedback.id === id
          );
          if (feedbackIndex !== -1) {
            state.feedbackRequests[feedbackIndex].whoisAssigned = whoisAssigned;
          }
        }
      })
      
      .addCase(getAssignedFeedbackRequests.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data) {
          state.assignedFeedbackRequests = data.sort((a, b) => {
            return a.updatedAt.localeCompare(b.updatedAt);
          });
          state.loading = "succeeded";
        } else {
          state.loading = "failed";
          state.error = action.payload
            ? action.payload
            : "Error fetching assigned feedback requests // data structure";
        }
      })
      .addCase(getAssignedFeedbackRequests.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getAssignedFeedbackRequests.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload
          ? action.payload
          : "Error fetching assigned feedback requests";
      })
      // mentors' added feedback to "SingleFeedbackPage"
      .addCase(addFeedback.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data) {
          state.feedbacks = data;
          state.loading = "succeeded";
        } else {
          state.loading = "failed";
          state.error = action.payload
            ? action.payload
            : "Error posting feedbacks";
        }
      })
      .addCase(getSelectedFeedbackRequest.fulfilled, (state, action) => {
        state.selectedFeedback = action.payload;
        state.loading = "succeeded";
      })
      .addCase(getSelectedFeedbackRequest.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload
          ? action.payload
          : "Error fetching selected feedback.";
      });
  },
});

export {
  fetchFeedbackRequests,
  createFeedbackRequest,
  addFeedback,
  assignFeedbackRequest,
  getAssignedFeedbackRequests,
  getSelectedFeedbackRequest,
  fetchInternFeedbackRequests,
  markComplete,
};

export default feedbackSlice.reducer;
