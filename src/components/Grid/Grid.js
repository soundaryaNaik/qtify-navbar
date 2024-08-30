import React from 'react';
import Card from '../Card/Card';
import styles from './Grid.module.css';

const Grid = ({ albums }) => {
  return (
    <div className={styles.gridLayout}>
      {albums.map(album => (
        <Card
          key={album.id}
          imageUrl={album.image}
          follows={album.follows}
          albumName={album.title}
        />
      ))}
    </div>
  );
};

export default Grid;
