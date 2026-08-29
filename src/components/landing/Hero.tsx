import { useState } from "react";
import { ArrowRight, Layers, ScanEye, Sparkles } from "lucide-react";
import SafeImage from "../SafeImage";
import DemoModal from "../demoo/DemoModal";

export default function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section className="hero-dark">
        <div className="container hero-grid">
          <div className="hero-stack">
            <div className="hero-img-card hero-img-main">
              <SafeImage
                src="/assets/hero-fundus.jpg"
                alt="Fundus photograph"
                label="hero-fundus.jpg"
              />
            </div>

            <div className="hero-img-card hero-img-overlay">
              <SafeImage
                src="/assets/hero-overlay.png"
                alt="Lesion-aware explanation overlay"
                label="hero-overlay.png"
              />
            </div>

            <span className="float-badge badge-a">
              <Sparkles size={14} /> Explainable AI
            </span>

            <span className="float-badge badge-b">
              <ScanEye size={14} /> Lesion-aware
            </span>

            <span className="float-badge badge-c">
              <Layers size={14} /> CCEM
            </span>
          </div>

          <div className="hero-copy">
            <h1 className="h1">
              Explainable AI for
              <br />
              Diabetic Retinopathy Screening
            </h1>

            <p className="hero-sub">
              Support faster retinal grading with AI while keeping the evidence
              visible to clinicians.
            </p>

            <p className="hero-body">
              RetinX.ai analyzes fundus photographs, estimates
              diabetic-retinopathy severity, and provides visual explanations
              through conventional XAI methods and our proposed CCEM framework.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-retina btn-lg"
                onClick={() => setDemoOpen(true)}
              >
                Try RetinX.ai <ArrowRight size={17} />
              </button>
            </div>

            <p className="disclaimer">
              Research prototype — clinical decision support only.
            </p>
          </div>
        </div>
      </section>

      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </>
  );
}
