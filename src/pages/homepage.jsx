import React from 'react';
import ScrollTop from '../components/ScrollTop';
import About from '../sections/About';
import Blog from '../sections/Blog';
import Contact from '../sections/Contact';
import Experience from '../sections/Experience';
import Home from '../sections/Home';
import Portfolio from '../sections/Portfolio';
import Services from '../sections/Services';
import Skill from '../sections/Skill';
import Testimonial from '../sections/Testimonial';

const Homepage = () => {
  return (
    <>
      <Home />
      <About />
      <Skill />
      <Experience />
      <Services />
      <Portfolio />
      <Testimonial />
      <Blog />
      <Contact />
      <ScrollTop />
    </>
  );
};

export default Homepage;
