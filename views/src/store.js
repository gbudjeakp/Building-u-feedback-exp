import {configureStore, combineReducers} from "@reduxjs/toolkit"
import userReducer from "./Slices/userSlice"

const reducer = combineReducers({
  user: userReducer, 
});

const store = configureStore({
    reducer
})


export default store;