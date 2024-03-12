import "./Carousel.css";
import { motion } from "framer-motion";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import meme1 from "../Assets/meme1.png";
import meme2 from "../Assets/meme2.png";
import meme3 from "../Assets/meme3.png";
import meme4 from "../Assets/meme4.png";
import meme5 from "../Assets/meme5.png";
import meme6 from "../Assets/meme6.png";

const Carousel = () => {
  // slide images array
  const slideImages = [
    `${meme1}`,
    `${meme2}`,
    `${meme3}`,
    `${meme4}`,
    `${meme5}`,
    `${meme6}`,
  ];

  return (
    <motion.div>
      {/* images slider */}
      <motion.div
      // initial={{ opacity: 0, scale: 0.5 }}
      // whileInView={{ opacity: 1, scale: 1 }}
      // transition={{ duration: 0.5 }}
      // viewport={{ once: true }}
      >
        <Slide duration={3000}>
          <div className="each-slide-effect">
            <div style={{ backgroundImage: `url(${slideImages[0]})` }}></div>
          </div>
          <div className="each-slide-effect">
            <div style={{ backgroundImage: `url(${slideImages[1]})` }}></div>
          </div>
          <div className="each-slide-effect">
            <div style={{ backgroundImage: `url(${slideImages[2]})` }}></div>
          </div>
          <div className="each-slide-effect">
            <div style={{ backgroundImage: `url(${slideImages[3]})` }}></div>
          </div>
          <div className="each-slide-effect">
            <div style={{ backgroundImage: `url(${slideImages[4]})` }}></div>
          </div>
          <div className="each-slide-effect">
            <div style={{ backgroundImage: `url(${slideImages[5]})` }}></div>
          </div>
        </Slide>
      </motion.div>
    </motion.div>
  );
};

export default Carousel;
