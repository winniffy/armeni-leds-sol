// SuiWalletButton.tsx

import React, { useEffect } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
import styles from './SuiWalletButton.module.css';

const SuiWalletButton: React.FC = () => {
  const { currentAccount, isConnected, connect, disconnect } = useWalletKit();

  // Use useEffect to log changes to isConnected and currentAccount
  useEffect(() => {
    console.log('isConnected:', isConnected);
    console.log('currentAccount:', currentAccount);
  }, [isConnected, currentAccount]);

  const handleConnect = async () => {
    if (!isConnected) {
      try {
        console.log('Attempting to connect to wallet...');
        await connect();
        console.log('Connected to wallet:', currentAccount);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      console.log('Already connected');
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      console.log('Disconnected from wallet');
    } catch (error) {
      console.error('Error disconnecting from wallet:', error);
    }
  };

  const handleCopyAddress = () => {
    if (currentAccount?.address) {
      navigator.clipboard.writeText(currentAccount.address);
      alert('Address copied to clipboard');
    }
  };

  return (
    <div className={styles.suiWalletContainer}>
      <button
        onClick={handleConnect}
        className={`${styles.btn} ${styles.sui_btn}`}
      >
        {isConnected && currentAccount?.address
          ? `Sui: ${currentAccount.address.slice(0, 4)}...${currentAccount.address.slice(-4)}`
          : 'Connect Sui Wallet'}
      </button>
      {isConnected && (
        <div className={styles.suiMenu}>
          <p>Address: {currentAccount?.address}</p>
          <button onClick={handleCopyAddress}>Copy Address</button>
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      )}
    </div>
  );
};

export default SuiWalletButton;






