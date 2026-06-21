import { useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeTicker from './components/MarqueeTicker';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Industries from './components/Industries';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrolled = (window.scrollY / scrollHeight) * 100;
        const progressBar = document.querySelector('.scroll-progress-bar') as HTMLElement;
        if (progressBar) {
          progressBar.style.width = `${scrolled}%`;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar at the top of viewport */}
      <div className="scroll-progress-bar" />

      {/* Luxury GSAP custom cursor */}
      <CustomCursor />

      {/* Background ambient drifting gold particle canvas */}
      <ParticleBackground />

      {/* Header Navigation with backdrop blur */}
      <Navbar />

      {/* Cinematic Hero Entrance Section */}
      <Hero />

      {/* Infinite scrolling industry vertical marquee ticker */}
      <MarqueeTicker />

      {/* Two-column About quote and counter-based statistics */}
      <About />

      {/* Asymmetric Core Capabilities services cards */}
      <Services />

      {/* Linear-inspired sticky horizontal timeline process */}
      <Process />

      {/* Parallax typographic core industry verticals list */}
      <Industries />

      {/* Value propositions with self-drawing SVG checkmarks */}
      <WhyUs />

      {/* Minimal dark lead generation intake form */}
      <Contact />

      {/* Single-line footer with location indicators */}
      <Footer />
    </>
  );
}

export default App;
