import React from 'react';

const LeftButton = () => {
  return (
    <button className="swiper-button-prev">
      {/* SVG for Left Button */}
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
      </svg>
    </button>
  );
};

export default LeftButton;
