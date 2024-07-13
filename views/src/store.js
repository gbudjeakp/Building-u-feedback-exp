import {configureStore, combineReducers} from "@reduxjs/toolkit"
import feedbackSlice from "./features/Feedbacks/feedbackSlice";
import authReducer from "./features/Auth/authSlice"

const reducer = combineReducers({
  auth: authReducer,
  feedbackSlice: feedbackSlice
});

const store = configureStore({
    reducer
})


export default store;