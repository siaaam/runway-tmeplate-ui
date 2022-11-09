import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import formatSingleItem from '../utils/formatSingleItem';

const BlogDetails = () => {
  const { categories } = useContext(BlogContext);
  const [blog, setBlog] = useState({});
  const { token, tokenLoaded } = useToken();
  const params = useParams();
  const id = +params.id;

  const getBlog = async () => {
    try {
      const res = await axiosAPI({
        method: 'get',
        url: `/blogs/${id}`,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      const formattedBlog = formatSingleItem(res.data);
      setBlog(formattedBlog);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (tokenLoaded) {
      getBlog();
    }
  }, [token, tokenLoaded]);

  return (
    <div style={{ marginTop: '70px', background: 'rgba(0, 0, 0, 0.1)' }}>
      <BlogHeader>
        <h1>Blog</h1>
        <p>
          <Link to={'/'}>
            <span style={{ cursor: 'pointer' }}>home</span>
          </Link>
          | <span>{blog.title}</span>
        </p>
      </BlogHeader>
      <BlogBody className="container">
        <Blogs>
          <BlogCard key={blog.id}>
            <div>
              <img src="../images/blog/01.jpg" alt="" />
            </div>
            <div>
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
            </div>
            <BlogCardFooter>
              <div>Author</div>
              <div>
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: '2-digit',
                })}
              </div>
            </BlogCardFooter>
          </BlogCard>
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
        </RightSide>
      </BlogBody>
    </div>
  );
};

export default BlogDetails;
