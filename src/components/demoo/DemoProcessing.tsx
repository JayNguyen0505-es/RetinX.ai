import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import SafeImage from "../SafeImage";

const STEPS = [
  "Preparing retinal image",
  "Extracting retinal features",
  "Estimating DR severity",
  "Generating explanation maps"
];

interface Props {
  imageSrc: string;
  onDone: () => void;
}

export default function DemoProcessing({ imageSrc, onDone }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = STEPS.map((_, i) =>
      window.setTimeout(() => setStep(i + 1), (i + 1) * 620)
    );
    const finish = window.setTimeout(onDone, 2800);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(finish);
    };
  }, [onDone]);

  return (
    <div className="card proc-wrap">
      <div className="proc-ring">
        <div className="proc-img">
          <SafeImage src={imageSrc} alt="Retinal image" label="Analyzing" />
        </div>
        <span className="proc-spin" />
        <span className="proc-pulse" />
      </div>

      <h2 className="proc-title">Analyzing retinal image…</h2>

      <div className="proc-steps">
        {STEPS.map((text, i) => (
          <div className={`proc-step ${i < step ? "proc-step-on" : ""}`} key={text}>
            {i < step ? (
              <Check size={16} />
            ) : (
              <Loader2 size={16} className={i === step ? "" : ""} />
            )}
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}