import React, { useEffect, useState } from 'react';
import Section from './Section';

const NewAlbumsSection = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch('https://qtify-backend-labs.crio.do/albums/new')
      .then((response) => response.json())
      .then((data) => setAlbums(data));
  }, []);

  return <Section cards={albums} />;
};

export default NewAlbumsSection;
