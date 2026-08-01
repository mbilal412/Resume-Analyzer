import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import Footer from '../../components/Footer/Footer';
import './HomePage.scss';

function HomePage() {
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
