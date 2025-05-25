import React, { useState } from 'react';
import ShowCaseSection from './components/ShowCaseSection';
import HeroAndHeader from './components/HeroAndHeader';
import AboutSection from './components/AboutSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Curriculum from './components/Curriculum';

function App() {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <HeroAndHeader onLoadComplete={() => setShowContent(true)} />
      {showContent && (
        <div className="site-wrapper">
          <AboutSection />
          <Curriculum />
          <ShowCaseSection />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
