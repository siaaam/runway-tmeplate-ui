import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosAPI, { axiosInstance } from '../utils/axiosAPI';
import formatCategories from '../utils/formatCategories';

const Blog = () => {
  const [homeBlogs, setHomeBlogs] = useState([]);
  const loadBlogs = async () => {
    try {
      const res = await axiosInstance.get('blogs?populate=*');
      setHomeBlogs(formatCategories(res.data.data.reverse().slice(0, 3)));
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const navigate = useNavigate();
  return (
    <section id="blog" name="blog" className="py_80 bg_secondery full_row">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
              <h2 className="title text-uppercase">
                <span className="line_double mx-auto color_default">blog</span>
                What’s News
              </h2>
              <span className="sub_title">
                Interdum a etiam sagittis vehicula porta. Massa felis eros quam
                blandit nulla dolor habitant. Ullamcorper quis ornare et proin
                pellentesque.
              </span>
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div className="blog_grid_1 wow animated slideInUp">
              <div className="row">
                {homeBlogs.map((blog) => (
                  <div key={blog.id} className="col-md-12 col-lg-4">
                    <div className="blog_item">
                      <div className="comments">
                        <i className="fa fa-comment" aria-hidden="true"></i>
                        <span className="color_white">12</span>
                      </div>
                      <div className="blog_img overlay_one">
                        <img
                          src={
                            blog?.image?.data?.attributes?.formats?.small?.url
                          }
                          alt="image"
                        />
                      </div>
                      <div className="blog_content bg_white color_secondery">
                        <div className="blog_title">
                          <Link
                            to={`/blogDetails/${blog.id}`}
                            className="color_primary"
                            href="blog-details.html"
                          >
                            <h5>{blog.title}</h5>
                          </Link>
                        </div>
                        <p className="mt_15 mb_30">{blog.description}</p>

                        <div className="admin">
                          {/* <img src="images/about/02.jpg" alt="image" /> */}
                          <span className="color_white px-4">
                            {blog.author?.data?.attributes?.username}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mx-auto text-center mt_60">
                <Link className="btn btn-default" to="/blog">
                  View Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
