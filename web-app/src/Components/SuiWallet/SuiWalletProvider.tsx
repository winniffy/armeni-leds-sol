// src/Components/SuiWallet/SuiWalletProvider.tsx

import React, { FC, ReactNode } from 'react';
import { WalletKitProvider } from '@mysten/wallet-kit';

interface SuiWalletProviderProps {
  children: ReactNode;
}

const SuiWalletProvider: FC<SuiWalletProviderProps> = ({ children }) => {
  return (
    <WalletKitProvider
      enableUnsafeBurner={false} // Disable burner wallets in production
    >
      {children}
    </WalletKitProvider>
  );
};

export default SuiWalletProvider;
