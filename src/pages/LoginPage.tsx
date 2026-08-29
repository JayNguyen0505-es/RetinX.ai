import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import Button from "../components/Button";
import { DEMO_ACCOUNT } from "../data/mockData";
import { storage } from "../utils/storage";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    const stored = storage.getUser();

    const isDemo =
      email.trim().toLowerCase() === DEMO_ACCOUNT.email.toLowerCase() &&
      password === DEMO_ACCOUNT.password;

    const isStored =
      stored && stored.email.toLowerCase() === email.trim().toLowerCase();

    if (isDemo) {
      storage.setUser({
        id: "U-DEMO",
        name: DEMO_ACCOUNT.name,
        email: DEMO_ACCOUNT.email,
        verified: true,
      });
      navigate("/");
      return;
    }

    if (isStored) {
      storage.setUser({ ...stored, verified: true });
      navigate("/");
      return;
    }

    setError("No matching account. Use the demo account or create one.");
  };

  const fillDemo = () => {
    setEmail(DEMO_ACCOUNT.email);
    setPassword(DEMO_ACCOUNT.password);
    setError("");
  };

  return (
    <div className="auth-page">
      <Link to="/" className="brand auth-brand">
        <span className="brand-mark">
          <Eye size={18} strokeWidth={2.2} />
        </span>
        <span className="brand-text">
          RetinX<span className="brand-dot">.</span>ai
        </span>
      </Link>

      <div className="card auth-card">
        <h1 className="h2 auth-title">Sign in to RetinX.ai</h1>
        <p className="auth-sub">
          Clinical decision support for retinal screening.
        </p>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input"
            value={email}
            autoComplete="email"
            placeholder="doctor@hospital.vn"
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="input"
            value={password}
            autoComplete="current-password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <Button block size="lg" onClick={handleSubmit}>
          Sign In
        </Button>

        <div className="demo-hint">
          <span>Demo account available</span>
          <button type="button" className="link-btn" onClick={fillDemo}>
            Use demo credentials
          </button>
        </div>

        <p className="auth-foot">
          Don't have an account? <Link to="/signup">Create account</Link>
        </p>
      </div>

      <p className="disclaimer auth-disclaimer">
        Research prototype — mock authentication, no real accounts.
      </p>
    </div>
  );
}
