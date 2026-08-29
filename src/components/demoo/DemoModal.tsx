import { useEffect, useState } from "react";
import { X } from "lucide-react";
import SafeImage from "../SafeImage";
import { DEMO_CASES } from "../../data/demoCases";
import type { DemoCase } from "../../data/demoCases";

type Stage = "select" | "processing" | "result";
type View = "original" | "gradcam" | "adasise" | "sgig" | "ccem";

const VIEWS: Array<{ id: View; label: string; caption: string }> = [
  { id: "original", label: "Original", caption: "Original fundus photograph" },
  {
    id: "gradcam",
    label: "Grad-CAM++",
    caption: "Activation-based explanation",
  },
  {
    id: "adasise",
    label: "Ada-SISE",
    caption: "Perturbation-based explanation",
  },
  { id: "sgig", label: "SG-IG", caption: "SmoothGrad Integrated Gradients" },
  {
    id: "ccem",
    label: "CCEM",
    caption: "Consensus-Calibrated Explanation Map",
  },
];

const STEPS = [
  "Preparing retinal image",
  "Extracting retinal features",
  "Estimating DR severity",
  "Generating explanation maps",
];

export default function DemoModal({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<Stage>("select");
  const [selected, setSelected] = useState<DemoCase | null>(null);
  const [eye, setEye] = useState<"left" | "right">("right");
  const [view, setView] = useState<View>("original");
  const [step, setStep] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    if (stage !== "processing") return;
    const timers = STEPS.map((_, i) =>
      window.setTimeout(() => setStep(i), i * 620)
    );
    const done = window.setTimeout(() => {
      setView("original");
      setStage("result");
    }, 2700);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(done);
    };
  }, [stage]);

  const reset = () => {
    setStage("select");
    setSelected(null);
    setStep(0);
  };

  const active = VIEWS.find((v) => v.id === view) ?? VIEWS[0];
  const imageSrc = selected ? selected[view] : "";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-shell"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="RetinX.ai demo"
      >
        <header className="modal-head">
          <div>
            <h2 className="modal-title">Upload Fundus</h2>
            <p className="modal-sub">
              Select a retinal sample to run the RetinX.ai prototype.
            </p>
          </div>
          <div className="modal-head-actions">
            {stage === "result" && (
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={reset}
              >
                New sample
              </button>
            )}
            <button
              type="button"
              className="modal-close"
              onClick={onClose}
              aria-label="Close demo"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        <div className="modal-body">
          <div className="modal-rail">
            {DEMO_CASES.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`modal-thumb ${
                  selected?.id === item.id ? "modal-thumb-active" : ""
                }`}
                onClick={() => {
                  setSelected(item);
                  setStage("select");
                }}
                disabled={stage === "processing"}
              >
                <SafeImage
                  src={item.original}
                  alt={`Sample ${i + 1}`}
                  label={`S${i + 1}`}
                />
              </button>
            ))}
          </div>

          <div className="modal-main">
            {stage === "result" ? (
              <span className="modal-eye-tag">
                {eye === "right" ? "Right Eye" : "Left Eye"}
              </span>
            ) : (
              <div className="seg">
                <button
                  type="button"
                  className={`seg-btn ${
                    eye === "right" ? "seg-btn-active" : ""
                  }`}
                  onClick={() => setEye("right")}
                >
                  Right Eye
                </button>
                <button
                  type="button"
                  className={`seg-btn ${
                    eye === "left" ? "seg-btn-active" : ""
                  }`}
                  onClick={() => setEye("left")}
                >
                  Left Eye
                </button>
              </div>
            )}

            <div className="modal-circle">
              {stage === "select" && !selected && (
                <div className="modal-empty">
                  <strong>Choose a fundus sample</strong>
                  <span>Select from the list to continue</span>
                </div>
              )}

              {stage === "select" && selected && (
                <SafeImage
                  src={selected.original}
                  alt="Selected fundus"
                  label="Fundus"
                />
              )}

              {stage === "processing" && selected && (
                <>
                  <SafeImage
                    src={selected.original}
                    alt="Analyzing"
                    label="Fundus"
                  />
                  <div className="modal-scrim">
                    <span className="proc-spin" />
                    <strong>Analyzing retinal image…</strong>
                    <span className="modal-step">{STEPS[step]}</span>
                  </div>
                </>
              )}

              {stage === "result" && selected && (
                <SafeImage
                  src={imageSrc}
                  alt={active.caption}
                  label={active.label}
                />
              )}
            </div>

            {stage === "result" ? (
              <>
                <div className="view-tabs">
                  {VIEWS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`view-tab ${
                        view === item.id ? "view-tab-active" : ""
                      }`}
                      onClick={() => setView(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <p className="modal-caption">{active.caption}</p>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-retina btn-lg"
                disabled={!selected || stage === "processing"}
                onClick={() => setStage("processing")}
              >
                Analyze
              </button>
            )}
          </div>

          <aside className="modal-panel">
            {stage === "result" && selected ? (
              <>
                <p className="panel-title">AI Screening Result</p>

                <div
                  className={`grade-block ${
                    selected.grade === 0 ? "grade-block-0" : ""
                  }`}
                >
                  <span className="grade-sub">Diabetic Retinopathy</span>
                  <p className="grade-name">{selected.label}</p>
                  <span className="grade-sub">Grade {selected.grade}</span>
                  <div className="score-row">
                    <span className="score-val">
                      {selected.severityScore.toFixed(2)}
                    </span>
                    <span className="score-lab">Severity score</span>
                  </div>
                </div>

                <div className="scale">
                  <div className="scale-track">
                    <span
                      className="scale-marker"
                      style={{ left: `${(selected.severityScore / 4) * 100}%` }}
                    />
                  </div>
                  <div className="scale-ticks">
                    {["No DR", "Mild", "Moderate", "Severe", "PDR"].map((t) => (
                      <span className="scale-tick" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="weight-label">Region of interest</p>
                <p className="modal-focus">{selected.focusRegion}</p>

                {view === "ccem" && (
                  <>
                    <p className="weight-label">Explanation contribution</p>
                    <div className="bars">
                      {[
                        {
                          label: "Grad-CAM++",
                          v: selected.ccemWeights.gradcam,
                        },
                        { label: "Ada-SISE", v: selected.ccemWeights.adasise },
                        { label: "SG-IG", v: selected.ccemWeights.sgig },
                      ].map((row) => (
                        <div className="bar-row" key={row.label}>
                          <span>{row.label}</span>
                          <span className="bar-track">
                            <span
                              className="bar-fill"
                              style={{ width: `${row.v}%` }}
                            />
                          </span>
                          <span className="bar-val">{row.v}%</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <p className="proto-note">
                  Research prototype — clinical decision support only. Not
                  intended for autonomous diagnosis.
                </p>
              </>
            ) : (
              <div className="modal-panel-empty">
                <p className="panel-title">AI Screening Result</p>
                <p>
                  The DR grade, continuous severity score, and explanation maps
                  appear here once analysis completes.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
