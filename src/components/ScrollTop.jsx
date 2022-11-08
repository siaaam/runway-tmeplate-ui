import React from 'react';
import { animateScroll as scroll } from 'react-scroll';

const ScrollTop = () => {
  return (
    <img
      className="scrollTopIcon hidden"
      src="images/scrolltop.png"
      alt=""
      onClick={() => scroll.scrollToTop()}
    />
  );
};

export default ScrollTop;
