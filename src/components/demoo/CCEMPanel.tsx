import { CircleDot } from "lucide-react";
import type { CcemWeights } from "../../data/demoCases";

const FACTORS = [
  "Prediction sensitivity",
  "Agreement",
  "Focus",
  "Retinal containment",
  "Clear salient peaks"
];

const ROWS: { key: keyof CcemWeights; label: string }[] = [
  { key: "gradcam", label: "Grad-CAM++" },
  { key: "adasise", label: "Ada-SISE" },
  { key: "sgig", label: "SG-IG" }
];

export default function CCEMPanel({ weights }: { weights: CcemWeights }) {
  return (
    <div className="panel">
      <p className="panel-title">Explanation contribution</p>
      <div className="bars">
        {ROWS.map((row, i) => (
          <div className="bar-row" key={row.key}>
            <span>{row.label}</span>
            <span className="bar-track">
              <span
                className={`bar-fill ${i === 2 ? "bar-fill-cyan" : ""}`}
                style={{ width: `${weights[row.key]}%` }}
              />
            </span>
            <span className="bar-val">{weights[row.key]}%</span>
          </div>
        ))}
      </div>

      <p className="note">
        CCEM combines complementary explanation maps using image-specific
        reliability estimates. These contributions describe how the consensus map
        was formed and are not clinical confidence scores.
      </p>

      <div className="badge-row">
        {FACTORS.map((factor) => (
          <span className="factor" key={factor}>
            <CircleDot size={12} /> {factor}
          </span>
        ))}
      </div>
    </div>
  );
}