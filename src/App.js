import "./App.css";
import logo from "./logo.svg";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Tokenomics from "./Components/Tokenomics";
import Buy from "./Components/Buy";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Navbar logo={logo} />
      <Hero logo={logo} />
      <Tokenomics />
      <Buy />
      {/* <Footer logo={logo} /> */}
    </>
  );
}

export default App;
