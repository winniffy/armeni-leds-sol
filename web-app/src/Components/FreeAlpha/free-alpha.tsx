import React, { useEffect, useRef, useState } from 'react';
import styles from './free-alpha.module.css';

// Type declarations
interface TwitterWidgets {
  load: (element?: HTMLElement | null) => void;
}

declare global {
  interface Window {
    twttr?: {
      widgets: TwitterWidgets;
    };
  }
}

const FreeAlpha: React.FC = () => {
  const tweetRef1 = useRef<HTMLDivElement>(null);
  const tweetRef2 = useRef<HTMLDivElement>(null);
  const [tweetLoaded1, setTweetLoaded1] = useState<boolean>(false);
  const [tweetLoaded2, setTweetLoaded2] = useState<boolean>(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);

    const loadTweets = () => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load(tweetRef1.current);
        window.twttr.widgets.load(tweetRef2.current);
      }
    };

    script.onload = loadTweets;

    // Check if the tweets have loaded after a delay
    const timer1 = setTimeout(() => {
      if (tweetRef1.current?.querySelector('iframe')) {
        setTweetLoaded1(true);
      }
    }, 3000);

    const timer2 = setTimeout(() => {
      if (tweetRef2.current?.querySelector('iframe')) {
        setTweetLoaded2(true);
      }
    }, 3000);

    return () => {
      document.body.removeChild(script);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className={`${styles.alphaContainer} container`}>
      <h1 className={styles.header}>Free Alpha</h1>

      {/* New Tweet at the top */}
      <div className={`${styles.newsItem} glowEffect`} ref={tweetRef1}>
        <h2 className={styles.header}>Key Tweet: Jamie Coutts' Market Analysis</h2>
        <blockquote className="twitter-tweet">
          <p lang="en" dir="ltr">
            <a href="https://twitter.com/hashtag/crypto?src=hash&amp;ref_src=twsrc%5Etfw">
              #crypto
            </a>{' '}
            has taken a pounding over the past six months as the @bitformance Top 200 equal weight index chart below shows.
            <br />
            <br />
            -55% pullbacks in line with the previous 2 cycles. The market also rallied hard 6 months prior (+241%).
            <br />
            <br />
            For traders, the price will need to break out of…{' '}
            <a href="https://t.co/7ZG9tASgB6">pic.twitter.com/7ZG9tASgB6</a>
          </p>
          &mdash; Jamie Coutts CMT (@Jamie1Coutts){' '}
          <a href="https://twitter.com/Jamie1Coutts/status/1836192082127655274?ref_src=twsrc%5Etfw">
            September 17, 2024
          </a>
        </blockquote>
        {!tweetLoaded1 && (
          <p className={styles.tweetFallback}>
            Tweet not loading?{' '}
            <a
              href="https://twitter.com/Jamie1Coutts/status/1836192082127655274"
              target="_blank"
              rel="noopener noreferrer"
            >
              View it on Twitter
            </a>
            <br />
            <span className={styles.imageNote}>(This tweet includes an image)</span>
          </p>
        )}
        <div className={styles.summary}>
          The crypto market has experienced a significant decline over the past six months, dropping 55%, which aligns
          with previous market cycles. Before this downturn, the market had rallied by 241%. Indicators like the
          Altseason Index suggest altcoins are temporarily outperforming Bitcoin, but without Bitcoin surpassing its
          all-time high, this trend might be short-lived. Only 11% of crypto assets are currently above their 200-day
          moving average; a figure above 45% is needed to confirm a bullish market trend. The Advance/Decline Index is
          showing signs of a potential market reversal. Historically, when this index aligns with price increases,
          altcoins have experienced significant rallies.
        </div>
      </div>

      {/* New Video Section */}
      <div className={`${styles.newsItem} glowEffect`}>
        <h2 className={styles.header}>Bitcoin Cycle: Exposing My YouTube Analytics</h2>
        <iframe
          className={styles.videoFrame}
          width="560"
          height="315"
          src="https://www.youtube.com/embed/-46y2adFaXQ"
          title="Bitcoin Cycle: Exposing My YouTube Analytics"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className={styles.summary}>
        In "Bitcoin Cycle: Exposing My YouTube Analytics," the creator reveals fascinating insights into the relationship between his channel's performance and Bitcoin market cycles. He observes that view counts tend to surge during bull markets and peak near cycle highs, while waning during bear or sideways markets. Drawing from examples in 2018, 2019, and 2021, he speculates that new all-time highs in views might coincide with fresh Bitcoin price records. The video also touches on the channel's unexpected growth from its humble beginnings as a hobby project for crypto-curious bodybuilders. Intriguingly, an unusual spike in views during a significant price drop in August 2022 suggests the current cycle may not have concluded. The creator shares his analysis of Bitcoin's price movements using a specific moving average indicator, offering cautious optimism about near-term prospects. This engaging blend of personal channel analytics and cryptocurrency market insights provides viewers with a unique perspective on content creation in the volatile world of Bitcoin.
        </div>
      </div>

      {/* Existing Video Section */}
      <div className={`${styles.newsItem} glowEffect`}>
        <h2 className={styles.header}>
          The Big 3 Weekly Price Analysis: Bitcoin, Ethereum & Solana
        </h2>
        <iframe
          className={styles.videoFrame}
          width="560"
          height="315"
          src="https://www.youtube.com/embed/nUIyn267B0I"
          title="The Big 3 Weekly Price Analysis: Bitcoin, Ethereum & Solana"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className={styles.summary}>
          The video analyzes potential price movements for Bitcoin, Ethereum, and Solana. Technical indicators suggest
          possible price increases for Solana and Ethereum, with Solana showing hidden bullish divergence if it closes
          above $139 weekly, and Ethereum potentially rallying if it closes above $2,020 on its 5-day chart. Bitcoin
          remains in a tight range around $2,700, with its future direction uncertain. The speaker emphasizes that
          Bitcoin needs to close above $64,000 for a bullish trend to emerge.
        </div>
      </div>

      {/* Existing Tweet */}
      <div className={`${styles.newsItem} glowEffect`} ref={tweetRef2}>
        <h2 className={styles.header}>Key Tweet: MacroCRG's Market Analysis</h2>
        <blockquote className="twitter-tweet">
          <p lang="en" dir="ltr">
            Top of 12H support held + bulls have (so far) reclaimed monthly open + 4H200EMA
            <br />
            <br />
            Burgers, you got 1 job today: grab ur balls tight and maintain this pump{' '}
            <a href="https://t.co/GOy8atblBj">https://t.co/GOy8atblBj</a>{' '}
            <a href="https://t.co/TiI9GrIlkS">pic.twitter.com/TiI9GrIlkS</a>
          </p>
          &mdash; CRG (@MacroCRG){' '}
          <a href="https://twitter.com/MacroCRG/status/1836005046430974020?ref_src=twsrc%5Etfw">
            September 17, 2024
          </a>
        </blockquote>
        {!tweetLoaded2 && (
          <p className={styles.tweetFallback}>
            Tweet not loading?{' '}
            <a
              href="https://twitter.com/MacroCRG/status/1836005046430974020"
              target="_blank"
              rel="noopener noreferrer"
            >
              View it on Twitter
            </a>
            <br />
            <span className={styles.imageNote}>(This tweet includes an image)</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default FreeAlpha;


