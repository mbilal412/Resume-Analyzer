import Navbar from "../../../shared/components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import HowItWorks from "../../components/how-it-works/HowItWorks";
import VisualPreview from "../../components/visual-preview/VisualPreview";
import FinalCTA from "../../components/final-cta/FinalCTA";
import Footer from "../../../shared/components/footer/Footer";
import "./HomePage.scss";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function HomePage() {

  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/dashboard");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if(!isLoaded || isSignedIn) {
    return (
      <div className="spinner-container">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <div className="home-page">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <VisualPreview />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
