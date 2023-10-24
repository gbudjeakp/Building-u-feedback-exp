import { Routes, Route } from "react-router-dom";
import Loginpage from "../src/Pages/LoginPage";
import Registar from "../src/Pages/RegisterPage";
import Interndashboard from "./Pages/Interndashboard";
import Mentordashboard from "./Pages/Mentordashboard";
import Homepage from "./pages/HomePage";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<Loginpage />} />
        <Route exact path="/register" element={<Registar />} />
        <Route exact path="/intern" element={<Interndashboard />} />
        <Route exact path="/mentor" element={<Mentordashboard />} />
      </Routes>
    </>
  );
}

export default App;
