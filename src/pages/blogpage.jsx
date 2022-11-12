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
  Pagination,
  Recent,
  RightSide,
} from '../styles/blogPageStyle';
import axiosAPI from '../utils/axiosAPI';
import formatCategories from '../utils/formatCategories';
import qs from 'qs';

const generateArr = (num) => {
  const arr = [];
  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }
  return arr;
};

const BlogPage = () => {
  const { categories } = useContext(BlogContext);
  // const recentBlogs = blogs.reverse().slice(0, 3);

  const [allBlogs, setAllBlogs] = useState([]);
  const [allBlogsLoaded, setAllBlogsLoaded] = useState(false);
  const { token, tokenLoaded } = useToken();
  const [recentBlogs, setRecentBlogs] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(null);

  const pageCountArr = generateArr(pageCount);

  const handlePageClick = (evt) => {
    setPageNumber(+evt.target.dataset.id);
  };

  const loadAllBlogs = async () => {
    const query = qs.stringify(
      {
        pagination: {
          page: pageNumber,
          pageSize: import.meta.env.VITE_PAGE_SIZE,
        },
        populate: '*',
      },

      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    try {
      const res = await axiosAPI({
        method: 'get',
        url: `/blogs?${query}`,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      console.log(res.data);

      const paginationInfo = res.meta;

      setPageCount(paginationInfo.pagination.pageCount);

      setAllBlogs(formatCategories(res.data).reverse());
      setAllBlogsLoaded(true);
      setRecentBlogs(formatCategories(res.data).reverse().slice(0, 3));
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  useEffect(() => {
    if (token) {
      loadAllBlogs();
    }
  }, [token, tokenLoaded, pageNumber]);

  const navigate = useNavigate();
  return (
    <>
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
        <div className="container">
          <BlogBody>
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
                      <Link to={`/blog/${category.slug}`}>
                        {category.title}
                      </Link>
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
          <Pagination className="mb-4" aria-label="Page navigation example">
            <ul className="d-flex">
              {pageCountArr.map((count, i) => {
                return (
                  <li
                    key={i}
                    style={{
                      background: '#eee',
                      borderRadius: '50%',
                      cursor: 'pointer',
                    }}
                    className="page-item p-4"
                    data-id={count}
                    onClick={handlePageClick}
                  >
                    {count}
                  </li>
                );
              })}
            </ul>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
