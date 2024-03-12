import React from "react";
import "./Buy.css";
import { motion } from "framer-motion";

const Buy = () => {
  return (
    <motion.section
      className="buy_section"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div>
        <h1 className="howToBuy">HOW TO BUY $ARMENI</h1>

        {/* create waallet box */}
        <div className="buy_flex">
          <div className="buy_flexbox">
            <h3 className="buy_number">1</h3>
            <p className="buy_head">CREATE SOLANA WALLET</p>
            <p className="buy_text">
              Create a Phantom or Backpack Wallet by using either your Mobile or
              Desktop device.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/backpack/aflkmfhebedbjioipglgcbcmnbpgliof"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="buy_flexbox-btn">Create Wallet</button>
            </a>
          </div>

          {/* buy box */}
          <div className="buy_flexbox">
            <h3 className="buy_number">2</h3>
            <p className="buy_head">BUY SOLANA</p>
            <p className="buy_text">
              Buy Solana (SOL) on your wallet or send from an Exchange to your
              wallet.
            </p>
            <a
              href="https://jup.ag/swap/USDC-SOL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="buy_flexbox-btn">Buy $SOL</button>
            </a>
          </div>

          {/* swap box */}
          <div className="buy_flexbox buy_box">
            <h3 className="buy_number">3</h3>
            <p className="buy_head">SWAP $ARMENI</p>
            <p className="buy_text">
              Go to jup.ag, connect wallet, paste $ARMENI C.A. and swap your SOL
              or USDC to $ARMENI.
            </p>
            <a
              href="https://jup.ag/swap/SOL-ARMENI_5AJjM9VRFRDawVcCi7bsT56bMUij3iXcuovH7mxN1Spb"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="buy_flexbox-btn">Swap $Armeni</button>
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Buy;
