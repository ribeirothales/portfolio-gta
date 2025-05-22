import React, { useState } from 'react';
import ShowCaseSection from './components/ShowCaseSection';
import HeroAndHeader from './components/HeroAndHeader';
import AboutSection from './components/AboutSection';

function App() {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <HeroAndHeader onLoadComplete={() => setShowContent(true)} />
      {showContent && (
        <div className="site-wrapper">
          <AboutSection />
          <ShowCaseSection />
        </div>
      )}
    </>
  );
}

export default App;
