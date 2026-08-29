import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MailCheck } from "lucide-react";
import Button from "../components/Button";
import { storage } from "../utils/storage";

export default function VerifyPage() {
  const navigate = useNavigate();
  const user = storage.getUser();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const setDigit = (index: number, value: string) => {
    const clean = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = clean;
      return next;
    });
    if (clean && index < 5) refs.current[index + 1]?.focus();
  };

  const handleKey = (index: number, key: string) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = digits.join("");
    if (code.length !== 6) {
      setError("Please enter all six digits.");
      return;
    }
    if (user) storage.setUser({ ...user, verified: true });
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="card auth-card auth-card-center">
        <span className="icon-pill icon-pill-lg">
          <MailCheck size={22} />
        </span>
        <h1 className="h2 auth-title">Verify your email</h1>
        <p className="auth-sub">
          We sent a 6-digit verification code to
          <br />
          <strong>{user?.email ?? "example@hospital.vn"}</strong>
        </p>

        <div className="code-row">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              className="code-input"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              aria-label={`Digit ${i + 1}`}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e.key)}
            />
          ))}
        </div>

        {error && <p className="form-error">{error}</p>}

        <Button block size="lg" onClick={handleVerify}>
          Verify
        </Button>

        <p className="auth-foot">
          Demo code: <strong>123456</strong> — any 6 digits will pass.
        </p>
      </div>

      <p className="disclaimer auth-disclaimer">
        Mocked front-end verification — no email is actually sent.
      </p>
    </div>
  );
}