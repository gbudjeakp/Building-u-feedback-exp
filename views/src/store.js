import {configureStore, combineReducers} from "@reduxjs/toolkit"
import userReducer from "./features/User/userSlice"
import feedbackrequestReducer from "./features/FeedbackForms/feedbackrequestSlice";
import feedbacksReducer from "./features/Feedbacks/feedbackSlice"

const reducer = combineReducers({
  users: userReducer, 
  feedbacks: feedbacksReducer,
  feedbackRequests: feedbackrequestReducer

});

const store = configureStore({
    reducer
})


export default store;