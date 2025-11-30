import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PatientAuth from "./components/auth/PatientAuth";
import DoctorAuth from "./components/auth/DoctorAuth";
import PatientDashboard from "./pages/PatientDashboard"
import DoctorDashboard from "./pages/DoctorDashboard";
import RoleSelect from "./pages/RoleSelect";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/select-role" element = {<RoleSelect/>}/>

        {/* Patient Auth */}
        <Route path="/patient/auth" element={<PatientAuth />} />

        <Route path="/patient/dashboard" element={<PatientDashboard />} />

        {/* Doctor Auth */}
        <Route path="/doctor/auth" element={<DoctorAuth />} />

        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
