import React from 'react';
import styles from './Card.module.css';

const Card = ({ imageUrl, follows, albumName }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={albumName} className={styles.mainImage} />
        <div className={styles.followInfo}>
          <span className={styles.followers}>{follows} Follows</span>
        </div>
      </div>
      <div className={styles.title}>
        <p>{albumName}</p>
      </div>
    </div>
  );
};

export default Card;
