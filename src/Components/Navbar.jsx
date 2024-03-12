import "./Navbar.css";
import { AnimatePresence, motion } from "framer-motion";
import { Pivot as Hamburger } from "hamburger-react";
import { useState } from "react";

const Navbar = ({ logo }) => {
  // mobile menu state
  const [isMenuOpen, setMenuOpen] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <nav>
      {/* logo */}
      <img src={logo} alt="gif logo" className="logo" />

      {/* nav list items */}
      <ul className="navlist">
        {/* twitter */}
        <a
          href="https://x.com/ArmeniLeds_SOL"
          target="_blank"
          rel="noopener noreferrer"
        >
          <li className="navitem">Twitter(X)</li>
        </a>

        {/* telegram */}
        <a
          href="https://t.me/armenileds"
          target="_blank"
          rel="noopener noreferrer"
        >
          <li className="navitem">Telegram</li>
        </a>

        {/* chart */}
        <a
          href="https://birdeye.so/token/5AJjM9VRFRDawVcCi7bsT56bMUij3iXcuovH7mxN1Spb?chain=solana"
          target="_blank"
          rel="noopener noreferrer"
        >
          <li className="navitem">Chart</li>
        </a>
      </ul>

      {/* nav buttons */}
      <ul className="navbuttons">
        <a
          href="https://jup.ag/swap/SOL-ARMENI_5AJjM9VRFRDawVcCi7bsT56bMUij3iXcuovH7mxN1Spb"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="btn buy_btn">Buy $ARMENI</button>
        </a>
      </ul>

      {/* mobile nav */}
      <Hamburger toggled={isMenuOpen} toggle={setMenuOpen} />
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="menu_container"
            key="menu"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <motion.ul
              className="navlist_mobile"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.a
                href="https://x.com/ghostwifcoin"
                target="_blank"
                rel="noopener noreferrer"
                variants={item}
              >
                <li className="navitem">Twitter(X)</li>
              </motion.a>
              <motion.a
                href="https://t.co/iubclBM3sH"
                target="_blank"
                rel="noopener noreferrer"
                variants={item}
              >
                <li className="navitem">Telegram</li>
              </motion.a>
              <motion.a
                href="https://t.co/6SF27Swspb"
                target="_blank"
                rel="noopener noreferrer"
                variants={item}
              >
                <li className="navitem">Chart</li>
              </motion.a>
              {/* nav buttons */}
              <motion.li className="navitem_btn" variants={item}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://raydium.io/swap/?inputCurrency=sol&outputCurrency=Cc3voFEFTrGmnhnP8x77ncZ6pivG8Kk9ir1t8AhBBaby&fixed=in"
                >
                  <button className="btn_mobile">BUY $GIF</button>
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
