// src/components/Section/SongsSection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Carousel from '../Carousel/Carousel';
import styles from './Section.module.css';

const SongsSection = () => {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState(['All']);
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    axios.get('https://qtify-backend-labs.crio.do/songs')
      .then(response => setSongs(response.data))
      .catch(error => console.error('Error fetching songs:', error));

    axios.get('https://qtify-backend-labs.crio.do/genres')
      .then(response => setGenres(['All', ...response.data.map(genre => genre.name)]))
      .catch(error => console.error('Error fetching genres:', error));
  }, []);

  const handleGenreChange = (event, newGenre) => {
    setSelectedGenre(newGenre);
  };

  const filteredSongs = selectedGenre === 'All'
    ? songs
    : songs.filter(song => song.genre === selectedGenre);

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.title}>Songs</h3>
      </div>

      <Tabs
        value={selectedGenre}
        onChange={handleGenreChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        className={styles.tabs}
      >
        {genres.map(genre => (
          <Tab key={genre} label={genre} value={genre} />
        ))}
      </Tabs>

      <div className={styles.albumContainer}>
        <Carousel albums={filteredSongs} isSongSection={true} />
      </div>
    </div>
  );
};

export default SongsSection;
