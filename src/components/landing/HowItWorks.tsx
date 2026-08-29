import { ClipboardCheck, Eye, Upload } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Upload",
    icon: <Upload size={38} strokeWidth={1.6} />,
    text: "Create or select a patient and upload a fundus photograph for the left or right eye.",
  },
  {
    n: "02",
    title: "Analyze",
    icon: <Eye size={38} strokeWidth={1.6} />,
    text: "RetinX.ai preprocesses the image and estimates diabetic-retinopathy severity.",
  },
  {
    n: "03",
    title: "Review",
    icon: <ClipboardCheck size={38} strokeWidth={1.6} />,
    text: "Inspect the predicted grade, visual explanation, and advanced CCEM analysis before saving the result to the patient record.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <span className="eyebrow">Workflow</span>

        <h2 className="h2">How It Works</h2>

        <p className="section-lead">
          From fundus image to explainable assessment in three simple steps.
        </p>

        <div className="flow">
          <svg
            className="flow-curve"
            viewBox="0 0 1000 190"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 212 78 C 285 145, 370 145, 448 78"
              fill="none"
              stroke="var(--retina)"
              strokeWidth="2.5"
              strokeDasharray="9 9"
              strokeLinecap="round"
              opacity="0.55"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d="M 552 78 C 625 18, 710 18, 788 60"
              fill="none"
              stroke="var(--retina)"
              strokeWidth="2.5"
              strokeDasharray="9 9"
              strokeLinecap="round"
              opacity="0.55"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {STEPS.map((step, i) => (
            <div className={`flow-step flow-step-${i + 1}`} key={step.n}>
              <div className="flow-ring">
                <span className="flow-num">{step.n}</span>
                {step.icon}
              </div>

              <h3 className="flow-title">{step.title}</h3>

              <p className="flow-text">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
