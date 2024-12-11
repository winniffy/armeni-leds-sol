import React from 'react';
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Image from 'next/image';

const slideImages = [
  "/Assets/meme1.png",
  "/Assets/meme2.png",
  "/Assets/meme3.png",
  "/Assets/meme4.png",
  "/Assets/meme5.png",
  "/Assets/meme6.png",
];

const Carousel: React.FC = () => {
  return (
    <div className="carousel-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Slide
        duration={3000}
        transitionDuration={500}
        infinite={true}
        indicators={true}
        arrows={true}
      >
        {slideImages.map((image, index) => (
          <div key={index} className="each-slide-effect">
            <div className="image-container" style={{ position: 'relative', width: '100%', height: '400px' }}>
              <Image
                src={image}
                alt={`Meme ${index + 1}`}
                layout="fill"  // Fill the container completely
                objectFit="contain"  // Preserve aspect ratio, fitting inside the container
                style={{ borderRadius: '20px' }}
                priority={index < 2}
              />
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Carousel;





