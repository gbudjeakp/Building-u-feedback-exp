import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AuthWrapper = ({ children: ChildComponent }) => {
  const [user, setUser] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/users/authorized",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          setUser(false);     
          console.log(response.status)
        }
      } catch (error) {
        setUser(false);
        navigate("/403")
        console.error("Error checking authentication:", error);
      }
    };
    fetchUser();
  }, [location.pathname]);

  return <ChildComponent user={user} />;
};

export default AuthWrapper;
