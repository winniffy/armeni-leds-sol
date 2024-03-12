import { useState } from "react";
import "./Tokenomics.css";
import { motion } from "framer-motion";

const Tokenomics = () => {
  const [isCopied, setIsCopied] = useState(false);
  const addressText = "5AJjM9VRFRDawVcCi7bsT56bMUij3iXcuovH7mxN1Spb";

  const handleCopyClick = () => {
    const tempInput = document.createElement("input");
    tempInput.value = addressText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <section className="tokenomics_section">
      {/* contract address */}
      <motion.div
        className="tokenomics_box"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <button className="token_btn token_btn-ca">CONTRACT ADDRESS</button>
        <p className="address">{addressText}</p>
        <button className="token_btn token_btn-copy" onClick={handleCopyClick}>
          {isCopied ? "COPIED" : "COPY"}
        </button>
      </motion.div>

      {/* tokenomics */}
      <div className="tokenomics-box-bottom">
        <motion.h1
          className="tokenomics-box_header"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          $ARMENI TOKENOMICS
        </motion.h1>

        <motion.div
          className="tokenomics-box_flex"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="tokenomics-mini_box">
            <p className="tokenomics-mini_header">Supply</p>
            <p className="tokenomics-mini_text">
              <b>999,941,692.85</b>
            </p>
          </div>

          <div className="tokenomics-mini_box">
            <p className="tokenomics-mini_header">Ownership</p>
            <p className="tokenomics-mini_text">
              <b>Renounced</b>
            </p>
          </div>

          <div className="tokenomics-mini_box">
            <p className="tokenomics-mini_header">Team Tokens</p>
            <p className="tokenomics-mini_text">
              <b>0</b>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tokenomics;
