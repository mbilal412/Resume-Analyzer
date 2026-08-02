import Navbar from '../../components/navbar/Navbar';
import Hero from '../../components/hero/Hero';
import HowItWorks from '../../components/how-it-works/HowItWorks';
import Footer from '../../components/footer/Footer';
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
