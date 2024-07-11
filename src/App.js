import React, { useState } from 'react';
import './index.css';
import logo from './logo.svg';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Tokenomics from './Components/Tokenomics';
import Buy from './Components/Buy';
import Footer from './Components/Footer';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (darkMode) {
            document.body.classList.remove('dark-mode');
        } else {
            document.body.classList.add('dark-mode');
        }
    };

    return (
        <>
            <Navbar logo={logo} />
            <button onClick={toggleDarkMode} style={{ position: 'fixed', top: '10px', right: '10px' }}>
                Toggle Dark Mode
            </button>
            <Hero logo={logo} />
            <Tokenomics />
            <Buy />
            <Footer logo={logo} />
        </>
    );
}

export default App;

