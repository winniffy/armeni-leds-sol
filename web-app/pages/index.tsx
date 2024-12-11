import React from 'react';
import Navbar from '../src/Components/Navbar';
import HeroBanner from '../src/Components/HeroBanner';
import Sell from '../src/Components/Sell';
import Tokenomics from '../src/Components/Tokenomics';
import Footer from '../src/Components/Footer';
import ChatInterface from '../src/Components/ChatInterface';
import ErrorBoundary from '../src/Components/ErrorBoundary';

const Home: React.FC = () => {
  const logoPath = "/apple-touch-icon.png";
  
  return (
    <div>
      <Navbar logo={logoPath} />
      <HeroBanner />
      <Sell />
      <Tokenomics />
      <ErrorBoundary>
        <ChatInterface />
      </ErrorBoundary>
      <Footer logo={logoPath} />
    </div>
  );
};

export default Home;


