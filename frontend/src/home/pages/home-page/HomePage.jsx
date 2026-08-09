import Navbar from "../../../shared/components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import HowItWorks from "../../components/how-it-works/HowItWorks";
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
  }, [isLoaded, isSignedIn]);

  return (
    <div className="home-page">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
