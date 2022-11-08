import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import {
  BlogBody,
  BlogCard,
  BlogCardFooter,
  BlogHeader,
  Blogs,
  Categories,
  RightSide,
} from '../styles/blogPageStyle';

const BlogPage = () => {
  const { categories, blogs } = useContext(BlogContext);
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
          {blogs.map((blog) => (
            <BlogCard key={blog.id}>
              <div>
                <img src="images/blog/01.jpg" alt="" />
              </div>
              <div>
                <h3>
                  <Link to={`/blogDetails/${blog.id}`}>{blog.title}</Link>
                </h3>
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

export default BlogPage;
