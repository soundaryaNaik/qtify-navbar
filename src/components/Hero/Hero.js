import React from 'react';
import styles from './Hero.module.css';
import headphonesImage from '../../assets/vibrating-headphone 1-1.png'; // Correct path to your image

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>100 Thousand Songs, ad-free</h1>
        <p>Over thousands podcast episodes</p>
      </div>
      <div className={styles.heroImage}>
        <img src={headphonesImage} alt="Headphones" />
      </div>
    </section>
  );
};

export default Hero;
