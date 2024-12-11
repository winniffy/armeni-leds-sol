import React from 'react';
import styles from "./Footer.module.css";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";

interface FooterProps {
  logo: string;
}

const Footer: React.FC<FooterProps> = ({ logo }) => {
  return React.createElement(
    'footer',
    { className: styles.footer },
    React.createElement(
      'div',
      { className: styles.footer_top },
      React.createElement('img', { src: logo, alt: "armeni logo", className: styles.footer_logo }),
      React.createElement(
        'ul',
        { className: styles.footer_nav },
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            {
              href: "https://jup.ag/swap/SOL-ARMENI_5AJjM9VRFRDawVcCi7bsT56bMUij3iXcuovH7mxN1Spb",
              target: "_blank",
              rel: "noopener noreferrer",
              className: styles.footer_nav_item
            },
            "Buy $ARMENI"
          )
        ),
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            {
              href: "https://birdeye.so/token/5AJjM9VRFRDawVcCi7bsT56bMUij3iXcuovH7mxN1Spb?chain=solana",
              target: "_blank",
              rel: "noopener noreferrer",
              className: styles.footer_nav_item
            },
            "View Chart"
          )
        ),
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            {
              href: "/Support",
              className: styles.footer_nav_item
            },
            "Support"
          )
        )
      ),
      React.createElement(
        'div',
        { className: styles.footer_social },
        React.createElement(
          'a',
          {
            href: "https://x.com/ArmeniLeds_SOL",
            target: "_blank",
            rel: "noopener noreferrer",
            'aria-label': "Twitter"
          },
          React.createElement(XIcon)
        ),
        React.createElement(
          'a',
          {
            href: "https://t.me/armenileds",
            target: "_blank",
            rel: "noopener noreferrer",
            'aria-label': "Telegram"
          },
          React.createElement(TelegramIcon)
        )
      )
    ),
    React.createElement(
      'p',
      { className: styles.footer_copyright },
      `© ${new Date().getFullYear()} $ARMENI - All rights reserved`
    )
  );
};

export default Footer;
