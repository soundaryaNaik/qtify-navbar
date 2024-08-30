import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Card from '../Card/Card';
import styles from './Section.module.css';

SwiperCore.use([Navigation]);

const Section = ({ title, endpoint }) => {
  const [albums, setAlbums] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
        ) : (
          <Swiper
            spaceBetween={20}
            slidesPerView={7}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            onSlideChange={(swiper) => {
              prevRef.current.style.display = swiper.isBeginning ? 'none' : 'flex';
              nextRef.current.style.display = swiper.isEnd ? 'none' : 'flex';
            }}
            className={styles.albumSwiper}
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
              1200: { slidesPerView: 7 },
            }}
          >
            {albums.map(album => (
              <SwiperSlide key={album.id}>
                <Card
                  imageUrl={album.image}
                  follows={album.follows}
                  albumName={album.title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {!isExpanded && (
        <>
          <div ref={prevRef} className={`${styles.prevBtn}`}>
            <i className="fas fa-chevron-left"></i>
          </div>
          <div ref={nextRef} className={`${styles.nextBtn}`}>
            <i className="fas fa-chevron-right"></i>
          </div>
        </>
      )}
    </div>
  );
};

export default Section;
