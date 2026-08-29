import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta">
          <h2 className="h2 cta-title">
            Bring explainable AI into retinal screening.
          </h2>
          <p>
            Explore the RetinX.ai prototype and see how transparent AI
            assessments fit into a clinician's screening workflow.
          </p>
          <div className="cta-actions">
            <Link to="/login" className="btn btn-accent btn-lg">
              Sign In
            </Link>
            <button
              type="button"
              className="btn btn-ghost btn-lg"
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore How It Works
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
