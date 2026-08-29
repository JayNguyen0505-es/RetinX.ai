import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DemoSampleSelector from "../components/demoo/DemoSampleSelector";
import DemoProcessing from "../components/demoo/DemoProcessing";
import DemoResult from "../components/demoo/DemoResult";
import { DEMO_CASES } from "../data/demoCases";
import type { DemoCase } from "../data/demoCases";

type Stage = "select" | "processing" | "result";

export default function DemoAnalysisPage() {
  const [stage, setStage] = useState<Stage>("select");
  const [selectedId, setSelectedId] = useState(DEMO_CASES[2].id);
  const [eye, setEye] = useState<"left" | "right">("right");

  const selected = DEMO_CASES.find((c) => c.id === selectedId) ?? DEMO_CASES[0];

  return (
    <>
      <Navbar />
      <main className="demo-page">
        <div className="container demo-head">
          <span className="eyebrow">Interactive demo</span>
          <h1 className="h2">Try RetinX.ai</h1>
          <p>
            {stage === "result"
              ? "AI-assisted assessment with visual explanations."
              : "Select a retinal sample to explore the prototype. No account required."}
          </p>
        </div>

        <div className="container">
          {stage === "select" && (
            <DemoSampleSelector
              cases={DEMO_CASES}
              selectedId={selectedId}
              eye={eye}
              onSelect={setSelectedId}
              onEyeChange={setEye}
              onAnalyze={() => setStage("processing")}
            />
          )}

          {stage === "processing" && (
            <DemoProcessing
              imageSrc={selected.original}
              onDone={() => setStage("result")}
            />
          )}

          {stage === "result" && (
            <DemoResult
              demoCase={selected}
              eye={eye}
              onReset={() => setStage("select")}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
