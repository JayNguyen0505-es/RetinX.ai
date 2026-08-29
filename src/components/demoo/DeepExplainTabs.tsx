export type DeepMethod = "adasise" | "sgig" | "ccem";

const METHODS: { id: DeepMethod; label: string }[] = [
  { id: "adasise", label: "Ada-SISE" },
  { id: "sgig", label: "SG-IG" },
  { id: "ccem", label: "CCEM" }
];

interface Props {
  method: DeepMethod;
  onChange: (method: DeepMethod) => void;
}

export default function DeepExplainTabs({ method, onChange }: Props) {
  return (
    <div className="seg seg-retina" role="group" aria-label="Deep explanation method">
      {METHODS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`seg-btn ${method === item.id ? "seg-btn-active" : ""}`}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}