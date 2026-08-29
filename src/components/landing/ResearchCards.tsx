import { useEffect, useRef, useState } from "react";

const STATS = [
  {
    label: "APTOS Validation QWK",
    value: 0.93,
    decimals: 2,
    note: "Quadratic weighted kappa",
  },
  {
    label: "Kaggle Private QWK",
    value: 0.92,
    decimals: 2,
    note: "Held-out private split",
  },
  {
    label: "Proposed XAI Method",
    text: "CCEM",
    note: "Consensus-Calibrated Explanation Map",
  },
];

function CountUp({
  target,
  decimals,
  start,
}: {
  target: number;
  decimals: number;
  start: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) {
      setDisplay(0);
      return;
    }
    const duration = 1600;
    const begin = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - begin) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target]);

  return <>{display.toFixed(decimals)}</>;
}

export default function ResearchCards() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisible(entries[0].isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section section-alt">
      <div className="container">
        <span className="eyebrow">Research</span>
        <h2 className="h2">Grounded in Published Experiments</h2>
        <p className="section-lead">
          Reported figures come from our internal research evaluation on public
          benchmark datasets. They describe model performance in a research
          setting and are not clinical validation results.
        </p>

        <div className="stat-row" ref={ref}>
          {STATS.map((stat) => (
            <div className="card stat-card" key={stat.label}>
              <span className="stat-label">{stat.label}</span>
              <strong className="stat-value">
                {stat.text ? (
                  stat.text
                ) : (
                  <CountUp
                    target={stat.value as number}
                    decimals={stat.decimals as number}
                    start={visible}
                  />
                )}
              </strong>
              <span className="stat-note">{stat.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
