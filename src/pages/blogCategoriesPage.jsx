import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import useToken from '../hooks/useToken';

import {
  BlogBody,
  BlogCard,
  BlogCardFooter,
  BlogHeader,
  Blogs,
  Categories,
  RightSide,
} from '../styles/blogPageStyle';
import axiosAPI from '../utils/axiosAPI';
import formatCategories from '../utils/formatCategories';

const BlogCategories = () => {
  const { token, tokenLoaded } = useToken();
  const { categories } = useContext(BlogContext);

  const [blogs, setBlogs] = useState([]);
  const [blogsLoaded, setBlogsLoaded] = useState(false);

  const [filteredBlogsData, setFilteredBlogsData] = useState([]);
  // const [filteredBlogsDataLoaded, setFilterBlogDataLoaded] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const filteredBlogs = () => {
    const filterdArr = blogs.filter(
      (blog) => blog?.category?.data?.attributes?.slug === params.id
    );

    setFilteredBlogsData(filterdArr);
  };

  const getBlogsByCategories = async () => {
    try {
      const data = await axiosAPI({
        method: 'get',
        url: '/blogs?populate=category',
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      const formattedCategories = formatCategories(data.data);
      setBlogs(formattedCategories);
      setBlogsLoaded(true);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  useEffect(() => {
    if (tokenLoaded) {
      getBlogsByCategories();
      filteredBlogs();
    }

    // if (blogsLoaded) {
    //   filteredBlogs();
    // }
  }, [tokenLoaded, blogsLoaded, params.id]);

  return (
    <div style={{ marginTop: '70px', background: 'rgba(0, 0, 0, 0.1)' }}>
      <BlogHeader>
        <h1>Blog</h1>
        <p>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            home
          </span>{' '}
          | <span>{params.id}</span>
        </p>
      </BlogHeader>
      <BlogBody className="container">
        <Blogs>
          {filteredBlogsData.map((blog) => (
            <BlogCard key={blog.id}>
              <div>
                <img src="../images/blog/01.jpg" alt="" />
              </div>
              <div>
                <h3>
                  <Link to={`/blogDetails/${blog.id}`}>{blog.title}</Link>
                </h3>
                <p>{blog.description}</p>
              </div>
              <BlogCardFooter>
                <div>author</div>
                <div>
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit',
                  })}
                </div>
              </BlogCardFooter>
            </BlogCard>
          ))}
        </Blogs>
        <RightSide>
          <Categories>
            <h2>Categories</h2>
            <div
              style={{
                width: '70px',
                background: 'pink',
                height: '5px',
                marginBottom: '20px',
              }}
            ></div>
            <ul>
              <li>
                <Link to="/blog">All</Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/blog/${category.slug}`}>{category.title}</Link>
                </li>
              ))}
            </ul>
          </Categories>
        </RightSide>
      </BlogBody>
    </div>
  );
};

export default BlogCategories;
