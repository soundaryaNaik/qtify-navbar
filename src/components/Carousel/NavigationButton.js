import React, { forwardRef } from 'react';
import styles from './NavigationButton.module.css';

const NavigationButton = forwardRef(({ direction }, ref) => {
  return (
    <div ref={ref} className={`${styles.navBtn} ${direction === 'left' ? styles.left : styles.right}`}>
      <i className={`fas fa-chevron-${direction}`}></i>
    </div>
  );
});

export default NavigationButton;
