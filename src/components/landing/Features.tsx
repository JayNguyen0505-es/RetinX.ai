import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SafeImage from "../SafeImage";

const SCALE = ["No DR", "Mild", "Moderate", "Severe", "PDR"];
const XAI_TABS = ["Grad-CAM++", "Ada-SISE", "SG-IG", "CCEM"];

const ROWS = [
  {
    id: "P-00505",
    name: "Nguyen T.",
    date: "Aug 26",
    grade: "No DR",
    status: "Reviewed",
  },
  {
    id: "P-02902",
    name: "Do T.",
    date: "Aug 25",
    grade: "Severe",
    status: "Pending",
  },
  {
    id: "P-01609",
    name: "Nguyen H.",
    date: "Aug 24",
    grade: "Mild",
    status: "Reviewed",
  },
];

const FEATURES = [
  {
    title: "Fast DR Grading",
    text: "Upload a fundus photograph and receive an AI-assisted estimate of diabetic-retinopathy severity to support faster clinical review.",
    render: () => (
      <div className="mock mock-grading">
        <div className="mock-fundus">
          <SafeImage
            src="/assets/demo-fundus.jpg"
            alt="Fundus"
            label="Fundus"
          />
        </div>
        <div className="mock-scale">
          {SCALE.map((step, i) => (
            <div
              className={`scale-step ${i === 2 ? "scale-step-active" : ""}`}
              key={step}
            >
              <span className="scale-dot" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "See the Evidence Behind the Grade",
    text: "Visual explanations help clinicians inspect which retinal regions influenced the AI assessment instead of relying on a black-box prediction alone.",
    render: () => (
      <div className="mock mock-split">
        <div>
          <span className="mock-caption">Original Fundus</span>
          <div className="mock-pane">
            <SafeImage
              src="/assets/demo-fundus.jpg"
              alt="Original fundus"
              label="Original"
            />
          </div>
        </div>
        <div>
          <span className="mock-caption">Grad-CAM++ Heatmap</span>
          <div className="mock-pane">
            <SafeImage
              src="/assets/demo-gradcam.jpg"
              alt="Grad-CAM++ heatmap"
              label="Grad-CAM++"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Go Beyond a Single Explanation",
    text: "Deep Analysis combines complementary explainability methods through our Consensus-Calibrated Explanation Map (CCEM), producing a reliability-weighted view of the model's decision.",
    render: () => (
      <div className="mock mock-xai">
        <div className="mock-tabs">
          {XAI_TABS.map((tab) => (
            <span
              className={`mock-tab ${tab === "CCEM" ? "mock-tab-active" : ""}`}
              key={tab}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="mock-pane mock-pane-tall">
          <SafeImage
            src="/assets/demo-ccem.jpg"
            alt="CCEM map"
            label="CCEM map"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Keep Every Analysis Organized",
    text: "Patient-based records allow clinicians to quickly retrieve previous fundus images, AI assessments, explanations, and review history.",
    render: () => (
      <div className="mock mock-table">
        <div className="mini-row mini-head">
          <span>Patient ID</span>
          <span>Patient</span>
          <span>Last Analysis</span>
          <span>DR Grade</span>
          <span>Status</span>
        </div>
        {ROWS.map((row) => (
          <div className="mini-row" key={row.id}>
            <span className="mono">{row.id}</span>
            <span>{row.name}</span>
            <span>{row.date}</span>
            <span>{row.grade}</span>
            <span>
              <em
                className={`chip ${
                  row.status === "Pending" ? "chip-warn" : "chip-ok"
                }`}
              >
                {row.status}
              </em>
            </span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function Features() {
  const [index, setIndex] = useState(0);
  const feature = FEATURES[index];
  const go = (next: number) =>
    setIndex((next + FEATURES.length) % FEATURES.length);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setIndex((prev) => (prev + 1) % FEATURES.length),
      5000
    );
    return () => window.clearTimeout(timer);
  }, [index]);

  return (
    <section className="section section-alt" id="features">
      <div className="container">
        <span className="eyebrow">Features</span>
        <h2 className="h2">Built Around Clinician Review</h2>

        <div className="carousel card">
          <div className="carousel-visual" key={`visual-${index}`}>
            {feature.render()}
          </div>

          <div className="carousel-copy" key={`copy-${index}`}>
            <span className="feature-index">
              0{index + 1} <em>/ 0{FEATURES.length}</em>
            </span>
            <h3 className="h3">{feature.title}</h3>
            <p>{feature.text}</p>

            <div className="carousel-controls">
              <button
                type="button"
                className="round-btn"
                onClick={() => go(index - 1)}
                aria-label="Previous feature"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="round-btn"
                onClick={() => go(index + 1)}
                aria-label="Next feature"
              >
                <ChevronRight size={18} />
              </button>

              <div className="dots">
                {FEATURES.map((f, i) => (
                  <button
                    key={f.title}
                    type="button"
                    className={`dot ${i === index ? "dot-active" : ""}`}
                    onClick={() => setIndex(i)}
                    aria-label={`Show feature ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
