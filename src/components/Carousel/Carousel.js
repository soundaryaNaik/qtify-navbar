// src/components/Carousel/Carousel.js
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import Card from '../Card/Card';
import NavigationButton from './NavigationButton';
import styles from './Carousel.module.css';

SwiperCore.use([Navigation]);

const Carousel = ({ albums, isSongSection = false }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className={styles.carouselContainer}>
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
              follows={album.likes || album.follows}
              albumName={album.title}
              isSong={isSongSection}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <NavigationButton ref={prevRef} direction="left" />
      <NavigationButton ref={nextRef} direction="right" />
    </div>
  );
};

export default Carousel;
