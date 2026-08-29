import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/landing/Hero";
import PartnerLogos from "../components/landing/PartnerLogos";
import AboutUs from "../components/landing/AboutUs";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import ResearchCards from "../components/landing/ResearchCards";
import FinalCTA from "../components/landing/FinalCTA";

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;
    const timer = window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [location.state]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PartnerLogos />
        <AboutUs />
        <Features />
        <HowItWorks />
        <ResearchCards />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}