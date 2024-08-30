import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '../Grid/Grid';
import Carousel from '../Carousel/Carousel';
import styles from './Section.module.css';

const Section = ({ title, endpoint }) => {
  const [albums, setAlbums] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    axios.get(endpoint)
      .then((response) => setAlbums(response.data))
      .catch(error => console.error('Error fetching albums:', error));
  }, [endpoint]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.title}>{title}</h3>
        <button onClick={toggleExpand} className={styles.showAllBtn}>
          {isExpanded ? 'Collapse' : 'Show All'}
        </button>
      </div>

      <div className={`${styles.albumContainer} ${isExpanded ? styles.expanded : ''}`}>
        {isExpanded ? (
          <Grid albums={albums} />
        ) : (
          <Carousel albums={albums} />
        )}
      </div>
    </div>
  );
};

export default Section;
