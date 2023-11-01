import { Routes, Route } from "react-router-dom";
import Loginpage from "../src/Pages/LoginPage";
import Signup from "./pages/Signup";
import Interndashboard from "./Pages/Interndashboard";
import Mentordashboard from "./Pages/Mentordashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SingleFeedBack from "./pages/SingleFeedbackPage"
import Homepage from "./pages/HomePage";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

const isLoggedIn = true;

function App() {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/intern/*"
          element={
            <ProtectedRoute
              element={<Interndashboard />}
              isAllowed={isLoggedIn}
              fallbackPath="/login"
            />
          }
        />
        <Route
          path="/mentor/*"
          element={
            <ProtectedRoute
              element={<Mentordashboard />}
              isAllowed={isLoggedIn}
              fallbackPath="/login"
            />
          }
        />

        <Route
          path="/feedback/:id"
          element={
            <ProtectedRoute
              element={<SingleFeedBack />}
              isAllowed={isLoggedIn}
              fallbackPath="/login"
            />
          }
        />
      </Routes>
    </MantineProvider>
  );
}

export default App;
