import {  createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "auth",
    initialState: {user: null, token: null},
    reducers:{
        setCredentials: (state, action) =>{
            const {user, accessToken} = action.payload;
            state.user = user;
            state.token = accessToken;
        },

        logOut: (state, action) => {
            state.user = null;
            state.token = null;
        }
    }
})


export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

//Selectors we need in various pages 

export const selectcurrentUser = ( state ) => state.auth.user;
export const selectcurrentToken = ( state ) => state.auth.token;