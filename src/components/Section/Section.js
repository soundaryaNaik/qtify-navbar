import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Grid from '../Grid/Grid';
import Carousel from '../Carousel/Carousel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from './Section.module.css';

const Section = ({ title, endpoint, isSongSection = false }) => {
  const [items, setItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('all');

  // Use useMemo to ensure defaultGenres is only created once
  const defaultGenres = useMemo(() => [
    { key: 'all', label: 'All' },
    { key: 'rock', label: 'Rock' },
    { key: 'pop', label: 'Pop' },
    { key: 'jazz', label: 'Jazz' },
    { key: 'blues', label: 'Blues' },
  ], []);

  const [genres, setGenres] = useState(defaultGenres);

  useEffect(() => {
    axios.get(endpoint)
      .then((response) => {
        console.log('Items Response:', response.data); // Log the items response
        setItems(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));

    if (isSongSection) {
      axios.get('https://qtify-backend-labs.crio.do/genres')
        .then(response => {
          console.log('Genres Response:', response.data); // Log the genres response
          
          // Adjust according to actual structure of API response
          const fetchedGenres = Array.isArray(response.data) 
            ? response.data.map(genre => ({
                key: genre.key.toLowerCase(),
                label: genre.label
              }))
            : [];

          // Combine default genres with fetched genres, avoiding duplicates
          const mergedGenres = [...defaultGenres, ...fetchedGenres].filter(
            (genre, index, self) =>
              index === self.findIndex((g) => g.key === genre.key)
          );

          setGenres(mergedGenres);
        })
        .catch(error => {
          console.error('Error fetching genres:', error);
        });
    }
  }, [endpoint, isSongSection, defaultGenres]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleGenreChange = (event, newGenre) => {
    setSelectedGenre(newGenre);
  };

  const filteredItems = selectedGenre === 'all'
    ? items
    : items.filter(item =>
        item.genre && typeof item.genre === 'string'
          ? item.genre.toLowerCase() === selectedGenre
          : false
      );

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.title}>{title}</h3>
        {!isSongSection && (
          <button onClick={toggleExpand} className={styles.showAllBtn}>
            {isExpanded ? 'Collapse' : 'Show All'}
          </button>
        )}
      </div>

      {isSongSection && (
        <Tabs
          value={selectedGenre}
          onChange={handleGenreChange}
          indicatorColor="primary"
          textColor="inherit"
          centered
          className={styles.tabs}
          TabIndicatorProps={{
            style: {
              backgroundColor: '#00FF00', // Green underline
            },
          }}
        >
          {genres.map(genre => (
            <Tab key={genre.key} label={genre.label} value={genre.key} className={styles.tab} />
          ))}
        </Tabs>
      )}

      <div className={`${styles.albumContainer} ${isExpanded && !isSongSection ? styles.expanded : ''}`}>
        {isExpanded && !isSongSection ? (
          <Grid albums={filteredItems} />
        ) : (
          <Carousel albums={filteredItems} isSongSection={isSongSection} />
        )}
      </div>
    </div>
  );
};

export default Section;
