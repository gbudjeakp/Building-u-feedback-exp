// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials, logOut } from "../features/Auth/authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:5001",
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("authorization", );
//     }
//   },
// });

export const feedBackAPI = "http://localhost:5001/api/feedback";

export const userAPI = "http://localhost:5001/api/users";
