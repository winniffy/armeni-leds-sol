import "./App.css";
import logo from "./logo.svg";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";

function App() {
  return (
    <>
      <Navbar logo={logo} />
      <Hero logo={logo} />
    </>
  );
}

export default App;
