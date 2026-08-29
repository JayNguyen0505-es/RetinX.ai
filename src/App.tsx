import { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VerifyPage from "./pages/VerifyPage";
import { seedIfNeeded } from "./data/mockData";
import DemoAnalysisPage from "./pages/DemoAnalysisPage";

function ComingSoon({ name }: { name: string }) {
  return (
    <div className="auth-page">
      <div className="card auth-card auth-card-center">
        <h1 className="h2 auth-title">{name}</h1>
        <p className="auth-sub">This screen arrives in the next build phase.</p>
        <Link to="/" className="btn btn-outline">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    seedIfNeeded();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/demoo" element={<DemoAnalysisPage />} />
        <Route path="/dashboard" element={<ComingSoon name="Dashboard" />} />
        <Route path="/patients/new" element={<ComingSoon name="Create Patient" />} />
        <Route path="/patient/:id" element={<ComingSoon name="Patient Record" />} />
        <Route path="/analyze/:patientId" element={<ComingSoon name="Upload Fundus" />} />
        <Route path="/processing" element={<ComingSoon name="Processing" />} />
        <Route path="/result/:analysisId" element={<ComingSoon name="Screening Result" />} />
        <Route path="*" element={<ComingSoon name="Page not found" />} />
      </Routes>
    </BrowserRouter>
  );
}