// _app.tsx

import '../styles/globals.css';
import '@solana/wallet-adapter-react-ui/styles.css'; // Solana wallet styles
// Removed the incorrect import for Sui wallet styles
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

// Dynamically load the WalletProvider to avoid SSR issues
const WalletProvider = dynamic(
  () =>
    import('../src/Components/WalletProvider').then((mod) => mod.WalletProvider),
  { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
}

export default MyApp;










