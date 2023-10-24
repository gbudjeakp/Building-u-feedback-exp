import {configureStore, combineReducers} from "@reduxjs/toolkit"
import feedbackrequestReducer from "./features/FeedbackForms/feedbackrequestSlice";
import authReducer from "./features/Auth/authSlice"

const reducer = combineReducers({
  auth: authReducer,
  feedbackRequests: feedbackrequestReducer

});

const store = configureStore({
    reducer
})


export default store;