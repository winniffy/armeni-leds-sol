import "./Footer.css";

const Footer = ({ logo }) => {
  return <Footer classname="footer">
<div className="fooer_top">
    <img src={logo} alt="armeni logo" />
    <ul className="footer_nav">
        <a href="">
        <li>Buy $Armeni</li>
        </a>
        <a href="">
        <li>View Chart</li>
        </a>
    </ul>
    <div className="footer_social">

    </div>

    <p className="footer_copyright">
        Copyright &copy; 2024 $Armeni - All rights reserved
    </p>
</div>
  </Footer>;
};

export default Footer;
