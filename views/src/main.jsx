import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import '@mantine/tiptap/styles.css';
import store from "./store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter basename="/Building-u-feedback">
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
