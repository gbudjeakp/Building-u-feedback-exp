import { Routes, Route } from "react-router-dom";
import Loginpage from "../src/Pages/LoginPage";
import Register from "../src/Pages/RegisterPage";
import Interndashboard from "./Pages/Interndashboard";
import Mentordashboard from "./Pages/Mentordashboard";
import Homepage from "./pages/HomePage";
import Header from "./components/Header";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <>

      <MantineProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/login" element={<Loginpage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/intern" element={<Interndashboard />} />
          <Route exact path="/mentor" element={<Mentordashboard />} />
        </Routes>
      </MantineProvider>
    </>
  );
}

export default App;
