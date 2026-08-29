import SafeImage from "../SafeImage";
import { DEMO_CASES } from "../../data/demoCases";
import type { DemoCase } from "../../data/demoCases";

interface Props {
  cases: DemoCase[];
  selectedId: string;
  eye: "left" | "right";
  onSelect: (id: string) => void;
  onEyeChange: (eye: "left" | "right") => void;
  onAnalyze: () => void;
}

export default function DemoSampleSelector({
  cases,
  selectedId,
  eye,
  onSelect,
  onEyeChange,
  onAnalyze,
}: Props) {
  const selected = cases.find((c) => c.id === selectedId) ?? cases[0];

  return (
    <>
      <div className="demo-bar">
        <div className="seg" role="group" aria-label="Select eye">
          <button
            type="button"
            className={`seg-btn ${eye === "right" ? "seg-btn-active" : ""}`}
            onClick={() => onEyeChange("right")}
          >
            Right Eye
          </button>
          <button
            type="button"
            className={`seg-btn ${eye === "left" ? "seg-btn-active" : ""}`}
            onClick={() => onEyeChange("left")}
          >
            Left Eye
          </button>
        </div>
        <span className="disclaimer">
          Research prototype — clinical decision support only.
        </span>
      </div>

      <div className="select-grid">
        <div className="thumb-col" role="listbox" aria-label="Retinal samples">
          {cases.map((item) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={item.id === selectedId}
              className={`thumb ${
                item.id === selectedId ? "thumb-active" : ""
              }`}
              onClick={() => onSelect(item.id)}
            >
              <span className="thumb-img">
                <SafeImage
                  src={item.original}
                  alt={item.sampleLabel}
                  label={item.sampleLabel}
                />
              </span>
              <span>{item.sampleLabel}</span>
            </button>
          ))}
        </div>

        <div className="card stage">
          <span className="eye-tag">
            {eye === "right" ? "Right Eye" : "Left Eye"} ·{" "}
            {selected.sampleLabel}
          </span>
          <div className="stage-frame">
            <SafeImage
              src={selected.original}
              alt="Selected fundus photograph"
              label={`${selected.sampleLabel} — original.jpg`}
            />
          </div>
          <button
            type="button"
            className="btn btn-retina btn-lg"
            onClick={onAnalyze}
            disabled={!selected}
          >
            Analyze
          </button>
          <p className="stage-caption">
            Grading is revealed only after analysis.
          </p>
        </div>
      </div>
    </>
  );
}
