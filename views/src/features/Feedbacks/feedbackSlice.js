import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  feedbackRequests: [],
  assignedFeedbackRequests: [],
  selectedFeedback: null,
  loading: "idle",
  error: null,
};

const createAsyncThunkWithJwt = (type, url, method = "get") => createAsyncThunk(type, async (data, thunkAPI) => {
  try {
    let apiUrl = url;

    if (typeof data ==='number'){
      apiUrl =  `${url}${data}`
    }

    if (typeof data === 'object' && data.id) {
      apiUrl = `${url}${data.id}`;
    }

    console.log("URL/Method", apiUrl, method);

    const response = await axios({
      method,
      url: apiUrl,
      data: typeof data === 'object' ? data : undefined,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


const createFeedbackRequest = createAsyncThunkWithJwt("feedback/create", "http://localhost:5001/api/feedback/submitfeedback", "post");

const addFeedback = createAsyncThunkWithJwt("feedback/add", "http://localhost:5001/api/feedback/addFeedBack/", "post");

const assignFeedbackRequest = createAsyncThunkWithJwt("feedback/assign", "http://localhost:5001/api/feedback/assignFeedBackToMentor/", "post");

const getAssignedFeedbackRequests = createAsyncThunkWithJwt("feedback/getAssign", "http://localhost:5001/api/feedback/getAssignedFeedBacks");
const fetchFeedbackRequests = createAsyncThunkWithJwt("feedback/fetchAll", "http://localhost:5001/api/feedback/getfeedbackrequestForms");

const fetchInternFeedbackRequests = createAsyncThunkWithJwt("feedback/fetchAll", "http://localhost:5001/api/feedback/getUserFeedBackRequestForms");

const getSelectedFeedbackRequest = createAsyncThunk('feedback/getSelectedRequest', "http://localhost:5001/api/feedback/getfeedbackid/"); 

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
        state.feedbackRequests = action.payload;
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
        const request = state.assignedFeedbackRequests.find((req) => req.id === requestId);
        if (request) {
          request.mentorId = mentorId;
        }
      })
      .addCase(getAssignedFeedbackRequests.fulfilled, (state, action) => {
        state.assignedFeedbackRequests = action.payload;
        state.loading = "succeeded";
      })
      .addCase(getSelectedFeedbackRequest.fulfilled, (state, action) => {
        state.selectedFeedback = action.payload;
        console.log("THis selected feedbackrequest", state.selectedFeedback)
        state.loading = "succeeded";
      })
      .addCase(getAssignedFeedbackRequests.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getAssignedFeedbackRequests.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ? action.payload : "Error fetching assigned feedback requests.";
      })
      .addCase(getSelectedFeedbackRequest.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ? action.payload : "Error fetching selected feedback.";
      })
      .addCase(fetchFeedbackRequests.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchFeedbackRequests.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ? action.payload : "Error fetching feedback requests.";
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
