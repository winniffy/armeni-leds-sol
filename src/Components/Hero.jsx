import Carousel from "./Carousel";
import "./Hero.css";
import { motion } from "framer-motion";

const Hero = ({ logo }) => {
  return (
    <header className="hero_container">
      {/* hero image slider top */}
      <motion.div
        className="hero_img-container"
        // initial={{ opacity: 0, scale: 0.5 }}
        // animate={{ opacity: 1, scale: 1 }}
        // transition={{ duration: 0.8 }}
      >
        {/* <img src={logo} alt="" className="hero_img" /> */}

        <Carousel />
      </motion.div>

      {/* text bottom */}
      <motion.div
        className="hero_left"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="hero_header">LEDS ON TEP!</h1>
        <p className="hero_subtext">FOCK ET!</p>

        {/* buttons */}
        <div className="hero_buttons-container">
          <a
            href="https://birdeye.so/token/5AJjM9VRFRDawVcCi7bsT56bMUij3iXcuovH7mxN1Spb?chain=solana"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="hero_btn">Chart</button>
          </a>
          <a
            href="https://jup.ag/swap/SOL-ARMENI_5AJjM9VRFRDawVcCi7bsT56bMUij3iXcuovH7mxN1Spb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="hero_btn">Buy</button>
          </a>
        </div>
      </motion.div>
    </header>
  );
};

export default Hero;
