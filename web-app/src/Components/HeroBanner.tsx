import React from 'react';
import styles from './HeroBanner.module.css';
import Image from 'next/image';

const HeroBanner: React.FC = () => {
  return (
    <div className={styles.hero_banner_container}>
      <div className={styles.hero_image_container}>
        <Image
          src="/Assets/heroImage.png"
          alt="Trade in Electronics"
          layout="responsive"
          width={1600}   // Updated width for elongated appearance
          height={400}   // Reduced height to make it smaller
          objectFit="cover"
          className={styles.hero_image}
        />
      </div>
    </div>
  );
};

export default HeroBanner;


