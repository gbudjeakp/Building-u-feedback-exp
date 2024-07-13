import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "../src/Pages/LoginPage";
import Signup from "./Pages/Signup";
import Interndashboard from "./Pages/Interndashboard";
import Mentordashboard from "./Pages/Mentordashboard";
import SingleFeedBack from "./Pages/SingleFeedbackPage";
import Homepage from "./Pages/HomePage";
import Unauthorized from "./Pages/Unauthorized";
import Notfound from "./Pages/Notfound";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import AuthWrapper from "./Utility/AuthWrapper";

function App() {
  return (
    <MantineProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/intern/*" element={<AuthWrapper>{({ user }) => <Interndashboard user={user} />}</AuthWrapper>} />
          <Route path="/mentor/*" element={<AuthWrapper>{({ user }) => <Mentordashboard user={user} />}</AuthWrapper>} />
          <Route path="/feedback/:id" element={<AuthWrapper>{({ user }) => <SingleFeedBack user={user} />}</AuthWrapper>} />
          <Route path="/403" element={<Unauthorized />} />
          {/* wasnt sure how to do this correctly but this route enables pages that dont match our routes to land
          on the 404 page */}
          <Route path="*" element={<Notfound />} />
        </Routes>
    </MantineProvider>
  );
}

export default App;
