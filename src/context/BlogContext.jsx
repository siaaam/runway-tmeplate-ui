import { createContext, useEffect, useState } from 'react';
import useToken from '../hooks/useToken';
import axiosAPI from '../utils/axiosAPI';
import formatCategories from '../utils/formatCategories';
import { useNavigate } from 'react-router-dom';
import formatSingleItem from '../utils/formatSingleItem';
import axios from 'axios';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [blogsLoaded, setBlogsLoaded] = useState(false);

  const { token, tokenLoaded } = useToken();

  const loadCategories = async () => {
    try {
      const data = await axiosAPI({
        method: 'get',
        url: '/categories?populate=blogs',
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      const formattedCategories = formatCategories(data.data);
      setCategories(formattedCategories);
    } catch (err) {
      console.log(err);
    }
  };

  const loadBlogs = async () => {
    try {
      const data = await axiosAPI({
        method: 'get',
        url: '/blogs?populate=*',
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      console.log(data.meta);
      const formattedCategories = formatCategories(data.data);
      setBlogs(formattedCategories);
      setBlogsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token && tokenLoaded) {
      loadCategories();
      loadBlogs();
    }
  }, [token, tokenLoaded]);

  const addBlog = async (blog) => {
    try {
      const res = await axiosAPI({
        method: 'post',
        url: '/blogs',
        data: {
          data: blog,
        },
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      const formattedBlogData = formatSingleItem(res.data);

      setBlogs([...blogs, formattedBlogData]);
      navigate('/blog');
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axiosAPI({
        method: 'delete',
        url: `/blogs/${id}`,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      const blogsAfterDelete = blogs.filter((blog) => blog.id !== id);
      setBlogs(blogsAfterDelete);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  const value = {
    categories,
    blogs,
    setBlogs,
    blogsLoaded,
    addBlog,
    deleteBlog,
  };
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
