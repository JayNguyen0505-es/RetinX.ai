const TICKS = ["No DR", "Mild", "Moderate", "Severe", "PDR"];

export default function SeverityScale({ score }: { score: number }) {
  const clamped = Math.min(4, Math.max(0, score));
  const percent = (clamped / 4) * 100;

  return (
    <div className="scale">
      <div className="scale-track">
        <span className="scale-marker" style={{ left: `${percent}%` }} />
      </div>
      <div className="scale-ticks">
        {TICKS.map((tick, i) => (
          <div className="scale-tick" key={tick}>
            <strong>{i}</strong>
            {tick}
          </div>
        ))}
      </div>
      <p className="scale-value">Continuous severity score {clamped.toFixed(2)}</p>
    </div>
  );
}