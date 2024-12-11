import React from 'react';
import styles from './Navbar.module.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import Link from 'next/link';
import Image from 'next/image';
import SuiWalletButton from './SuiWalletButton';

const birdeyeLogo = "/Assets/birdeye.png";
const armeniLogo = "/Assets/Rlogo.jpeg"; // Path to the new logo

const Navbar: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.leftSection}>
        <Link href="/" passHref>
          <Image
            src={armeniLogo}
            alt="Armeni LEDs logo"
            className={styles.logo}
            width={200} // Updated width to make logo more visible
            height={100} // Updated height
          />
        </Link>
      </div>
      <ul className={styles.centerSection}>
        <li className={styles.navitem}>
          <Link href="https://x.com/ArmeniLeds_SOL" passHref>
            <XIcon className={`${styles.navicon} ${styles.icon}`} style={{ fontSize: '2rem' }} /> {/* Increased icon size */}
          </Link>
        </li>
        <li className={styles.navitem}>
          <Link href="https://t.me/armenileds" passHref>
            <TelegramIcon className={`${styles.navicon} ${styles.icon}`} style={{ fontSize: '2rem' }} /> {/* Increased icon size */}
          </Link>
        </li>
        <li className={styles.navitem}>
          <Link
            href="https://birdeye.so/token/5AJjM9VRFRDawVcCi7bsT56bMUij3iXcuovH7mxN1Spb?chain=solana"
            passHref
          >
            <Image
              src={birdeyeLogo}
              alt="Birdeye Logo"
              className={styles.birdeyeLogo}
              width={40} // Increased size for better visibility
              height={40}
            />
          </Link>
        </li>
        <li className={styles.navitem}>
          <Link href="/free-alpha" passHref>
            <span className={`${styles.navlink} ${styles.link}`}>Free Alpha</span>
          </Link>
        </li>
        <li className={styles.navitem}>
          <Link href="https://refit-1.gitbook.io/refit-docs" passHref> {/* Added Documentation link */}
            <span className={`${styles.navlink} ${styles.link}`}>Documentation</span>
          </Link>
        </li>
      </ul>
      <div className={styles.rightSection}>
        <Link
          href="https://jup.ag/swap/SOL-ARMENI_5AJjM9VRFRDawVcCi7bsT56bMUij3iXcuovH7mxN1Spb"
          passHref
        >
          <button className={`${styles.btn} ${styles.buy_btn}`}>
            Buy $ARMENI
          </button>
        </Link>
        <WalletMultiButton className={`${styles.wallet_btn} ${styles.button}`} />
        <SuiWalletButton />
      </div>
    </nav>
  );
};

export default Navbar;

