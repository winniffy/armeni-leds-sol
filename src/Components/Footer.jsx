import "./Footer.css";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";

const Footer = ({ logo }) => {
  return <Footer classname="footer">
<div className="fooer_top">
    <img src={logo} alt="armeni logo" />
    <ul className="footer_nav">
        <a href="https://jup.ag/swap/SOL-ARMENI_5AJjM9VRFRDawVcCi7bsT56bMUij3iXcuovH7mxN1Spb" target="_blank"
            rel="noopener noreferrer">
        <li>Buy $ARMENI</li>
        </a>
        <a href="https://birdeye.so/token/5AJjM9VRFRDawVcCi7bsT56bMUij3iXcuovH7mxN1Spb?chain=solana" target="_blank"
            rel="noopener noreferrer">
        <li>View Chart</li>
        </a>
    </ul>
    <div className="footer_social">
        <XIcon/>
        <TelegramIcon/>
    </div>

    <p className="footer_copyright">
        Copyright &copy; 2024 $Armeni - All rights reserved
    </p>
</div>
  </Footer>;
};

export default Footer;
