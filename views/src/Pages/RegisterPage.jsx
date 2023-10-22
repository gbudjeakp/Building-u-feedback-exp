import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setAuthenticated } from "../features/User/userSlice";
import { redirect } from "react-router-dom";

function Registration() {
  const dispatch = useDispatch();
  const history = redirect();
  // const registrationStatus = useSelector((state) => state.user.registrationStatus);
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      // Check if username or password is missing
      alert("Username and password are required.");
      return;
    }
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        dispatch(setAuthenticated(true));
        history.push("/mentor"); 
      });
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>You are already registered and logged in.</div>
      ) : (
        <form onSubmit={handleRegistration}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button type="submit" disabled={registrationStatus === "loading"}>
              Register
            </button>
          </div>
          {registrationStatus === "failed" && (
            <div>Registration failed. Please try again.</div>
          )}
        </form>
      )}
    </div>
  );
}

export default Registration;
