import { Award, Microscope } from "lucide-react";
import SafeImage from "../SafeImage";

export default function AboutUs() {
  return (
    <section className="section" id="about">
      <div className="container">
        <span className="eyebrow">About Us</span>
        <h2 className="h2">Why We Built RetinX.ai</h2>
        <p className="section-lead">
          Diabetic retinopathy is diagnosed from fundus photographs, and grading
          them reliably requires an ophthalmologist or a trained reader. That
          expertise takes years to build and tends to concentrate in major urban
          hospitals, so screening programmes in smaller provincial and rural
          clinics often depend on referring images elsewhere and waiting for a
          report. Meanwhile the number of images to review keeps growing as
          diabetes screening expands.
        </p>
        <p className="section-lead">
          The consequence is delay at exactly the point where early detection
          matters most, since early-stage retinopathy is treatable but largely
          asymptomatic. RetinX.ai explores how explainable artificial
          intelligence can help — not by replacing the clinician's judgement,
          but by prioritising which images need attention first and showing the
          retinal evidence behind every AI assessment so a reviewer can accept,
          question, or overrule it.
        </p>

        <div className="about-grid">
          <div className="card about-text">
            <span className="icon-pill">
              <Microscope size={18} />
            </span>
            <h3 className="h3">From Research to Product</h3>
            <p>
              RetinX.ai grew out of our research project,{" "}
              <em>
                Lesion-Aware Explainable AI Diabetic Retinopathy Grading on
                Fundus Images
              </em>
              . The work combines ordinal severity grading with complementary
              explainability methods so that each AI assessment can be inspected
              rather than accepted on trust.
            </p>
            <div className="award-line">
              <Award size={18} />
              <span>
                First Prize at the USTH Student Scientific Research Competition
                2026
              </span>
            </div>
          </div>

          <figure className="card photo-card">
            <SafeImage
              src="/assets/usth-first-prize.jpg"
              alt="Our team receiving First Prize at USTH"
              label="Team First Prize Photo"
              className="photo-card-img"
            />
            <figcaption>
              Our team receiving First Prize — USTH Student Scientific Research
              Competition 2026.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
