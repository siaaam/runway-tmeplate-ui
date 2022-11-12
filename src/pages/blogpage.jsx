import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import useToken from '../hooks/useToken';
import {
  BlogBody,
  BlogCard,
  BlogCardFooter,
  BlogHeader,
  Blogs,
  Categories,
  Recent,
  RightSide,
} from '../styles/blogPageStyle';
import axiosAPI from '../utils/axiosAPI';
import formatCategories from '../utils/formatCategories';

const BlogPage = () => {
  const { categories } = useContext(BlogContext);
  // const recentBlogs = blogs.reverse().slice(0, 3);

  const [allBlogs, setAllBlogs] = useState([]);
  const [allBlogsLoaded, setAllBlogsLoaded] = useState(false);
  const { token, tokenLoaded } = useToken();
  const [recentBlogs, setRecentBlogs] = useState([]);

  const loadAllBlogs = async () => {
    try {
      const res = await axiosAPI({
        method: 'get',
        url: '/blogs?populate=*',
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      setAllBlogs(formatCategories(res.data).reverse());
      setAllBlogsLoaded(true);
      setRecentBlogs(formatCategories(res.data).reverse().slice(0, 3));
      console.log(allBlogs);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  useEffect(() => {
    if (token) {
      loadAllBlogs();
    }
  }, [token, tokenLoaded]);

  const navigate = useNavigate();
  return (
    <div style={{ marginTop: '70px', background: 'rgba(0, 0, 0, 0.1)' }}>
      <BlogHeader>
        <h1>Blog</h1>
        <p>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            home
          </span>
          | <span>Blog</span>
        </p>
      </BlogHeader>
      <BlogBody className="container">
        <Blogs>
          {allBlogs.length <= 0 ? (
            <h2 style={{ color: 'red' }}>No blogs to show!</h2>
          ) : (
            allBlogs.map((blog) => (
              <BlogCard key={blog.id}>
                <div>
                  <img src={blog?.image?.data?.attributes?.url} alt="" />
                </div>
                <div>
                  <h3>
                    <Link to={`/blogDetails/${blog.id}`}>{blog.title}</Link>
                  </h3>
                  <p>{blog.description}</p>
                </div>
                <BlogCardFooter>
                  <div>
                    Author :{' '}
                    <span>{blog?.author?.data?.attributes?.username}</span>
                  </div>
                  <div>
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      year: '2-digit',
                    })}
                  </div>
                </BlogCardFooter>
              </BlogCard>
            ))
          )}
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
                  {' '}
                  <Link to={`/blog/${category.slug}`}>{category.title}</Link>
                </li>
              ))}
            </ul>
          </Categories>
          <Recent>
            <h2>Recent</h2>
            <div
              style={{
                width: '70px',
                background: 'pink',
                height: '5px',
                marginBottom: '20px',
              }}
            ></div>

            <ul>
              {recentBlogs.map((blog) => (
                <li key={blog.id}>
                  <h4>
                    <Link to={`/blogDetails/${blog.id}`}>{blog.title}</Link>
                  </h4>
                  <p>{`${blog.description.slice(0, 35)}...`}</p>
                </li>
              ))}
            </ul>
          </Recent>
        </RightSide>
      </BlogBody>
    </div>
  );
};

export default BlogPage;
