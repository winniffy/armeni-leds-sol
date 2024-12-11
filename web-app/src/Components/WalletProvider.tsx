// WalletProvider.tsx

import React, { FC, ReactNode } from 'react';
import {
  WalletProvider as SolanaWalletProvider,
  ConnectionProvider as SolanaConnectionProvider,
} from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  WalletConnectWalletAdapter,
  UnsafeBurnerWalletAdapter, // Remove this in production if not needed
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider as SolanaWalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import { WalletKitProvider } from '@mysten/wallet-kit'; // Import WalletKitProvider for Sui

import { TipLinkWalletAdapter } from "@tiplink/wallet-adapter";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const TipLinkWalletAutoConnectV2 = dynamic(
  () =>
    import('@tiplink/wallet-adapter-react-ui').then(
      (mod) => mod.TipLinkWalletAutoConnectV2
    ),
  { ssr: false }
);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
  const { query, isReady } = useRouter();

  // Solana Network Setup
  const solanaNetwork = 'devnet'; // Change to 'mainnet-beta' for mainnet
  const solanaEndpoint = clusterApiUrl(solanaNetwork);

  // Solana Wallets
  const solanaWallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new WalletConnectWalletAdapter(),
    // You can remove UnsafeBurnerWalletAdapter in production
    new UnsafeBurnerWalletAdapter(), 
    new TipLinkWalletAdapter({
      title: "Your dApp Name",
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
      theme: "dark", // or "light" or "system"
    }),
  ];

  return (
    <SolanaConnectionProvider endpoint={solanaEndpoint}>
      <SolanaWalletProvider wallets={solanaWallets} autoConnect>
        {/* WalletKitProvider for Sui wallet integration */}
        <WalletKitProvider>
          <SolanaWalletModalProvider>
            <TipLinkWalletAutoConnectV2 isReady={isReady} query={query}>
              {children}
            </TipLinkWalletAutoConnectV2>
          </SolanaWalletModalProvider>
        </WalletKitProvider>
      </SolanaWalletProvider>
    </SolanaConnectionProvider>
  );
};






