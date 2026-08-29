export type AnalysisMode = "original" | "enhanced" | "quick" | "deep";

const MODES: { id: AnalysisMode; label: string }[] = [
  { id: "original", label: "Original" },
  { id: "quick", label: "Quick Explain" },
  { id: "deep", label: "Deep Explain" },
];

interface Props {
  mode: AnalysisMode;
  onChange: (mode: AnalysisMode) => void;
}

export default function AnalysisModeTabs({ mode, onChange }: Props) {
  return (
    <div className="seg seg-retina" role="group" aria-label="Analysis view">
      {MODES.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`seg-btn ${mode === item.id ? "seg-btn-active" : ""}`}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
