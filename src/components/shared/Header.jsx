import React, { useContext, useEffect } from 'react';
import { useRef } from 'react';
import { Link } from 'react-scroll';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { user, removeToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const elm = useRef();

  const handleScroll = (evt) => {
    const scrolledValue = window.scrollY;
    if (scrolledValue >= 400) {
      elm.current.classList.add('bg-green');
      // document.querySelector('.scrollTopIcon').classList.add('visible');
    } else {
      elm.current.classList.remove('bg-green');
      // document.querySelector('.scrollTopIcon').classList.remove('visible');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className="main_nav"
      style={{ position: 'fixed', background: '#ddd' }}
      ref={elm}
    >
      <div className="container">
        <nav
          id="navbar-example2"
          className="navbar navbar-expand-lg navbar-light w-100 "
        >
          <a className="navbar-brand" href="#top">
            <img className="nav-logo" src="images/logo/1.png" alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="home"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                      onClick={() => navigate('/')}
                    >
                      Home
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="about"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                    >
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="skill"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                    >
                      Skill
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="services"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                    >
                      Services
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="portfolio"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                    >
                      Portfolio
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="testimonial"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                    >
                      Testimonial
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="blog"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                      onClick={() => navigate('/blog')}
                    >
                      Blog
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="contact"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                    >
                      Contact
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      // activeClass="active"
                      to=""
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                      onClick={() => navigate('/dashboard')}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      // activeClass="active"
                      to=""
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                      onClick={() => removeToken()}
                    >
                      Log Out
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="home"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                      onClick={() => navigate('/')}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="about"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                    >
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="skill"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                    >
                      Skill
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="services"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                    >
                      Services
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="portfolio"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                    >
                      Portfolio
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="testimonial"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                    >
                      Testimonial
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="blog"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                      // onClick={() => navigate('/blogs')}
                    >
                      Blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="contact"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="signin"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                      onClick={() => navigate('/login')}
                    >
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to=""
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                      onClick={() => navigate('/registration')}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
