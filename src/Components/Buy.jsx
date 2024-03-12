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
        <p className="howToBuy">HOW TO BUY $ARMENI</p>

        <div className="buy_flex">
          <div className="buy_flexbox">
            <p className="buy_head">1. CREATE SOLANA WALLET</p>
            <p className="buy_text">
              Create a Phantom or Backpack Wallet by using either your Mobile or
              Desktop device.
            </p>
          </div>

          <div className="buy_flexbox">
            <p className="buy_head">2. BUY SOLANA</p>
            <p className="buy_text">
              Buy Solana (SOL) on your wallet or send from an Exchange to your
              wallet.
            </p>
          </div>

          <div className="buy_flexbox buy_box">
            <p className="buy_head">3. SWAP $GIF</p>
            <p className="buy_text">
              Go to Jupiter (jup.ag) or Raydium (raydium.io), connect your
              wallet, paste $GIF C.A. and swap your Solana or USDC to $GIF.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Buy;
