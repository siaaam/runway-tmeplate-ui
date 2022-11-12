import { isDragActive } from 'framer-motion';
import React, { useState } from 'react';
import { lists } from '../staticData/Lists';
// import { setActiveLink } from 'react-scroll/modules/mixins/scroller';

const Portfolio = () => {
  const [items, setItem] = useState(lists);

  const filterItem = (catItem) => {
    // console.log(e);
    // setActive(true);
    const filteredItem = lists.filter((item) => item.category === catItem);
    setItem(filteredItem);
  };

  return (
    <section
      name="portfolio"
      id="portfolio"
      className="py_80 bg_secondery full_row"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
              <h2 className="title text-uppercase">
                <span className="line_double mx-auto color_default">
                  portfolio
                </span>
                Recent Projects
              </h2>
              <span className="sub_title">
                Interdum a etiam sagittis vehicula porta. Massa felis eros quam
                blandit nulla dolor habitant. Ullamcorper quis ornare et proin
                pellentesque.
              </span>
            </div>
          </div>
          {/* filter */}
          <div className="col-md-12 col-lg-12">
            <div className="my_portfolio" id="tab-panel">
              <div className="row">
                <div className="col-md-12">
                  <div className="filters mb_30 w-100 text-center">
                    <ul className="filter-tabs mx-auto d-inline-block">
                      <li
                        className=" filter"
                        data-role="button"
                        data-filter="all"
                        onClick={() => setItem(lists)}
                      >
                        All
                      </li>
                      <li
                        data-role="button"
                        data-filter=".design"
                        onClick={() => filterItem('design')}
                      >
                        Web Design
                      </li>
                      <li
                        className="filter"
                        data-role="button"
                        data-filter=".wordpress"
                        onClick={() => filterItem('wordpress')}
                      >
                        Wordpress
                      </li>
                      <li
                        className="filter"
                        data-role="button"
                        data-filter=".development"
                        onClick={() => filterItem('development')}
                      >
                        Web Development
                      </li>
                      <li
                        className="filter"
                        data-role="button"
                        data-filter=".branding"
                        onClick={() => filterItem('branding')}
                      >
                        Branding
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="filter-list">
                <div className="portfolio-items">
                  <div className="row">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="column  mb_30 col-md-4 col-lg-4"
                      >
                        <div className="default-portfolio-item">
                          <a href={item.img} data-fancybox="gallery">
                            <img src={item.img} alt="image" />
                            <div className="overlay-box">
                              <span>
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </span>
                              <div className="tag">
                                <ul>
                                  <li>{item.category}</li>
                                </ul>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}

                    {/* <div className="column  graphic branding mb_30 col-md-4 col-lg-4">
                      <div className="default-portfolio-item">
                        <a
                          href="images/portfolio/02.jpg"
                          data-fancybox="gallery"
                        >
                          <img src="images/portfolio/02.jpg" alt="image" />
                          <div className="overlay-box">
                            <span>
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            </span>
                            <div className="tag">
                              <ul>
                                <li>Branding,</li>
                                <li>Wordpress</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="column  design wordpress development mb_30 col-md-4 col-lg-4">
                      <div className="default-portfolio-item">
                        <a
                          href="images/portfolio/03.jpg"
                          data-fancybox="gallery"
                        >
                          <img src="images/portfolio/03.jpg" alt="image" />
                          <div className="overlay-box">
                            <span>
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            </span>
                            <div className="tag">
                              <ul>
                                <li>Web Design,</li>
                                <li>Web Development</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="column  graphic wordpress branding mb_30 col-md-4 col-lg-4">
                      <div className="default-portfolio-item">
                        <a
                          href="images/portfolio/04.jpg"
                          data-fancybox="gallery"
                        >
                          <img src="images/portfolio/04.jpg" alt="image" />
                          <div className="overlay-box">
                            <span>
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            </span>
                            <div className="tag">
                              <ul>
                                <li>Branding,</li>
                                <li>wordpress</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="column graphic design branding mb_30 col-md-4 col-lg-4">
                      <div className="default-portfolio-item">
                        <a
                          href="images/portfolio/05.jpg"
                          data-fancybox="gallery"
                        >
                          <img src="images/portfolio/05.jpg" alt="image" />
                          <div className="overlay-box">
                            <span>
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            </span>
                            <div className="tag">
                              <ul>
                                <li>Web Design,</li>
                                <li>wordpress</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="column  development wordpress design mb_30 col-md-4 col-lg-4">
                      <div className="default-portfolio-item">
                        <a
                          href="images/portfolio/06.jpg"
                          data-fancybox="gallery"
                        >
                          <img src="images/portfolio/06.jpg" alt="image" />
                          <div className="overlay-box">
                            <span>
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            </span>
                            <div className="tag">
                              <ul>
                                <li>Web Design,</li>
                                <li>Web Development</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
