import React, { useState } from 'react';
import styles from "./Tokenomics.module.css";
import { motion } from "framer-motion";

const Tokenomics: React.FC = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const addressText: string = "5AJjM9VRFRDawVcCi7bsT56bMUij3iXcuovH7mxN1Spb";

  const handleCopyClick = (): void => {
    navigator.clipboard.writeText(addressText).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <section className={styles.tokenomicsSection}>
      <motion.div
        className={styles.tokenomicsBox}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <button className={`${styles.tokenBtn} ${styles.tokenBtnCa}`}>CONTRACT ADDRESS</button>
        <p className={styles.address}>{addressText}</p>
        <button className={`${styles.tokenBtn} ${styles.tokenBtnCopy}`} onClick={handleCopyClick}>
          {isCopied ? "COPIED" : "COPY"}
        </button>
      </motion.div>
      <div className={styles.tokenomicsBoxBottom}>
        <motion.h1
          className={styles.tokenomicsBoxHeader}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          $ARMENI TOKENOMICS
        </motion.h1>
        <motion.div
          className={styles.tokenomicsBoxFlex}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={styles.tokenomicsMiniBox}>
            <p className={styles.tokenomicsMiniHeader}>Supply</p>
            <p className={styles.tokenomicsMiniText}>
              <b>999,941,692.85</b>
            </p>
          </div>
          <div className={styles.tokenomicsMiniBox}>
            <p className={styles.tokenomicsMiniHeader}>Ownership</p>
            <p className={styles.tokenomicsMiniText}>
              <b>Renounced</b>
            </p>
          </div>
          <div className={styles.tokenomicsMiniBox}>
            <p className={styles.tokenomicsMiniHeader}>Team Tokens</p>
            <p className={styles.tokenomicsMiniText}>
              <b>0</b>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tokenomics;
