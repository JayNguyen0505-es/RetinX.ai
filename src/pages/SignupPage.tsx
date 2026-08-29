import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import Button from "../components/Button";
import { storage } from "../utils/storage";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Please complete all required fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    storage.setUser({
      id: `U-${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      verified: false,
    });
    navigate("/verify");
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
        <h1 className="h2 auth-title">Create your RetinX.ai account</h1>
        <p className="auth-sub">For clinicians and screening centers.</p>

        <div className="field">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            className="input"
            value={form.name}
            placeholder="Nguyen Van A"
            onChange={(e) => update("name", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="work-email">Work Email</label>
          <input
            id="work-email"
            type="email"
            className="input"
            value={form.email}
            placeholder="doctor@hospital.vn"
            onChange={(e) => update("email", e.target.value)}
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="pw">Password</label>
            <input
              id="pw"
              type="password"
              className="input"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="pw2">Confirm Password</label>
            <input
              id="pw2"
              type="password"
              className="input"
              value={form.confirm}
              onChange={(e) => update("confirm", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <Button block size="lg" onClick={handleSubmit}>
          Create Account
        </Button>

        <p className="auth-foot">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>

      <p className="disclaimer auth-disclaimer">
        Research prototype — accounts are stored locally in your browser only.
      </p>
    </div>
  );
}
