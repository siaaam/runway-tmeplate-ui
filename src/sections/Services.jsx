import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const Services = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const parentVariants = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
        duration: 1,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <section id="services" name="services" className="py_80 full_row bg_white">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
              <h2 className="title text-uppercase">
                <span className="line_double mx-auto color_default">
                  services
                </span>
                What i do
              </h2>
              <span className="sub_title">
                Interdum a etiam sagittis vehicula porta. Massa felis eros quam
                blandit nulla dolor habitant. Ullamcorper quis ornare et proin
                pellentesque.
              </span>
            </div>
          </div>
          <div className="services_item1">
            <div className="col-md-12 col-lg-12">
              <motion.div
                ref={ref}
                variants={parentVariants}
                initial="hidden"
                animate={controls}
                className="row"
              >
                <motion.div
                  variants={childVariants}
                  className="col-md-6 col-lg-4"
                >
                  <div className="service_two text-center pt_15 mb_30 wow animated slideInUp">
                    <div className="srv_item_number color_lightgray">
                      <strong>01.</strong>
                    </div>
                    <h3 className="p_20 text-uppercase color_primary">
                      Web Design
                    </h3>
                    <div className="srv_icon color_white">
                      <span className="flaticon-website-design-symbol"></span>
                    </div>
                    <p>
                      Proin a ullamcorper et primis lobortis laoreet senectus.
                      Vitae dignissim sollicitudin eleifend cursus tempus
                      curabitur posuere nam arcu platea sodales.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  variants={childVariants}
                  className="col-md-6 col-lg-4"
                >
                  <div className="service_two text-center pt_15 mb_30 wow animated slideInUp">
                    <div className="srv_item_number color_lightgray">
                      <strong>02.</strong>
                    </div>
                    <h3 className="p_20 text-uppercase color_primary">
                      Web Development
                    </h3>
                    <div className="srv_icon color_white">
                      <span className="flaticon-programming"></span>
                    </div>
                    <p>
                      Proin a ullamcorper et primis lobortis laoreet senectus.
                      Vitae dignissim sollicitudin eleifend cursus tempus
                      curabitur posuere nam arcu platea sodales.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  variants={childVariants}
                  className="col-md-6 col-lg-4"
                >
                  <div className="service_two text-center pt_15 mb_30 wow animated slideInUp">
                    <div className="srv_item_number color_lightgray">
                      <strong>03.</strong>
                    </div>
                    <h3 className="p_20 text-uppercase color_primary">
                      Wordpress
                    </h3>
                    <div className="srv_icon color_white">
                      <span className="flaticon-wordpress-logo"></span>
                    </div>
                    <p>
                      Proin a ullamcorper et primis lobortis laoreet senectus.
                      Vitae dignissim sollicitudin eleifend cursus tempus
                      curabitur posuere nam arcu platea sodales.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  variants={childVariants}
                  className="col-md-6 col-lg-4"
                >
                  <div className="service_two text-center pt_15 mb_30 wow animated slideInUp">
                    <div className="srv_item_number color_lightgray">
                      <strong>04.</strong>
                    </div>
                    <h3 className="p_20 text-uppercase color_primary">
                      Graghic Design
                    </h3>
                    <div className="srv_icon color_white">
                      <span className="flaticon-editor"></span>
                    </div>
                    <p>
                      Proin a ullamcorper et primis lobortis laoreet senectus.
                      Vitae dignissim sollicitudin eleifend cursus tempus
                      curabitur posuere nam arcu platea sodales.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  variants={childVariants}
                  className="col-md-6 col-lg-4"
                >
                  <div className="service_two text-center pt_15 mb_30 wow animated slideInUp">
                    <div className="srv_item_number color_lightgray">
                      <strong>05.</strong>
                    </div>
                    <h3 className="p_20 text-uppercase color_primary">
                      Branding
                    </h3>
                    <div className="srv_icon color_white">
                      <span className="flaticon-internet"></span>
                    </div>
                    <p>
                      Proin a ullamcorper et primis lobortis laoreet senectus.
                      Vitae dignissim sollicitudin eleifend cursus tempus
                      curabitur posuere nam arcu platea sodales.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  variants={childVariants}
                  className="col-md-6 col-lg-4"
                >
                  <div className="service_two text-center pt_15 mb_30 wow animated slideInUp">
                    <div className="srv_item_number color_lightgray">
                      <strong>06.</strong>
                    </div>
                    <h3 className="p_20 text-uppercase color_primary">
                      Opencart
                    </h3>
                    <div className="srv_icon color_white">
                      <span className="flaticon-shopping-cart"></span>
                    </div>
                    <p>
                      Proin a ullamcorper et primis lobortis laoreet senectus.
                      Vitae dignissim sollicitudin eleifend cursus tempus
                      curabitur posuere nam arcu platea sodales.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
