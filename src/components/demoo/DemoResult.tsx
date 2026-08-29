import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, RotateCcw } from "lucide-react";
import SafeImage from "../SafeImage";
import SeverityScale from "./SeverityScale";
import CCEMPanel from "./CCEMPanel";
import { storage } from "../../utils/storage";
import type { DemoCase } from "../../data/demoCases";
import AnalysisModeTabs from "./AnalysisModeTabs";
import type { AnalysisMode } from "./AnalysisModeTabs";
import DeepExplainTabs from "./DeepExplainTabs";
import type { DeepMethod } from "./DeepExplainTabs";

interface Props {
  demoCase: DemoCase;
  eye: "left" | "right";
  onReset: () => void;
}

export default function DemoResult({ demoCase, eye, onReset }: Props) {
  const [mode, setMode] = useState<AnalysisMode>("original");
  const [method, setMethod] = useState<DeepMethod>("ccem");
  const [saved, setSaved] = useState(false);

  const user = storage.getUser();
  const eyeLabel = eye === "right" ? "Right Eye" : "Left Eye";

  const view = () => {
    if (mode === "original")
      return {
        src: demoCase.original,
        title: "Original fundus photograph",
        sub: "",
      };
    if (mode === "quick")
      return {
        src: demoCase.gradcam,
        title: "Grad-CAM++",
        sub: "Activation-based visual explanation.",
      };
    if (method === "adasise")
      return {
        src: demoCase.adasise,
        title: "Ada-SISE",
        sub: "Perturbation-based explanation of the severity estimate.",
      };
    if (method === "sgig")
      return {
        src: demoCase.sgig,
        title: "SG-IG",
        sub: "SmoothGrad Integrated Gradients attribution.",
      };
    return {
      src: demoCase.ccem,
      title: "Consensus-Calibrated Explanation Map",
      sub: "Reliability-weighted consensus across explanation methods.",
    };
  };

  const current = view();
  const showCcem = mode === "deep" && method === "ccem";

  const handleSave = () => {
    const patients = storage.getPatients();
    const patientId = patients[0]?.id ?? "P-00128";
    storage.addAnalysis({
      id: `A-${Date.now()}`,
      patientId,
      eye,
      imageUrl: demoCase.original,
      createdAt: new Date().toISOString(),
      drGrade: demoCase.grade,
      drLabel: demoCase.label,
      severityScore: demoCase.severityScore,
      reviewStatus: "pending",
    });
    setSaved(true);
  };

  return (
    <>
      <div className="result-grid">
        <div>
          <div className="card stage">
            <span className="eye-tag">{eyeLabel}</span>
            <div className="stage-frame">
              <SafeImage
                src={current.src}
                alt={current.title}
                label={current.title}
              />
            </div>
            <AnalysisModeTabs mode={mode} onChange={setMode} />
            {mode === "deep" && (
              <DeepExplainTabs method={method} onChange={setMethod} />
            )}
            <p className="stage-caption">
              <strong>{current.title}</strong>
              {current.sub ? ` — ${current.sub}` : ""}
            </p>
          </div>
        </div>

        <div>
          <div className="panel">
            <p className="panel-title">AI Screening Result</p>
            <div
              className={`grade-block ${
                demoCase.grade === 0 ? "grade-block-0" : ""
              }`}
            >
              <span className="grade-sub">
                Diabetic Retinopathy · {eyeLabel}
              </span>
              <div className="grade-name">{demoCase.label}</div>
              <span className="grade-sub">Grade {demoCase.grade}</span>
              <div className="score-row">
                <span className="score-val">
                  {demoCase.severityScore.toFixed(2)}
                </span>
                <span className="score-lab">Severity score</span>
              </div>
            </div>
            <SeverityScale score={demoCase.severityScore} />
            <p className="note">
              Ordinal grading with a continuous severity score. This is an
              AI-assisted assessment intended to support clinician review.
            </p>
          </div>

          {showCcem && <CCEMPanel weights={demoCase.ccemWeights} />}
        </div>
      </div>

      <div className="card save-card">
        {saved ? (
          <span className="saved-msg">
            <Check size={18} /> Analysis saved to patient record.
          </span>
        ) : user ? (
          <>
            <h3 className="h3">Save this analysis to a patient record?</h3>
            <div className="save-actions">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleSave}
              >
                Save to Patient Record
              </button>
              <button
                type="button"
                className="btn btn-outline btn-lg"
                onClick={onReset}
              >
                <RotateCcw size={16} /> Analyze Another Sample
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="h3">
              Want to save this analysis to a patient record?
            </h3>
            <p className="note">
              Clinician accounts keep patient histories and saved assessments.
            </p>
            <div className="save-actions">
              <Link to="/login" className="btn btn-primary btn-lg">
                Sign In to Save
              </Link>
              <button
                type="button"
                className="btn btn-outline btn-lg"
                onClick={onReset}
              >
                Continue Exploring
              </button>
            </div>
          </>
        )}
      </div>

      <p className="proto-note">
        Research prototype — clinical decision support only. Not intended for
        autonomous diagnosis.
      </p>
    </>
  );
}
