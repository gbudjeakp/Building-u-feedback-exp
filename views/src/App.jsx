import { Routes, Route } from "react-router-dom";
import Loginpage from "../src/Pages/LoginPage";
import Signup from "./pages/Signup";
import Interndashboard from "./Pages/Interndashboard";
import Mentordashboard from "./Pages/Mentordashboard";
import SingleFeedBack from "./pages/SingleFeedbackPage";
import Homepage from "./pages/HomePage";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";


function App() {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/intern/*" element={<Interndashboard />} />
        <Route path="/mentor/*" element={<Mentordashboard />} />
        <Route path="/feedback/:id" element={<SingleFeedBack />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
